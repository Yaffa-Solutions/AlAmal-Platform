import express from  'express';
import  {AddPatient, GetAllProsthetic, getUploadUrl } from '../controllers/PatientController.js';
import { patientSchema } from '../validation/PatientValidator.js';
import { validate } from '../middlewares/validate.js';


const router= express.Router();

router.post("/upload-patient-files", getUploadUrl);
router.post('/register', validate(patientSchema),AddPatient );
router.get('/prosthetic',GetAllProsthetic);

export default router;