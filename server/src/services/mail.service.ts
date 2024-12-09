/**
 * All the functions related to sending emails with SendGrid
 */
import 'dotenv/config';
import SGmail, { MailDataRequired } from '@sendgrid/mail';
// @ts-ignore
import footnote from '../../photos/email_footnote.txt';

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
    subject: 'Box of Balloons Request Received!',
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
    `,
  };

  //<img src='data:image/png;base64,${footnote}' alt="Box of Balloons Logo" style="max-width: 100%; height: auto;"/>

  // Send the email and propagate the error up if one exists
  await SGmail.send(mailSettings);
};

const emailRequestApproved = async (email: string, childName: string) => {
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: 'Box of Balloons, Inc.',
    },
    to: email,
    subject: 'Box of Balloons Request Approved!',
    html: `
      <p>Hello,</p>
      
      <p>Congratulations, let the celebrations begin!! Your request for a birthday box has 
      been approved by your local volunteer-led chapter of Box of Balloons, Inc.</p>
      
      <p>Please watch out for an email or phone call from your local volunteer chapter 
      leader with instructions on how your box will be delivered.</p>
      
      <p>If you have any specific questions in the meantime, please reach out to your local chapter by 
      finding their contact information <a href="https://www.boxofballoons.org/where-are-we-1">here</a>.</p>
      
      <p>Thank you,</p>
      
      <p>Box of Balloons, Inc. - Automated response</p>
    `,
  };
  await SGmail.send(mailSettings);
};

const emailRequestDenied = async (email: string, childName: string) => {
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: 'Box of Balloons, Inc.',
    },
    to: email,
    subject: 'Box of Balloons Request Denied',
    html: `
      <p>Hello,</p>
      
      <p>Thank you for your request. Unfortunately, your local chapter is unable to fulfill your request 
      for a birthday box at this time.</p>
      
      <p>As an organization run 100% by volunteers, our ability to accept every request submitted is sometimes 
      limited by availability and we apologize for the inconvenience this may cause to the families you serve.</p>
      
      <p>We encourage you to reach out to your chapter leaders to explore future opportunities by emailing them 
      directly. You may find their contact information <a href="https://www.boxofballoons.org/where-are-we-1">here</a>.</p>
      
      <p>Regretfully,</p>
      
      <p>Box of Balloons, Inc. - Automated response</p>
    `,
  };
  await SGmail.send(mailSettings);
};

const emailRequestDelivered = async (email: string, childName: string) => {
  const mailSettings: MailDataRequired = {
    from: {
      email: process.env.SENDGRID_EMAIL_ADDRESS || 'missing@mail.com',
      name: 'Box of Balloons, Inc.',
    },
    to: email,
    subject: 'Box of Balloons Request Delivered!',
    html: `
      <p>Cue the Confetti!</p>
      
      <p>The box you have requested on behalf of the families you serve has been delivered! Our goal is to 
      ensure every child feels celebrated on their birthday and we are so thrilled to be able to provide our 
      services to the families your agency helps.</p>
      
      <p>As an organization run mostly by volunteers, while our overhead is small compared to other larger 
      nonprofits, we still have overhead to cover the costs of running a nonprofit. To help us ensure each 
      birthday is happy and every child is celebrated we invite you to consider helping us spread more joy 
      to organizations like yours and the families you serve.</p>
      
      <p>Please consider making a donation today, no amount is too small - <a href="https://boxofballoons.networkforgood.com/">Donate Now</a></p>
      
      <p>Other ways to contribute to our mission is by encouraging the family we provided a birthday box to, to send us an email or write a letter 
      sharing how impactful our service was to them and their child/children. Letters, thank you cards, and especially pictures can be a catalyst 
      in supporting our mission.</p>
      
      <p>If it is safe to do so and the family assisted is comfortable doing so, we ask that these small but large displays of gratitude be emailed 
      to: <a href="boxofballoons@gmail.com">boxofballoons@gmail.com</a> or mailed to P.O. Box 28, Sun Prairie WI. 53590.</p>

      <p>Please note any pictures received will be used to advance our fundraising efforts, if a child’s identity needs to be hidden please note so 
      in the email or letter and an emoji will be used to protect the family and child/ren served.</p>

      <p>Thank you again for everything you do to make our community a better place for children and families in need. We are in this together!</p>

      <p>Here to serve,</p>

      <p>Box of Balloons, Inc. Volunteer Team</p>
    `,
  };

  //<img src='data:image/png;base64,${footnote}' alt="Box of Balloons Logo" style="max-width: 100%; height: auto;"/>

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
  emailRequestApproved,
  emailRequestDenied,
  emailRequestDelivered,
};
