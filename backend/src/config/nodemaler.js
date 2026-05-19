import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.HOST_GMAIL,
    port: process.env.PORT_GMAIL,
    auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL,
    }
})

const sendMail = async (to, subject, html) => {
    try{
        const info = await transporter.sendMail({
            from: `"WEBBACK" <lubswer@gmail.com>`,
            to,
            subject,
            html,
        })
        console.log("Email enviado: ", info.messageId)
    }catch(error){
        console.log("Error enviado email:", error.messege)
  
    }
}

export default sendMail