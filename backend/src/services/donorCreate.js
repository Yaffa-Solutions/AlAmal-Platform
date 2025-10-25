import prisma from "../config/db.js";

export const createDonor= async(userId,{name,phone,country,gender})=>{
    return await prisma.donor.create({
        data:{
            user_id:userId,
            name,
            phone,
            country,
            gender,
        }
    })
}
