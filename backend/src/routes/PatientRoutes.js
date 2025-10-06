import express from  'express';
import AddPatient from '../controllers/PatientController.js';
import { patientValidationRules } from '../common/validator/PatientValidator.js';


const router= express.Router();

router.post('/patient', patientValidationRules,AddPatient );

export default router;