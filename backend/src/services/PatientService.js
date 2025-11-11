import prisma from '../config/db.js';

export const createPatient = (data) => {
 console.log(data);
 
  return prisma.patient
    .create({
      data: data,
    })
    .then((patient) => {
      return prisma.request.create({ data: { patient_id: patient.id } })
        .then(() =>  prisma.user.update({
           where: { id: data.user_id } , data: { status: 'ACTIVE' } 
          })
           )
        .then(() => patient);;
    });
};



export const getPatientUserId= (data)=>{
  return prisma.patient.findFirst({where:{user_id:data}});
}

export const requestDetails=(data)=>{
 return prisma.$transaction([
  prisma.request.findFirst({where:{patient_id:data}}),
  prisma.patient.findFirst({where:{id:data}})
  ]).then(([request , patient]) => { return {...request,...patient}});
}

export const updatePatientInfo=(data)=>{
  console.log(data);
  return  prisma.patient.update({where:{id:data.id} , data:{...data}});
}
