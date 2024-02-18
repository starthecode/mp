'use server';

import { OrderReceiptEmail } from '@/components/mails/templates/email-order-template';
import { EmailTemplate } from '@/components/mails/templates/email-template';
import { EmailHelpParams, EmailParams } from '@/types';
import { Resend } from 'resend';
import { getProductById } from './product.action';
import EmailAdminTemplate from '@/components/mails/templates/email-admin-order';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (type: string, data: EmailParams) => {
  let emailData = null;
  let mailSubject = '';
  let productDetails = null;
  try {
    if (type == 'NewOrder') {
      productDetails = await getProductById(data.productId as string);

      mailSubject = `Order Details - ${productDetails?.title}`;

      //send new order details to admin
      emailData = await resend.emails.send({
        from: 'Experimental Code <info@experimentalapp.xyz>',
        to: ['starthecode@gmail.com'],
        subject: mailSubject,
        react: EmailAdminTemplate() as React.ReactElement,
      });

      //send order details to user
      emailData = await resend.emails.send({
        from: 'Experimental Code <info@experimentalapp.xyz>',
        to: [data?.email as string],
        subject: mailSubject,
        react: OrderReceiptEmail({
          data,
          productDetails,
        }) as React.ReactElement,
      });
    }

    return JSON.parse(JSON.stringify(emailData));
  } catch (error) {
    console.log(error);
  }
};

export const sendHelpEmail = async (data: EmailHelpParams) => {
  try {
    const mailSubject = data.subject;
    const emailData = await resend.emails.send({
      from: 'Experimental Code <info@experimentalapp.xyz>',
      to: ['starthecode@gmail.com'],
      subject: mailSubject,
      react: EmailTemplate({ data }) as React.ReactElement,
    });

    return JSON.parse(JSON.stringify(emailData));
  } catch (error) {
    console.log(error);
  }
};
