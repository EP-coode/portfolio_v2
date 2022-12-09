// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { plainToClass } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, validate } from "class-validator";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

class ContactMeDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;
}

const mailClient = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ADDRES,
    pass: process.env.GMAIL_PASS,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = plainToClass(ContactMeDto, JSON.parse(req.body));
    const errors = await validate(data);

    if (errors.length > 0) {
      res.status(400).send(errors);
    } else {
      console.log(
        `Sending message from ${data.email} - ${data.name} with content: ${data.content}`
      );
      await mailClient.sendMail({
        from: data.email,
        replyTo: data.email,
        to: process.env.TARGET_MAIL,
        subject: `MY PORTFOLIO - ${data.name}`,
        text: data.content,
        priority: "high",
      });
      res.status(200).send(undefined);
    }
  } catch (e: unknown) {
    res.status(500).send(undefined);
  }
}
