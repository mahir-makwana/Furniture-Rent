const stripe = require("../../config/stripe");
const addToCartModel = require("../../models/cartProduct");
const orderModel = require("../../models/orderProductModel");
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems) {
  try {
    let ProductItems = [];
    if (lineItems?.data?.length) {
      for (const items of lineItems.data) {
        const product = await stripe.products.retrieve(items.price.product);
        const productId = product.metadata.productId;

        const productData = {
          productId: productId,
          name: product.name,
          price: items.price.unit_amount / 100,
          quantity: items.quantity,
          image: product.images[0],
        };

        ProductItems.push(productData);
      }
    }
    return ProductItems;
  } catch (error) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log(`Error: ${err.message}`);
    return;
  }
}

const webhook = async (request, response) => {
  try {
    const payloadString = JSON.stringify(request.body);

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    let event;

    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );
        const productDetails = await getLineItems(lineItems);

        const orderDetails = {
          productDetails: productDetails,
          email: session.customer_email,
          userId: session.metadata.userTd,
          paymentDetails: {
            paymentId: session.payment_intent,
            payment_method_type: session.payment_method_types,
            payment_status: session.payment_status,
          },
          shipping_options: session.shipping_options.map((e) => {
            return { ...e, shipping_amount: e.shipping_amount / 100 };
          }),
          totalAmount: session.amount_total / 100,
        };
        const order = new orderModel(orderDetails);

        const saveOrder = await order.save();

        if (saveOrder?._id) {
          const deleteCartItems = await addToCartModel.deleteMany({
            userId: session.metadata.userTd,
          });
        }

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.status(200).send();
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log(`Webhook Error: ${err}`);
    return;
  }
};

module.exports = webhook;
