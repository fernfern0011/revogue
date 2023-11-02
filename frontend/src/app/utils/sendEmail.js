const { Resend } = require('resend');

const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const resend = new Resend(apiKey);

const sendEmail = (to, subject, html) => {
  return resend.emails.send({
    from: 'revogue2023@gmail.com',
    to: 'sathwikchiluveru@gmail.com',
    subject: 'test',
    html,
  });
};

module.exports = sendEmail;
