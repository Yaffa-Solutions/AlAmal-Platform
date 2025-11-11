'use client'
import React,{ useState, useEffect } from 'react'

interface ResendOTPButtonProps{
  username:string;
  onResend:(username:string)=>Promise<void>;
  setError:React.Dispatch<React.SetStateAction<{message:string;color:'red' | 'green'} |null>>;


}

export default function ResendOTPButton({ username, onResend, setError}:ResendOTPButtonProps) {
    const [timer, setTimer]=useState(0)
    const[attempts,setAttempts]=useState(0)
    const [disabled, setDisabled]=useState(false)

    useEffect(()=>{
        const savedAttempts= parseInt(localStorage.getItem('otpAttempts') ?? '0')
        const lastsent= parseInt(localStorage.getItem('lastOtpSentAt') ?? '0')
        const now =Date.now()

        if (now - lastsent > 3600000){
            localStorage.removeItem('otpAttempts')
            setAttempts(0)
        }else{
            setAttempts(savedAttempts)
        }

    if(now - lastsent < 60000){
        const remaining= 60-Math.floor((now-lastsent)/1000)
        startCountdown(remaining)
    }
    },[])

    const startCountdown=(seconds:number)=>{
        setTimer(seconds)
        setDisabled(true)
        const interval = setInterval(()=>{
            setTimer((prev)=>{
                if(prev <=1){
                    clearInterval(interval)
                    setDisabled(false)
                    return 0;
                }
                return prev- 1
            })
        },1000)
    }

    const handleResend = async () => {
    const now = Date.now();
    const lastSent = parseInt(localStorage.getItem('lastOtpSentAt') ?? '0')

    if (attempts >= 3 && now - lastSent < 60 * 60 * 1000) {
      setError({
        message: 'لقد تجاوزت عدد المحاولات المسموح بها حاول بعد ساعة',
        color: 'red',
      });
      return;
    }

    if (now - lastSent < 60 * 1000) {
      setError({
        message: `يرجى الانتظار ${timer} ثانية قبل المحاولة التالية`,
        color: 'red',
      });
      return;
    }
    await onResend(username);

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem('otpAttempts', newAttempts.toString());
    localStorage.setItem('lastOtpSentAt', now.toString());

    startCountdown(60);
}

  return (
        <button
      onClick={handleResend}
      disabled={disabled}
      className={`text-xs font-medium transition-all duration-200 ${
        disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-[#3B82F6] hover:text-blue-700'
      }`}
    >
      {disabled ? `أعد الإرسال بعد ${timer} ثانية` : 'إعادة الإرسال'}
    </button>

)
}
