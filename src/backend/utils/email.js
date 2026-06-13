const nodemailer = require('nodemailer');

const createTransporter = () => nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEnquiryConfirmation = async ({ name, email, courseInterest }) => {
  if (!process.env.EMAIL_USER) return;
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Zionbridge Technologies" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ Thank You for Contacting Zionbridge Technologies!',
    html: `
      <div style="font-family:Poppins,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f9fa;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0B1F4D,#1a3a8a);padding:40px;text-align:center;">
          <h1 style="color:#D4AF37;margin:0;font-size:28px;">ZIONBRIDGE</h1>
          <p style="color:#fff;margin:5px 0 0;">Technologies</p>
        </div>
        <div style="padding:40px;">
          <h2 style="color:#0B1F4D;">Hello ${name}! 👋</h2>
          <p style="color:#555;line-height:1.7;">Thank you for reaching out to <strong>Zionbridge Technologies</strong>. We have received your enquiry${courseInterest ? ` about <strong>${courseInterest}</strong>` : ''} and our team will contact you shortly.</p>
          <div style="background:#fff;border-left:4px solid #D4AF37;padding:20px;border-radius:8px;margin:24px 0;">
            <p style="margin:0;color:#0B1F4D;font-weight:600;">What happens next?</p>
            <ul style="color:#555;margin:10px 0 0;padding-left:20px;line-height:2;">
              <li>Our career counselor will call you within 24 hours</li>
              <li>We'll discuss the best course/program for your goals</li>
              <li>Get a free demo session invitation</li>
            </ul>
          </div>
          <div style="text-align:center;margin:30px 0;">
            <a href="https://wa.me/917893045803" style="background:#D4AF37;color:#0B1F4D;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;">💬 WhatsApp Us Now</a>
          </div>
          <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">
          <p style="color:#999;font-size:12px;text-align:center;">Zionbridge Technologies | Training & Placement | HR Recruitment | IT Services<br>📞 +91 78930 45803 | 📧 zionbridgetechnologies@gmail.com</p>
        </div>
      </div>
    `
  });
};

const sendAdminNotification = async (enquiry) => {
  if (!process.env.EMAIL_USER) return;
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Zionbridge Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `🔔 New Enquiry from ${enquiry.name} - Zionbridge`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0B1F4D;">New Website Enquiry</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:10px;border:1px solid #ddd;">${enquiry.name}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:10px;border:1px solid #ddd;">${enquiry.email}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:10px;border:1px solid #ddd;">${enquiry.phone}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Course Interest</td><td style="padding:10px;border:1px solid #ddd;">${enquiry.courseInterest || 'N/A'}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Type</td><td style="padding:10px;border:1px solid #ddd;">${enquiry.type}</td></tr>
          <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:10px;border:1px solid #ddd;">${enquiry.message || 'N/A'}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:20px;">Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>
    `
  });
};

module.exports = { sendEnquiryConfirmation, sendAdminNotification };
