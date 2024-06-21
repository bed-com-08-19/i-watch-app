import twilio from 'twilio';
import { parsePhoneNumber } from 'libphonenumber-js';

const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const client = twilio(accountSid, authToken);

export const sendSMSNotification = async (phoneNumber: string, message: string) => {
  try {
    const parsedNumber = parsePhoneNumber(phoneNumber);
    if (!parsedNumber.isValid()) {
      throw new Error('Invalid phone number');
    }

    const formattedNumber = parsedNumber.formatInternational();

    await client.messages.create({
      body: message,
      from: 'your_twilio_phone_number',
      to: formattedNumber
    });
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
};
