'use client'

import React from 'react'
import { User, Building, Heart } from 'lucide-react'
import RoleCard from '../../components/RoleCard'

export default function ChooseRole() {
  return (
    <div className="min-h-screen min-w-screen">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain pointer-events-none"
        style={{
          backgroundImage: "url('/Background.svg')",
          opacity: 0.15, 
          backgroundSize: '100%',
        }}
      ></div>
          <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">

      

      {/* 🔹 المحتوى */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        <h1 className="text-black text-3xl font-bold">اهلا بك في منصة الأمل</h1>
        <p className="text-gray-600 text-sm">
          قبل ما نكمل رحلتك معنا، اختار نوع حسابك عشان نقدر نوجّهك للتجربة اللي بتناسبك
        </p>
      </div>

      <div className="relative z-10 flex flex-row gap-6 mt-6 justify-center flex-wrap flex-row-reverse">
        <RoleCard
          icon={<User size={32} />}
          title="مريض"
          description="أحتاج الى طرف صناعي او مساعدة طبية "
          color="#7057FF"
          onClick={() => console.log('مريض')}
        />
        <RoleCard
          icon={<Building size={32} />}
          title="مؤسسة"
          description="مؤسسة صحية او خيرية تقدم الخدمات"
          color="#4CAF50"
          onClick={() => console.log('المؤسسة')}
        />
        <RoleCard
          icon={<Heart size={32} />}
          title="متبرع"
          description="أريد المساهمة في مساعدة المحتاجين"
          color="#EF4444"
          onClick={() => console.log('المتبرع')}
        />
        </div>
      </div>
    </div>
  )
}
