import {
  createPatient,
  getPatientUserId,
  requestDetails,
  updatePatientInfo,
} from '../services/PatientService.js';
import { ProstheticType } from '../generated/prisma/index.js';
import { deleteReportFile, generatePresignedUrl } from '../services/upload.js';

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
    name,
    Phone,
    age,
    gender,
    city,
    disability_type,
    disability_percentage,
    medical_reports_url,
  } = req.body;  
  const user_id =req.user.id;
  
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

export const GetRequestDetails = (req, res, next) => {  
  const user_id = req.user.id;  
  getPatientUserId(user_id)
    .then(({ id }) => requestDetails(id))
    .then((request) => {
      res.status(200).json({
        message: `Request Details For this Patient `,
        status: 200,
        data: request,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export const EditRequestDetails = (req, res, next) => {
    const user_id = req.user.id;
  getPatientUserId(user_id)
    .then((patient) => {
      if (req.body.medical_reports_url) {
        return deleteReportFile(patient.medical_reports_url).then(() => patient.id);;
      }
      return patient.id;
    })
    .then((id) => {
     return updatePatientInfo({ ...req.body, id: id });
    })
    .then((data) => {
      res
        .status(201)
        .json({
          message: 'Patient Updated Successfully',
          status: 201,
          data: data,
        });
    })
    .catch((err) => {
      next(err);
    });
};
