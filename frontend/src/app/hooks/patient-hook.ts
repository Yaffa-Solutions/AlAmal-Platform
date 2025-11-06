import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { PatientFormData, patientSchema } from '../validation/patient';
import { API_BASE, postForm, putForm } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Patient } from '@/types/patient';

//////////ضايل افحص اذا المريض رجع يدخل بياناته كمان مرة ترجع ايرور انت مدخل بياناتك روح فوت
////في حال مش مسجل بياناته المريض و بدو يروح عالداشبورد يروح على صفحة تسجيل دخول
////في الاشعارات بنحط تاربخ الابدبت
//// وين احط ال date for created request or updated_at when change the status from organization

export function usePatientForm() {
  const router = useRouter();
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
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    return fetch(`${API_BASE}/api/patient/upload-patient-files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, fileType: file.type }),
    }).then((res) => res.json());
  };

  const onSubmit = (data: PatientFormData) => {
    console.log('done');
    if (!medicalReport) {
      toast.error('يرجى إرفاق التقرير الطبي قبل الإرسال');
      return;
    }

    uploadFile(medicalReport)
      .then((res) => {
        const { url, key } = res;
        return fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': medicalReport.type },
          body: medicalReport,
        }).then(() => key);
      })
      .then((key) => {
        console.log(key);
        const payload = {
          ...data,
          user_id: 11,
          medical_reports_url: key,
        };
        console.log(payload);
        return postForm<Patient>(`/api/patient/register`, payload);
      })
      .then((patient) => {
        toast('تم إرسال الطلب بنجاح', {
          description: 'سيتم التواصل معك قريباً.',
        });
        router.push('/pages/dashboards/patient');
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
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return {
    disabilityPercentage,
    setDisabilityPercentage,
    medicalReport,
    setMedicalReport,
    register,
    reset,
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
    submitting,
    genders,
    cities,
  };
}

export function usePatientDashboard() {
  const [requestDetails, setRequestDetails] =
    useState<PatientRequestDetails | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/patient/requestDetails`)
      .then((res) => res.json())
      .then(({ data }) => {
        setRequestDetails(data);
      })
      .catch((er) => toast.error(er.message));
  }, []);

  function translateDisability(type: string): string {
    switch (type) {
      case 'RIGHT_ARM':
        return 'الذراع اليمنى';
      case 'LEFT_ARM':
        return 'الذراع اليسرى';
      case 'RIGHT_LEG':
        return 'الساق اليمنى';
      case 'LEFT_LEG':
        return 'الساق اليسرى';
      case 'RIGHT_HAND':
        return 'اليد اليمنى';
      case 'LEFT_HAND':
        return 'اليد اليسرى';
      case 'RIGHT_FOOT':
        return 'القدم اليمنى';
      case 'LEFT_FOOT':
        return 'القدم اليسرى';
      default:
        return '';
    }
  }

  return { requestDetails, translateDisability };
}

export interface PatientRequestDetails {
  id: number;
  name: string;
  status: 'PENDING' | 'INPROGRESS' | 'ASSIGNED' | 'COMPLETED' | 'REJECTED';
  created_at: Date;
  updated_at: Date;
  disability_type:
    | 'RIGHT_ARM'
    | 'LEFT_ARM'
    | 'RIGHT_LEG'
    | 'LEFT_LEG'
    | 'RIGHT_HAND'
    | 'LEFT_HAND'
    | 'RIGHT_FOOT'
    | 'LEFT_FOOT';
  gender: 'MALE' | 'FEMALE';
  age: number;
  city: string;
  medical_reports_url: string;
  Phone: string;
  disability_percentage: number;
}

export function useUpdatePatientForm() {
  const router = useRouter();
  const [disabilityPercentage, setDisabilityPercentage] = useState(0);
  const [medicalReport, setMedicalReport] = useState<File | null>(null);
  const [prosthetic, setProsthetic] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({
    prosthetic: false,
    gender: false,
    city: false,
  });
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [selectedProsthetic, setSelectedProsthetic] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    return fetch(`${API_BASE}/api/patient/upload-patient-files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, fileType: file.type }),
    }).then((res) => res.json());
  };

  const onSubmit = (data: PatientFormData) => {
    setSubmitting(true);

    const handleUpdate = (key?: string) => {
      const payload = {
        ...data,
        disability_percentage: data.disability_percentage,
        user_id: 11,
        medical_reports_url: key,
      };

      console.log(payload);
      if (key) {
        setUploadedFileName(key.split('/').pop() || null);
      }

      putForm<Patient>(`/api/patient/requestDetails`, payload)
        .then(() => {
          toast('تم تحديث البيانات بنجاح', {
            description: 'سيتم التواصل معك قريباً.',
          });

          setSelectedCity(data.city);
          setSelectedGender(data.gender === 'MALE' ? 'ذكر' : 'أنثى');
          setSelectedProsthetic(data.disability_type);
          setDisabilityPercentage(data.disability_percentage);
          setMedicalReport(null);

          setValue('city', data.city);
          setValue('gender', data.gender);
          setValue('disability_type', data.disability_type);
          setValue('disability_percentage', data.disability_percentage);
          setValue('name', data.name);
          setValue('age', data.age);
          setValue('Phone', data.Phone);
        })
        .catch((err) => {
          console.error(err);
          toast.error('حدث خطأ أثناء الإرسال');
        })
        .finally(() => setSubmitting(false));
    };

    if (medicalReport) {
      uploadFile(medicalReport)
        .then((res) => {
          const { url, key } = res;
          return fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': medicalReport.type },
            body: medicalReport,
          }).then(() => key);
        })
        .then((key) => handleUpdate(key))
        .catch((err) => {
          console.error(err);
          toast.error('حدث خطأ أثناء رفع الملف');
          setSubmitting(false);
        });
    } else {
      handleUpdate();
    }
  };

  return {
    disabilityPercentage,
    setDisabilityPercentage,
    medicalReport,
    setMedicalReport,
    register,
    reset,
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
    uploadedFileName,
    submitting,
    genders,
    cities,
  };
}
