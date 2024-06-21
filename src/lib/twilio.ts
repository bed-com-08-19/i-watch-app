import twilio from 'twilio';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);

export async function sendSMSNotification(phoneNumber: string, message: string) {
  try {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, 'US'); // Replace 'US' with your default country code if necessary
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
      throw new Error('Invalid phone number');
    }

    const formattedPhoneNumber = phoneNumberObj.format('E.164');

    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedPhoneNumber,
    });
    return response;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw new Error('Failed to send SMS');
  }
}
