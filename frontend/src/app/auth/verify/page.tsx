'use client'
import React,{useState, useRef} from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { ShieldCheck } from 'lucide-react';
import sendOTP from '../../utils/otp'


export default function verifyPage() {
    const [code,setcode]=useState<string[]>(['','','','','',''])
    const [error,setError]=useState<{message:string, color:'red'|'green'}| null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const inputsRef= useRef<(HTMLInputElement |null)[]>([])
    const router = useRouter()

    const searchParams = useSearchParams()
    const email = searchParams.get('email') || ''


    const handleChange=(e,index:number)=>{
        const val =e.target.value
        if(!/^[0-9]?$/.test(val)) return 

        const newCode=[...code]
        newCode[index]=val
        setcode(newCode)
        if (error) setError('')

        if(val && index < 5){
            inputsRef.current[index+1].focus()
        }
    }

    const handelKey =(e,index:number)=>{
        if(e.key ==='Backspace' && !code[index]&& index>0){
            inputsRef.current[index-1].focus()
        }
    }

    const resendOTP = (email: string) => {
      setLoading(true);
      setError(null);
      return sendOTP(email) 
      .then(({ status, data }) => {
        if (status !== 200) setError({ message:'فشل إرسال الكود', color: 'red' });
        else setError({ message:'تم ارسال الرمز مجددًا' , color:'green'});
      })
      .catch(() => setError({message:'حدث خطأ في الاتصال بالسيرفر',color:'red'}))
      .finally(() => setLoading(false));
};


    const handleVerify = () => {
    if (code.some(num => num === '')) return
    setLoading(true)
    setError(null)

    const otp = code.join('')

    fetch('http://localhost:4000/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, code: otp })
    })
      .then((res:Response)=>{
      const status = res.status
      return res.json().then((data:string) => ({ status, data }))
       })
      .then(({status,data})=>{
        if(status!=200){
        setError({ message:'الكود غير صحيح أو مستخدم من قبل', color: 'red' });
         } else {
          const userData = data 
          if (userData.status === 'PENDING') {
            router.push('/auth/choose-role')
          } else {
            router.push('/dashboard')
          }
        }
      })
      .catch(err=>{
      console.error(err);
      setError({ message: 'حدث خطأ في الاتصال بالسيرفر', color: 'red' })
      
    })
    .finally(() => setLoading(false))
}

    
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
    <ShieldCheck className="text-[#10B981] bg-blue-100 p-4 rounded-full w-15 h-15" />
    <h1 className="text-black text-xl font-bold "> رمز التحقق</h1>
    <p className="text-gray-600 text-sm">ادخل الرمز المرسل الى</p>
    <span className="text-[#3B82F6] text-xs mb-4"> email@exapmle.com</span>
    <div className=" flex gap-2">
        {code.map((num,index)=>(
            <input
            key={index}
            type='text'
            maxLength={1}
            value={num}
            ref={el=>(inputsRef.current[index]=el)}
            onChange={e=>handleChange(e,index)}
            onKeyDown={e=>handelKey(e,index)}
            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black"            
            >
            </input>
        ))}
    </div>

    {error && (
      <p className={`text-xs mb-2 ${error.color === 'red' ? 'text-red-500' : 'text-green-500'}`}>
       {error.message}
      </p>
    )}

    <p className="text-xs text-gray-500">لم تستلم الرمز؟</p> 
    <button 
    onClick={()=>resendOTP(email)} 
    className="text-xs text-[#3B82F6]">إعادة الإرسال</button>
    <button
     disabled={code.some(num => num === '')}
     onClick={handleVerify}
     className={`w-86 bg-[#3B82F6] text-white font-medium py-2 rounded-lg hover:bg-[#2563EB] transition-all duration-200
        ${code.some(num => num === '') 
            ? 'bg-gray-300  cursor-not-allowed' 
            : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
        }
        `}>
            {loading && (
          <div
            role="status"
            className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              
            </span>
             </div>
        )}
        {loading ? 'جاري التحقق' : 'تأكيد'}
      </button>
    </div>

  )
}
