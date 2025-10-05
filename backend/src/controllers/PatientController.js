import { validationResult } from 'express-validator';
import prisma from '../config/db.js';
import { CustomError } from '../middlewares/error.js';
import { generatePresignedUrl } from '../services/upload.js';
import { data_config } from '../config/config.js';



export const getUploadUrl = async (req, res) => {
  try {
    const { filename, contentType } = req.body;

    const { url, key } = await generatePresignedUrl(filename, contentType);
    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate upload URL" });
  }
};  

const AddPatient = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new CustomError('Validation failed',400);
  }
  const {user_id,name,Phone,age,gender,city,disability_type,disability_percentage,} = req.body;
  
      const medical_reports_url = `https://${data_config.bucketName}.s3.${data_config.region}.amazonaws.com/${medical_reports_url}`;

  prisma.patient.create({
      data: {
        user_id,
        name,
        Phone,
        age,
        gender,
        city,
        disability_type,
        disability_percentage,
        medical_reports_url,
      },
    })
    .then((patient) => {
      res.status(201).json({
        message: 'Patient Added Successfully',
        status: 201,
        data: patient,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export default AddPatient;
