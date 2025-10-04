import prisma from '../config/db.js'
import {sendOTP} from '../config/mailer.js'

const generateOTP=()=>{
    return Math.floor(100000+Math.random()*900000).toString();

}

export const requestOTP=(username)=>{
    return prisma.user
    .findUnique({where:{username}})
    .then ((user)=>{

        if(user) return user;

        return prisma.user.create({data:{username,status:'PENDING'}})
    }) 
    .then((user)=>{
        const code= generateOTP()
        const expiresAt= new Date(Date.now()+3*60*1000)

        return prisma.EmailVerifications
        .create({
            data:{
            user_id:user.id,
            verification_code: code,
            expires_at: expiresAt,
        }
        })
        .then(()=>({username,code}))
    })
    .then (({username,code})=>{
        return sendOTP(username,code).then(()=>({message:'OTP sent', username}))
    })
    .catch((err)=>{
        console.error('error in requestOTP:',err);
        throw err
        
    })
}

export const verifyOTP=(username,code)=>{
    return prisma.user
    .findUnique({where:{username}})
    .then ((user)=>{

        if(!user) throw new Error('user not found');

        return prisma.EmailVerifications.findFirst({
            where:{
                user_id:user.id,
                verification_code:code,
                is_used:false,
                expires_at:{gt:new Date()}
            }
        })
        .then(OTP=>{
            if(!OTP) throw new Error('otp invalid or expired')

            return prisma.EmailVerifications.update({
                where:{
                    id:OTP.id
                },
                data:{
                    is_used:true
                }
            })
            .then(()=>{
                return {
                message:'OTP verified',
                username,
                status:user.status
                }
                })

            })
            .catch(err=>{
                console.error('error in verify OTP:',err);
                throw err
                
            })
        })

}


