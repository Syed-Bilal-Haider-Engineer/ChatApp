import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({ to, sender, subject, html, attachments }) => {
  try {
    const msg = {
      to, // Recipient
      from: sender || "bilaldev151214@gmail.com", // Fallback to default verified sender if not provided
      subject,
      html,
      attachments,
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error("Error sending email:", error.response?.body || error.message);
  }
};

 const sendEmail = async (args) => {
  if (process.env.NODE_ENV !== "development") {
    return sendSGMail(args);
  }
  return Promise.resolve();
};

export default sendEmail;