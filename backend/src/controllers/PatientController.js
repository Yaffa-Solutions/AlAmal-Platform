import { createPatient } from '../services/PatientService.js';
import { ProstheticType } from '../generated/prisma/index.js';
import { generatePresignedUrl } from '../services/upload.js';

export const getUploadUrl = (req, res, next) => {
  const { filename, fileType } = req.body;
  generatePresignedUrl(filename, fileType)
    .then(({ url, key }) => {
      res.json({ url, key });
    })
    .catch((err) => next(err));
};

export const AddPatient = (req, res, next) => {
  const {
    user_id,
    name,
    Phone,
    age,
    gender,
    city,
    disability_type,
    disability_percentage,
    medical_reports_url,
  } = req.body;

  createPatient({
    user_id,
    name,
    Phone,
    age,
    gender,
    city,
    disability_type,
    disability_percentage,
    medical_reports_url,
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

export const GetAllProsthetic = (req, res) => {
  res.status(200).json({ prostheticTypes: Object.values(ProstheticType) });
};
