import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");
NextResponse;
export async function POST(req, res) {
  const body = await req.json();
  const { name, email, phone, message } = body;
  if (!body.name || !body.email || !body.phone || !body.message) {
    return NextResponse.json(
      {
        message: "check the input fileds ",
      },
      {
        status: 400,
      }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ghoramisudipta32@gmail.com",
      pass: "cgneqnkwuurzlnrr",
    },
  });
  //construct email message
  const mailOptions = {
    from: "ghoramisudipta32@gmail.com",
    to: email,
    subject: "OTP for registration",
    text: `
    name:${name} 
    email:${email}
    phone No:${phone}
    Message:${message}
    `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({ otp, message: "mail sent" }); // Sending OTP along with success message
      // return res.status(200).json({ message: "mail sent" });
    }
  });

  // Return a JSON response indicating success
  return NextResponse.json(
    {
      message: "Message sent successfully",
    },
    {
      status: 200,
    }
  );
}
