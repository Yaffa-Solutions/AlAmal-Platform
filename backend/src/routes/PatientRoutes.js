import express from  'express';
import AddPatient from '../controllers/PatientController.js';


const router= express.Router();

router.post('/patient',AddPatient );

export default router;