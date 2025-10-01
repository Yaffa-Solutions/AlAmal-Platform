import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
})

export const sendOTP=(email,code)=>{
    return new Promise((resolve,reject)=>{
        transporter.sendMail(
            {
                from:process.env.EMAIL_USER,
                to:email,
                subject:'Your Verification code',
                text: `Your verification code is : ${code}`
            },(err,info)=>{
                if(err){
                    console.error('error sending OTP:',err);
                    return reject(new Error('failed to send OTP'))
                    
                }
                console.log(`OTP sent to ${email}`);
                resolve(info)

                
            }
        )
    })

}

