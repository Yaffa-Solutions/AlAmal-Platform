import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { PatientFormData, patientSchema } from '../validation/patient';
import { API_BASE, postForm } from '@/lib/api';

export default function usePatientForm() {
  const [disabilityPercentage, setDisabilityPercentage] = useState(0);
  const [medicalReport, setMedicalReport] = useState<File | null>(null);
  const [prosthetic, setProsthetic] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({
    prosthetic: false,
    gender: false,
    city: false,
  });
  const [selectedProsthetic, setSelectedProsthetic] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const genders = ['ذكر', 'أنثى'];
  const cities = ['غزة', 'رفح', 'خان يونس', 'دير البلح', 'شمال غزة'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patient/prosthetic`)
      .then((res) => res.json())
      .then((data) => {
        setProsthetic(data.prostheticTypes);
      });
  }, []);

  const uploadFile = (file: File) => {
    return fetch(`${API_BASE}/api/patient/upload-patient-files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, fileType: file.type }),
    }).then((res) => res.json());
  };

  const onSubmit = (data: PatientFormData) => {
    if (!medicalReport) {
      toast.error('يرجى إرفاق التقرير الطبي قبل الإرسال');
      return;
    }

    uploadFile(medicalReport)
      .then((res) => {
        const { uploadUrl, fileUrl } = res;

          console.log('uploadUrl' ,uploadUrl)

        return fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': medicalReport.type },
          body: medicalReport,
        }).then(() => fileUrl);
      })
      .then((fileUrl) => {
        const payload = {
          ...data,
          age: Number(data.age),
          disability_percentage: Number(data.disability_percentage),
          id: 1,
          medical_reports_url: fileUrl,
        };

        // return postForm<Patient>('/api/patient/register', payload);
        return fetch(`${API_BASE}/api/patient/register`,{
          method:'POST' , 
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify( payload)
        })
      })
      .then(() => {
        toast('تم  ارسال الطلب بنجاح ', {
          description: 'سيتم التواصل معك قريباً.',
        });
        reset();
        setSelectedCity('');
        setSelectedGender('');
        setSelectedProsthetic('');
        setDisabilityPercentage(0);
        setMedicalReport(null);
      })
      .catch((err) => {
        console.error(err);
        toast.error('حدث خطأ أثناء الإرسال');
      });
  };

  return {
    disabilityPercentage,
    setDisabilityPercentage,
    medicalReport,
    setMedicalReport,
    register,
    handleSubmit,
    errors,
    setValue,
    onSubmit,
    prosthetic,
    dropdownOpen,
    selectedCity,
    selectedGender,
    selectedProsthetic,
    setDropdownOpen,
    setSelectedCity,
    setSelectedGender,
    setSelectedProsthetic,
    genders,
    cities,
  };
}
