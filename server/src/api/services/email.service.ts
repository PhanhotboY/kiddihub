import { transporter } from '../../db/init.nodemailer';
import { getTemplate } from './template.service';
import { TEMPLATE } from '../constants';
import { replaceTemplatePlaceholders } from '@utils/index';
import { newOTP } from './otp.service';

const sendMail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    return await transporter.sendMail({
      from: process.env.DEV_SMTP_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

const sendVerificationEmail = async (toEmail: string) => {
  const otp = await newOTP(toEmail);

  const template = await getTemplate(TEMPLATE.NAME.VERIFY_EMAIL);
  if (!template) {
    throw new Error('Email verification template not found');
  }

  const serverUrl = process.env.SERVER_URL || 'http://localhost:8080';

  const html = replaceTemplatePlaceholders(template.tem_html, {
    verifyUrl: `${serverUrl}/api/v1/auth/verify-email?token=${otp.otp_token}`,
  });

  return await sendMail({
    to: toEmail,
    subject: 'Xác nhận địa chỉ email.',
    html,
  });
};

export { sendVerificationEmail };
