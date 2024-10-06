import sendgrid from "@sendgrid/mail"

sendgrid.setApiKey(process.env.SG_KEY);

const sendSGMail = async(to, from, subject, text) => {
  try {
    const from = "jmm.bilalhaider151214@gmail.com"; // Make sure this email is verified in SendGrid
    const msg = {
      to: to, // Recipient email
      from: from, // Verified sender email
      subject: subject || "This is testing email!",
    };
    // Send the email
    const response = await sendgrid.send(msg);
    return response;
  } catch (error) {
    console.error("Error sending email:", error.response ? error.response.body : error);
  }
};

const sendEmail = async (args) => {
  if (process.env.NODE_ENV !== "development") {
    return sendSGMail(args);
  } else {
    return Promise.resolve();
  }
};

export default sendEmail;
