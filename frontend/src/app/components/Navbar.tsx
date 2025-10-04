import { Cairo } from 'next/font/google'

const cairo = Cairo({ subsets: ['arabic'], weight: ['400','700'] })

export default function Navbar(){
    return (
        <div className='w-full border-b bg-white shadow-sm px-6 py-4 flex justify-end items-center'>
            <h1 className='text-xl font-bold text-[#3B82F6] font-cairo' >منصة الأمل </h1>

        </div>
    )
}