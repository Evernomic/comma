import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function addContact(email: string, name?: string) {
  return await resend.contacts.create({
    email,
    firstName: name,
    unsubscribed: false,
    audienceId: process.env.RESEND_AUDIENCE_ID!,
  });
}
