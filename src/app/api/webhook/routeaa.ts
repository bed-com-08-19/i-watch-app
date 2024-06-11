// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { connect } from '../../../dbConfig/dbConfig';
// import Subscription from '../../../models/Subscription';
// import Invoice from '../../../models/invoice';
// import User from '../../../models/userModel';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(req: NextRequest) {
//   await connect();
//   const reqText = await req.text();
//   return webhooksHandler(reqText, req);
// }

// async function getCustomerEmail(customerId: string): Promise<string | null> {
//   try {
//     const customer = await stripe.customers.retrieve(customerId);
//     return (customer as Stripe.Customer).email;
//   } catch (error) {
//     console.error('Error fetching customer:', error);
//     return null;
//   }
// }

// async function handleSubscriptionEvent(
//   event: Stripe.Event,
//   type: 'created' | 'updated' | 'deleted'
// ) {
//   const subscription = event.data.object as Stripe.Subscription;
//   const customerEmail = await getCustomerEmail(subscription.customer as string);

//   if (!customerEmail) {
//     return NextResponse.json({
//       status: 500,
//       error: 'Customer email could not be fetched',
//     });
//   }

//   const subscriptionData = {
//     subscription_id: subscription.id,
//     stripe_user_id: subscription.customer,
//     status: subscription.status,
//     start_date: new Date(subscription.created * 1000).toISOString(),
//     plan_id: subscription.items.data[0]?.price.id,
//     user_id: subscription.metadata?.userId || '',
//     email: customerEmail,
//   };

//   try {
//     if (type === 'deleted') {
//       await Subscription.updateOne(
//         { subscription_id: subscription.id },
//         { $set: { status: 'cancelled', email: customerEmail } }
//       );
//       await User.updateOne(
//         { email: customerEmail },
//         { $set: { subscription: null } }
//       );
//     } else {
//       await Subscription.updateOne(
//         { subscription_id: subscription.id },
//         { $set: subscriptionData },
//         { upsert: true }
//       );
//     }

//     return NextResponse.json({
//       status: 200,
//       message: `Subscription ${type} success`,
//     });
//   } catch (error) {
//     console.error(`Error during subscription ${type}:`, error);
//     return NextResponse.json({
//       status: 500,
//       error: `Error during subscription ${type}`,
//     });
//   }
// }

// async function handleInvoiceEvent(
//   event: Stripe.Event,
//   status: 'succeeded' | 'failed'
// ) {
//   const invoice = event.data.object as Stripe.Invoice;
//   const customerEmail = await getCustomerEmail(invoice.customer as string);

//   if (!customerEmail) {
//     return NextResponse.json({
//       status: 500,
//       error: 'Customer email could not be fetched',
//     });
//   }

//   const invoiceData = {
//     invoice_id: invoice.id,
//     subscription_id: invoice.subscription as string,
//     amount_paid: status === 'succeeded' ? invoice.amount_paid / 100 : undefined,
//     amount_due: status === 'failed' ? invoice.amount_due / 100 : undefined,
//     currency: invoice.currency,
//     status,
//     user_id: invoice.metadata?.userId,
//     email: customerEmail,
//   };

//   try {
//     await Invoice.create(invoiceData);

//     return NextResponse.json({
//       status: 200,
//       message: `Invoice payment ${status}`,
//     });
//   } catch (error) {
//     console.error(`Error inserting invoice (payment ${status}):`, error);
//     return NextResponse.json({
//       status: 500,
//       error: `Error inserting invoice (payment ${status})`,
//     });
//   }
// }

// async function handleCheckoutSessionCompleted(
//   event: Stripe.Event
// ) {
//   const session = event.data.object as Stripe.Checkout.Session;
//   const metadata = session.metadata;

//   if (metadata?.subscription === 'true') {
//     const subscriptionId = session.subscription;
//     try {
//       await stripe.subscriptions.update(subscriptionId as string, { metadata });

//       await Invoice.updateMany(
//         { email: metadata?.email },
//         { $set: { user_id: metadata?.userId } }
//       );

//       await User.updateOne(
//         { user_id: metadata?.userId },
//         { $set: { subscription: session.id } }
//       );

//       return NextResponse.json({
//         status: 200,
//         message: 'Subscription metadata updated successfully',
//       });
//     } catch (error) {
//       console.error('Error updating subscription metadata:', error);
//       return NextResponse.json({
//         status: 500,
//         error: 'Error updating subscription metadata',
//       });
//     }
//   } else {
//     const dateTime = new Date(session.created * 1000).toISOString();
//     try {
//       const user = await User.findOne({ user_id: metadata?.userId });
//       if (!user) throw new Error('User not found');

//       const paymentData = {
//         user_id: metadata?.userId,
//         stripe_id: session.id,
//         email: metadata?.email,
//         amount: session.amount_total! / 100,
//         customer_details: session.customer_details,
//         payment_intent: session.payment_intent,
//         payment_time: dateTime,
//         currency: session.currency,
//       };

//       await db.collection('payments').insertOne(paymentData);

//       const updatedCredits = Number(user.credits || 0) + (session.amount_total || 0) / 100;
//       await User.updateOne(
//         { user_id: metadata?.userId },
//         { $set: { credits: updatedCredits } }
//       );

//       return NextResponse.json({
//         status: 200,
//         message: 'Payment and credits updated successfully',
//       });
//     } catch (error) {
//       console.error('Error handling checkout session:', error);
//       return NextResponse.json({
//         status: 500,
//         error,
//       });
//     }
//   }
// }

// async function webhooksHandler(
//   reqText: string,
//   request: NextRequest
// ): Promise<NextResponse> {
//   const sig = request.headers.get('Stripe-Signature');

//   try {
//     const event = await stripe.webhooks.constructEventAsync(
//       reqText,
//       sig!,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );

//     switch (event.type) {
//       case 'customer.subscription.created':
//         return handleSubscriptionEvent(event, 'created');
//       case 'customer.subscription.updated':
//         return handleSubscriptionEvent(event, 'updated');
//       case 'customer.subscription.deleted':
//         return handleSubscriptionEvent(event, 'deleted');
//       case 'invoice.payment_succeeded':
//         return handleInvoiceEvent(event, 'succeeded');
//       case 'invoice.payment_failed':
//         return handleInvoiceEvent(event, 'failed');
//       case 'checkout.session.completed':
//         return handleCheckoutSessionCompleted(event);
//       default:
//         return NextResponse.json({
//           status: 400,
//           error: 'Unhandled event type',
//         });
//     }
//   } catch (err) {
//     console.error('Error constructing Stripe event:', err);
//     return NextResponse.json({
//       status: 500,
//       error: 'Webhook Error: Invalid Signature',
//     });
//   }
// }
