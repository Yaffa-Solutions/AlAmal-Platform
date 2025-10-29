import prisma from '../config/db.js';

export const createPatient = (data) => {
  return prisma.patient.create({
    data: data,
  }).then((patient)=>{
    return prisma.user.update({where:{id:data.user_id},
    data:{status:'ACTIVE'}}).then(()=>patient);
  });
};