import express from  'express';
import  {AddPatient, EditRequestDetails, GetAllProsthetic, GetRequestDetails, getUploadUrl } from '../controllers/PatientController.js';
import { patientSchema } from '../validation/PatientValidator.js';
import { validate } from '../middlewares/validate.js';
import { authenticateToken } from '../middlewares/authToken.js';


const router= express.Router();

router.post("/upload-patient-files", getUploadUrl);
router.post('/register',validate(patientSchema),AddPatient );
router.get('/prosthetic' , GetAllProsthetic);

router.get('/requestDetails',authenticateToken ,GetRequestDetails);
router.put('/requestDetails', authenticateToken,EditRequestDetails);


export default router;