'use client';
import EditPatientForm from '@/app/components/patient/EditPatientForm';
import NavbarDash from '@/app/components/patient/NavbarDash';
import { OrderDetailsDialog } from '@/app/components/patient/OrderDetailsDialog';
import { usePatientDashboard } from '@/app/hooks/patient-hook';
import { useState } from 'react';

export default function Patient() {
  const [open, setOpen] = useState(false);
  const [open_edit, setOpenEdit] = useState(false);
  const { requestDetails, translateDisability } = usePatientDashboard();

  return (
    <div
      className="min-h-screen w-full"
      data-name="Tracker"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgb(249, 250, 251) 0%, rgb(249, 250, 251) 100%)',
      }}
    >
      <NavbarDash/>
      <div
        className="box-border content-stretch flex flex-col gap-[16px] items-end leading-[0] not-italic px-4 sm:px-8 md:px-16 lg:px-[112px] py-0 w-full max-w-[1441px] mx-auto mt-[40px] sm:mt-[50px]
"
        data-name="Heading 1"
      >
        <div className="flex flex-col font-['Cairo:Bold',sans-serif] font-bold justify-center min-w-full relative shrink-0 text-[#1d64d8] text-[24px] sm:text-[28px] md:text-[32px] text-right w-[min-content]">
          <p className="leading-[36px] sm:leading-[48px]" dir="auto">
            أهلا بك {requestDetails?.name}!
          </p>
        </div>
        <div className="flex flex-col font-['Cairo:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[16px] sm:text-[18px] md:text-[20px] text-center text-gray-600 text-nowrap">
          <p
            className="leading-[24px] sm:leading-[32.5px] whitespace-pre"
            dir="auto"
          >
            طلبك وصلنا، بانتظار المراجعة!
          </p>
        </div>
      </div>

      <div className="box-border content-stretch flex flex-col gap-[20px] items-center px-4 sm:px-8 md:px-16 lg:px-[112px] py-0 w-full max-w-[1441px] mx-auto mt-[20px] pb-8">
        <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
          <div className="flex flex-col font-['Cairo:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] sm:text-[18px] text-center text-gray-800 text-nowrap">
            <p className="leading-[24px] whitespace-pre" dir="auto">
              تفاصيل الطلب
            </p>
          </div>
          <div className="bg-gray-50 relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-col items-end size-full">
              <div className="box-border content-stretch flex flex-col gap-4 sm:gap-[18px] items-end p-4 sm:p-5 md:p-[20px] relative w-full">
                <div className="content-stretch flex flex-col lg:flex-row-reverse gap-4 lg:gap-[16px] items-start w-full">
                  <div className="content-stretch flex flex-col gap-4 sm:gap-[16px] items-start relative shrink-0 w-full lg:w-auto lg:flex-1">
                    <div className="content-stretch flex flex-col sm:flex-row items-start gap-4 sm:gap-0 sm:justify-between relative shrink-0 w-full">
                      <div className="content-stretch flex font-['Cairo:Medium',sans-serif] font-medium items-start justify-end gap-2 leading-[0] not-italic relative shrink-0 tracking-[0.4px] w-full sm:w-[48%]">
                        <div className="flex flex-col justify-center relative shrink-0 text-[14px] text-gray-800">
                          <p className="leading-[16px]" dir="auto">
                            {requestDetails &&
                              (() => {
                                const date = new Date(
                                  requestDetails.created_at
                                );
                                return `${date.toLocaleDateString('ar-EG', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })} - ${date.toLocaleTimeString('ar-EG', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true,
                                })}`;
                              })()}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center relative shrink-0 text-[14px] sm:text-[16px] text-gray-600 text-nowrap text-right">
                          <p
                            className="leading-[16px] whitespace-pre"
                            dir="auto"
                          >
                            تاريخ الإرسال:
                          </p>
                        </div>
                      </div>
                      <div className="content-stretch flex font-['Cairo:Medium',sans-serif] font-medium items-start justify-end gap-2 leading-[0] not-italic relative shrink-0 text-[14px] sm:text-[16px] tracking-[0.4px] w-full sm:w-[48%]">
                        <div className="flex flex-col justify-center relative shrink-0 text-gray-800">
                          <p className="leading-[16px]" dir="auto">
                            REQ-#{requestDetails?.id}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center relative shrink-0 text-gray-600 text-nowrap text-right">
                          <p
                            className="leading-[16px] whitespace-pre"
                            dir="auto"
                          >
                            رقم الطلب:
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between relative shrink-0 w-full">
                      <div className="content-stretch flex items-center justify-end gap-2 relative shrink-0 w-full sm:w-[48%]">
                        <div className="h-[24px] relative shrink-0">
                          <div className="bg-[#ecfdf8] box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] rounded-[20px]">
                            <div className="flex flex-col font-['Cairo:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-emerald-600 text-nowrap tracking-[0.4px]">
                              <p
                                className="leading-[16px] whitespace-pre"
                                dir="auto"
                              >
                                {requestDetails &&
                                  (() => {
                                    return requestDetails.status === 'PENDING'
                                      ? 'قيد الانتظار'
                                      : requestDetails.status === 'INPROGRESS'
                                      ? 'قيد التنفيذ'
                                      : requestDetails.status === 'ASSIGNED'
                                      ? 'تم التعيين'
                                      : requestDetails.status === 'COMPLETED'
                                      ? 'مكتمل'
                                      : requestDetails.status === 'REJECTED'
                                      ? 'مرفوض'
                                      : '';
                                  })()}{' '}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col font-['Cairo:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] sm:text-[16px] text-gray-600 text-nowrap text-right tracking-[0.4px]">
                          <p
                            className="leading-[16px] whitespace-pre"
                            dir="auto"
                          >
                            الحالة:
                          </p>
                        </div>
                      </div>
                      <div className="content-stretch flex font-['Cairo:Medium',sans-serif] font-medium items-start justify-end gap-2 leading-[0] not-italic relative shrink-0 text-[14px] sm:text-[16px] tracking-[0.4px] w-full sm:w-[48%]">
                        <div className="flex flex-col justify-center relative shrink-0 text-gray-800">
                          <p className="leading-[16px]" dir="auto">
                            {requestDetails
                              ? translateDisability(
                                  requestDetails.disability_type
                                )
                              : ''}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center relative shrink-0 text-gray-600 text-nowrap text-right">
                          <p
                            className="leading-[16px] whitespace-pre"
                            dir="auto"
                          >{`نوع الطرف: `}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center relative shrink-0 w-full lg:w-auto">
                    {(requestDetails?.status === 'PENDING' ||
                      requestDetails?.status === 'REJECTED') && (
                      <button
                        className="bg-[#1d64d8] box-border content-stretch flex gap-[4px] items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,25,38,0.1)] shrink-0 cursor-pointer hover:bg-[#1557c0] transition-colors w-full sm:w-auto"
                        onClick={() => setOpenEdit(true)}
                      >
                        <div className="content-stretch flex gap-[6px] h-[24px] items-center relative shrink-0">
                          <p
                            className="capitalize font-['Cairo:SemiBold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[14px] sm:text-[16px] text-nowrap text-white whitespace-pre"
                            dir="auto"
                          >
                            تعديل الطلب
                          </p>
                        </div>
                      </button>
                    )}

                    <button
                      className="bg-white box-border content-stretch flex gap-[4px] items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto"
                      data-name="Button"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute border border-blue-500 border-solid inset-0 pointer-events-none rounded-[8px]"
                      />
                      <div className="content-stretch flex gap-[6px] h-[24px] items-center relative shrink-0">
                        <p
                          className="capitalize font-['Cairo:SemiBold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[14px] sm:text-[16px] text-blue-500 text-nowrap whitespace-pre"
                          dir="auto"
                        >
                          عرض الطلب
                        </p>
                      </div>
                    </button>
                    <OrderDetailsDialog open={open} onOpenChange={setOpen} />
                    <EditPatientForm
                      open={open_edit}
                      onOpenChange={setOpenEdit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
          <div className="flex flex-col font-['Cairo:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] sm:text-[18px] text-center text-gray-800 text-nowrap">
            <p className="leading-[24px] whitespace-pre" dir="auto">
              الإشعارات
            </p>
          </div>

          <div className="bg-gray-50 relative rounded-[8px] shrink-0 w-full">
            <div className="flex flex-col items-end size-full">
              <div className="box-border content-stretch flex flex-col gap-4 sm:gap-[18px] items-end p-4 sm:p-5 md:p-[20px] relative w-full">
                {requestDetails &&
                  (() => {
                    const notificationMap: Record<
                      string,
                      { text: string; bg: string; iconColor: string }
                    > = {
                      INPROGRESS: {
                        text: 'بدء مراجعة الطلب',
                        bg: 'bg-[#eff5ff]',
                        iconColor: '#3B82F6',
                      },
                      ASSIGNED: {
                        text: 'تم استلام طلبك بنجاح',
                        bg: 'bg-[#eff5ff]',
                        iconColor: '#3B82F6',
                      },
                      COMPLETED: {
                        text: 'تم استلام الطرف الصناعي بنجاح',
                        bg: 'bg-[#eff5ff]',
                        iconColor: '#3B82F6',
                      },
                      PENDING: {
                        text: 'طلبك قيد الانتظار',
                        bg: 'bg-[#faf9fb]',
                        iconColor: '#F3F4F6',
                      },
                      REJECTED: {
                        text: 'تم رفض طلبك',
                        bg: 'bg-[#fee2e2]',
                        iconColor: '#ef4444',
                      },
                    };

                    const { text, bg, iconColor } =
                      notificationMap[requestDetails.status];

                    return (
                      <div
                        className={`${bg} relative rounded-[8px] shrink-0 w-full   ${
                          requestDetails.status === 'REJECTED'
                            ? 'border-2 border-red-500 border-dashed'
                            : ''
                        }`}
                      >
                        <div className="flex flex-row items-center justify-end size-full">
                          <div className="box-border content-stretch flex gap-3 sm:gap-[16px] items-center justify-end p-[10px] relative w-full">
                            <div className="content-stretch flex flex-col font-['Cairo:Medium',sans-serif] font-medium gap-[4px] items-end leading-[0] not-italic relative shrink-0 text-[13px] sm:text-[14px] text-right tracking-[0.4px]">
                              <div className="flex flex-col justify-center relative shrink-0 text-gray-800">
                                <p
                                  className="leading-[18px] sm:leading-[20px]"
                                  dir="auto"
                                >
                                  {text}
                                </p>
                              </div>

                              <div className="flex flex-col justify-center relative shrink-0 text-gray-600 text-nowrap">
                                <p
                                  className="leading-[16px] whitespace-pre"
                                  dir="auto"
                                >
                                  {requestDetails.updated_at &&
                                    (() => {
                                      const date = new Date(
                                        requestDetails.updated_at
                                      );
                                      return `${date.toLocaleDateString(
                                        'ar-EG',
                                        {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                        }
                                      )} - ${date.toLocaleTimeString('ar-EG', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                      })}`;
                                    })()}
                                </p>
                              </div>
                            </div>

                            <div
                              className="relative shrink-0 size-[32px] flex-shrink-0"
                              data-name="User"
                            >
                              {requestDetails.status === 'REJECTED' ? (
                                <svg
                                  className="w-6 h-6"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="12"
                                    fill="#EF4444"
                                  />
                                  <path
                                    d="M8 8l8 8M16 8l-8 8"
                                    stroke="white"
                                    strokeWidth="2"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="block size-full"
                                  fill="none"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 32 32"
                                >
                                  <g id="User">
                                    <rect
                                      fill={iconColor}
                                      height="32"
                                      rx="16"
                                      width="32"
                                    />
                                    <path
                                      d="M23.8125 11.1386L13.5729 21.8045C13.5135 21.8665 13.4429 21.9156 13.3652 21.9492C13.2875 21.9827 13.2042 22 13.1201 22C13.036 22 12.9527 21.9827 12.8751 21.9492C12.7974 21.9156 12.7268 21.8665 12.6673 21.8045L8.18755 17.1382C8.06746 17.0131 8 16.8434 8 16.6665C8 16.4896 8.06746 16.32 8.18755 16.1949C8.30763 16.0698 8.4705 15.9996 8.64033 15.9996C8.81015 15.9996 8.97302 16.0698 9.09311 16.1949L13.1201 20.3904L22.9069 10.1954C23.027 10.0703 23.1898 10 23.3597 10C23.5295 10 23.6924 10.0703 23.8125 10.1954C23.9325 10.3204 24 10.4901 24 10.667C24 10.8439 23.9325 11.0135 23.8125 11.1386Z"
                                      fill={
                                        requestDetails.status === 'PENDING'
                                          ? '#4B5563'
                                          : 'white'
                                      }
                                      id="Vector"
                                    />
                                  </g>
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                        {requestDetails.status === 'REJECTED' ? (
                          <ul className="bg-gradient-to-r from-blue-10 to-blue-10  p-6 text-right space-y-3 ">
                            <li className="text-blue-700 font-semibold text-base flex items-center justify-end gap-2">
                             
                              <span className="text-gray-700 leading-relaxed">
                                نحن نؤمن بأن كل بداية جديدة تصنع فرصة أفضل
                              </span> <span>لا تقلق 🌿</span>
                            </li>
                            <li className="text-gray-700 leading-relaxed">
                              نحن هنا لدعمك دائمًا — يمكنك تعديل طلبك وإرساله من
                              جديد، وسنكون إلى جانبك خطوة بخطوة 💙
                            </li>
                          </ul>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    );
                  })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
