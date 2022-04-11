import { KeystoneContext, BaseKeystoneTypeInfo } from '@keystone-6/core/types';
import { permissionsList } from './schemas/fields';

export function isSignedIn({ session }: KeystoneContext): boolean {
  return !!session;
}

const generatePermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: KeystoneContext): boolean {
      return session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatePermissions,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageProducts({ session }: KeystoneContext<BaseKeystoneTypeInfo>) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      console.log(session?.data.role);
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: { equals: '$session.itemId' } } };
  },
  canOrder({ session }: KeystoneContext<BaseKeystoneTypeInfo>) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: { equals: '$session.itemId' } } };
  },
  canManageOrderItems({ session }: KeystoneContext<BaseKeystoneTypeInfo>) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { order: { user: { id: { equals: '$session.itemId' } } } };
  },
  canReadProducts({ session }: KeystoneContext<BaseKeystoneTypeInfo>) {
    if (!isSignedIn({ session })) {
      return false;
    }

    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    // They should only see available products (based on the status field)
    return { status: { equals: 'AVAILABLE' } };
  },
  canManageUsers({ session }: KeystoneContext<BaseKeystoneTypeInfo>) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session!.itemId } };
  },
};
