import { NextResponse } from "next/server";

const Razorpay = require("razorpay");
const shortid = require("shortid");

export async function POST(req, res) {
  const body = await req.json();

  // Initialize razorpay object
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  // Create an order -> generate the OrderID -> Send it to the Front-end
  const payment_capture = 1;
  const amount = body.totalBill;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json(
      {
        response,
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err,
      },
      {
        status: 400,
      }
    );
  }
}
