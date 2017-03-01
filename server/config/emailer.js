'use strict';
const nodemailer = require('nodemailer');
const {logger} = require('./logger');
const {SMTP_PORT, SMTP_HOST,SMTP_USER, SMTP_PASS,DONTREPLY_EMAIL,ADMIN_EMAIL} = require('./config');


/**
 * [sendEmail description]
 * @param  {Object} emailData           looks like this:
                                           {
                                            from: 'foo@bar.com',
                                            to: 'bizz@bang.com, marco@polo.com',
                                            subject: 'Hello world',
                                            text: 'Plain text content',
                                            html: '<p>HTML version</p>'
                                           }

 * @param  {string} [smtpUrl=SMTP_HOST] [description]
 * @return {[type]}                     [description]
 */
const sendEmail = (emailData, smtpUrl=SMTP_HOST) => {
  const transporter = nodemailer.createTransport({
    host: smtpUrl,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
  });
  if(!emailData.from) emailData.from=DONTREPLY_EMAIL;
  logger.info(`Attempting to send email from ${emailData.from}`);
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
};

const sendEmailAdmins = (subject,text,html="") => {
  let emailData={
   from: DONTREPLY_EMAIL,
   to: ADMIN_EMAIL,
   subject: 'ADMIN: '+subject,
   text: text,
   html: html
 };
  return sendEmail(emailData);
};

const doErrorEmailAlerts = (err, req, res, next) => {
  if (err) {
    logger.info(`Sending error alert email to ${ADMIN_EMAIL}`);

    const emailData = {
      from: DONTREPLY_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Brigadistas ERROR: ${err.name}`,
      text: `Something went wrong. \n\n${err.stack}`
    };
    sendEmail(emailData).catch(er=>{
      console.log(er);
    });
  }
  next();
};

module.exports = { sendEmail,doErrorEmailAlerts, sendEmailAdmins };