import 'dotenv/config';
import config from 'config';
import { createTransport, getTestMessageUrl } from 'nodemailer';

const frontendUrl = config.get<string>('frontendUrl');

const transport = createTransport({
  host: config.get<string>('mailHost'),
  port: config.get<number>('mailPort'),
  auth: {
    user: config.get<string>('mailUser'),
    pass: config.get<string>('mailPass'),
  },
});

function makeANiceEmail(text: string) {
  return `
    <div className="email" style="
      -webkit-background-clip: content-box,border-box;
      background-clip: content-box,border-box;
      background-image: linear-gradient(#fff, #fff),linear-gradient(to right, #64b5f6, #40c4ff);
      box-shadow: 12px 12px 0px -2px rgb(0 0 0 / 87%);
      padding: 8px;
      border-radius: 8px;
    ">
      <div style="
        font-size: 20px;
        font-family: sans-serif;
        line-height: 2;
        padding: 20px;
      ">
        <h2>Hello There!</h2>
        <p>${text}</p>
        <p>😘, Wes Bos</p>
      </div>
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: 'wes@wesbos.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${frontendUrl}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  });

  if (config.get<string>('mailUser').includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
}
