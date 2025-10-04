import {requestOTP, verifyOTP} from '../services/OTP.js'

export const requestOTPController=(req,res)=>{
    const {username}=req.body;

    if(!username){
        return res.status(400).json({message:'username is required'});

    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
    return res.status(400).json({ message: 'Invalid email format' });
    }

    requestOTP(username)
    .then((result)=>{
        res.status(200).json({
            message:'otp send successfuly',
            username:result.username
        })
    })
    .catch((err)=>{
        console.error('error is requestOtpCon:',err)
        res.status(500).json({message:'failed to send otp ',error:err.message})
    })
    }


export const verifyOTPController=(req,res)=>{
    const {username, code}=req.body;

    if(!username || !code){
        return res.status(400).json({message:'username and code are required'})
    }

    verifyOTP(username,code)
    .then ((result)=>{
        res.status(200).json({
            message:'otp verified successfuly',
            username:result.username,
            status:result.status
        })
    })
    .catch((err)=>{
        console.error('error in verifyOTPCon:',err)
        res.status(400).json({message:'otp  verification failed',error:err.message})
        

    })

}