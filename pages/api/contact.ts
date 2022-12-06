// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { plainToClass } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { NextApiRequest,  NextApiResponse} from "next";
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = plainToClass(ContactMeDto, JSON.parse(req.body));
  mailClient.sendMail({
    sender: data.email,
    replyTo: data.email,
    to: process.env.TARGET_MAIL,
    subject: `MESSAGE FROM PORTFOLIO - ${data.name}`,
    text: data.content,
  });
  res.status(200).send(null)
}
