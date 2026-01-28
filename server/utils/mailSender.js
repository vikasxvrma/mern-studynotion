const nodemailer= require("nodemailer");
require("dotenv").config();

const mailSender = async(email,title,body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });

        let info =await transporter.sendMail({
            from:"Studynotion || vikasworks ",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
         return info;

    }catch(err)
    {
       console.log("error in sending mail function from util  ");
       console.log(err.message );
    }
}

module.exports= mailSender;


