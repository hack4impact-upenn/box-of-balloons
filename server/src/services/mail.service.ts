/**
 * All the functions related to sending emails with SendGrid
 */
import 'dotenv/config';
import SGmail, { MailDataRequired } from '@sendgrid/mail';

const appName = 'Boilerplate'; // Replace with a relevant project name
const senderName = 'Hack4Impact UPenn'; // Replace with a relevant project sender
const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// eslint-disable-next-line no-useless-concat
SGmail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

/**
 * Sends a reset password link to a user
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this reset attempt for the user
 */
const emailResetPasswordLink = async (email: string, token: string) => {
  // TODO DURING DEVELOPMENT: use a template to make this prettier and match client's style
  const resetLink = `${baseUrl}/reset-password/${token}`;
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Link to Reset Password',
    html:
      `<p>You are receiving this because you (or someone else) have requested ` +
      `the reset of your account password for ${appName}. Please visit this ` +
      `<a href=${resetLink}>link</a> ` +
      `within an hour of receiving this email to successfully reset your password </p>` +
      `<p>If you did not request this change, please ignore this email and your ` +
      `account will remain secured.</p>`,
  };

  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

/**
 * Sends an email to verify an email account
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
const emailVerificationLink = async (email: string, token: string) => {
  const resetLink = `${baseUrl}/verify-account/${token}`;
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Verify account',
    html:
      `<p> Please visit the following ` +
      `<a href=${resetLink}>link</a> ` +
      `to verify your account for ${appName} and complete registration</p>` +
      `<p>If you did not attempt to register an account with this email address, ` +
      `please ignore this message.</p>`,
  };
  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

/**
 * Sends an email with an invite link to create an account
 * @param email The email of the user to send the link to
 * @param token The unique token identifying this verification attempt
 */
const emailInviteLink = async (email: string, token: string) => {
  const resetLink = `${baseUrl}/invite/${token}`;
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Verify account',
    html:
      `<p> Please visit the following ` +
      `<a href=${resetLink}>link</a> ` +
      `to create your account for ${appName} and complete registration</p>` +
      `<p>If you did not attempt to register an account with this email address, ` +
      `please ignore this message.</p>`,
  };
  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

const emailRequestUpdate = async (
  email: string,
  newStatus: string,
  childName: string,
) => {
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Birthday Box Request Status Update',
    html:
      `<p> Your birthday box request status for ${childName} has been changed. ` +
      `<p>The new status of your request is ${newStatus}. ` +
      `<p>If you did not request a birthday box, ` +
      `please ignore this message.</p>`,
  };
  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

const emailRequestDelete = async (email: string, childName: string) => {
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: senderName,
    },
    to: email,
    subject: 'Birthday Box Request Deleted',
    html:
      `<p> Your birthday box request for ${childName} has been deleted. ` +
      `<p>If you did not request a birthday box, ` +
      `please ignore this message.</p>`,
  };
  // Send the email and propogate the error up if one exists
  await SGmail.send(mailSettings);
};

const emailRequestCreate = async (email: string, childName: string) => {
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: 'Box of Balloons, Inc.',
    },
    to: email,
    subject: 'Box of Balloons Request Received',
    html: `
      <p>Hello,</p>
      
      <p>Thank you for your request. Box of Balloons has received your request and you will receive a 
      response when your request is either approved or denied by your local chapter leader.</p>
      
      <p>If you have any specific questions in the meantime, please reach out to your local chapter by 
      finding their contact information <a href="https://www.boxofballoons.org/where-are-we-1">here</a>.</p>
      
      <p>We appreciate your patience as all our chapters are run 100% by volunteers so response time, 
      while often quick, may sometimes be delayed.</p>
      
      <p>Thank you,</p>
      
      <p>Box of Balloons, Inc. - Automated response</p>
      
      <img src="cid:email_footnote" alt="Box of Balloons Logo" style="max-width: 100%; height: auto;"/>
    `,
    attachments: [
      {
        filename: 'email_footnote.png',
        path: './photos/email_footnote.png',
        cid: 'email_footnote'
      }
    ]
  };

  // Send the email and propagate the error up if one exists
  await SGmail.send(mailSettings);
};

export {
  emailVerificationLink,
  emailResetPasswordLink,
  emailInviteLink,
  emailRequestUpdate,
  emailRequestDelete,
  emailRequestCreate,
};
