import { useState } from "react";
import { Check } from "lucide-react";
import { usePatientDashboard } from "@/app/hooks/patient-hook";

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailsDialog = ({ open, onOpenChange }: OrderDetailsDialogProps) => {
     const { requestDetails , translateDisability } = usePatientDashboard();

     if (!open) return null; 
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-white w-1/2 max-w-[700px] max-h-[85vh] overflow-y-auto p-8 rounded-xl shadow-lg relative"
        dir="rtl"
      >
        <button
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={() => onOpenChange(false)}
        >
          ✕
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-foreground text-right">أهلًا بك {requestDetails?.name} !</h2>
            <p className="text-muted-foreground text-right">طلبك وصلنا، بانتظار المراجعة!</p>
          </div>
          <div className="bg-[#E8F5E9] rounded-xl p-4 flex items-start gap-3">
            <div className="bg-[#4CAF50] rounded-full p-1.5 mt-0.5">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div className="flex-1 text-right">
              <p className="font-semibold text-[#1B5E20] mb-1">تم إرسال طلبك بنجاح</p>
              <p className="text-sm text-[#2E7D32]">طلبك وصلنا، بانتظار المراجعة!</p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-right text-foreground">البيانات الشخصية</h3>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="text-right space-x-5 flex">
                  <p className="text-sm text-muted-foreground">الاسم الكامل:</p>
                  <p className="font-medium text-foreground">{requestDetails?.name}  </p>
                </div>
                <div className="text-right space-x-5 flex">
                  <p className="text-sm text-muted-foreground">رقم الطلب:</p>
                  <p className="font-medium text-foreground"> REQ-#{requestDetails?.id}</p>
                </div>
                <div className="text-right space-x-5 flex">
                  <p className="text-sm text-muted-foreground">الجنس:</p>
                  <p className="font-medium text-foreground">{requestDetails?.gender ==='FEMALE' ? 'ذكر':'أنثى'}</p>
                </div>
                <div className="text-right space-x-5 flex">
                  <p className="text-sm text-muted-foreground">المدينة:</p>
                  <p className="font-medium text-foreground">{requestDetails?.city}</p>
                </div>
                <div className="text-right space-x-5 flex">
                  <p className="text-sm text-muted-foreground">العمر:</p>
                  <p className="font-medium text-foreground">{requestDetails?.age}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-lg text-right text-foreground">المعلومات الطبية</h3>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="text-right  space-x-5 flex">
                  <p className="text-sm text-muted-foreground">نسبة إعاقة:</p>
                  <p className="font-medium text-foreground">{requestDetails?.disability_percentage}%</p>
                </div>
                <div className="text-right  space-x-5 flex">
                  <p className="text-sm text-muted-foreground">نوع الطرف المطلوب:</p>
                  <p className="font-medium text-foreground">
                    {requestDetails ? translateDisability(requestDetails.disability_type) :''}
                  </p>
                </div>
                <div className="text-right space-y-1 col-span-2">
                  <p className="text-sm text-muted-foreground">التقرير الطبي:</p>
                  <a href="#" className="text-primary hover:underline font-medium inline-block">
                    {requestDetails?.medical_reports_url.split('/').pop()}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-right text-foreground">معلومات التواصل</h3>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-right space-y-1">
                <p className="text-sm text-muted-foreground">رقم الواتس:</p>
                <p className="font-medium text-foreground" dir="ltr">{requestDetails?.Phone}</p>
              </div>
            </div>
          </div>

          {/* <div className="flex gap-3 pt-2">
            <button
              className="flex-1 h-12 text-base border-2 border-gray-300 rounded-lg"
              onClick={() => onOpenChange(false)}
            >
              إغلاق
            </button>
            <buttonw
              className="flex-1 h-12 text-base bg-blue-600 text-white rounded-lg"
            >
              تعديل الطلب
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
