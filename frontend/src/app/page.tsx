import Navbar from './components/landing/Navbar';
import { User, Building, Heart, Phone, Mail } from 'lucide-react';
import WhoCard from './components/landing/WhoCard';
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <Navbar />
      <section
        id="home"
        className="relative flex flex-col items-center justify-center text-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/backgroung1.png')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(147,187,253,0.4), rgba(255,255,255,0.4))',
          }}
        ></div>

        <div className="relative z-10 mt-20">
          <h1 className="text-black font-bold text-4xl pb-2">
            معا لنعيد الحياة بخطوة جديدة
          </h1>
          <p className="text-black pb-10">
            منصة انسانية تربط المرضى بالمؤسسات والمتبرعين لمد يد العون بموثوقية
            وشفافية
          </p>
          <Link
            href={'/pages/auth/login'}
            className="inline-block bg-blue-500 text-white pr-6 pl-6 text-center py-2 rounded-lg hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out transform cursor-pointer"
          >
            انضم الآن
          </Link>
        </div>
      </section>

      <section
        id="about"
        className="grid justify-center text-center pt-15 pb-40 bg-gray-100"
      >
        <h1 className="text-black font-bold text-3xl pb-2">من نحن</h1>
        <p className="text-gray-700 pb-4">
          نحن منصة شاملة تجمع بين المرضى والمؤسسات الطبية والمتبرعين في بيئة
          امنة وموثوقة
        </p>
        <div className="relative z-10 flex mt-6 justify-center flex-wrap flex-row-reverse">
          <WhoCard
            icon={<User size={32} />}
            title="المرضى"
            description="تسجيل احتياجاتهم الطبية والحصول على المساعدة من خلال منصة امنة وسهلة الاستخدام"
            backgroundColor="#3B82F6"
            width="330px"
          />
          <WhoCard
            icon={<Building size={32} />}
            title="المؤسسات"
            description="ادارة المرضى والمخزون الطبي بكفاءة عالية وتقديم الخدمات الصحية المتخصصة"
            backgroundColor="#3B82F6"
            width="330px"
          />
          <WhoCard
            icon={<Heart size={32} />}
            title="المتبرعين"
            description="دعم امن وشفاف للمرضى المحتاجين مع ضمان وصول المساعدة لمستحقيها بطريقة موثوقة"
            backgroundColor="#3B82F6"
            width="330px"
          />
        </div>
      </section>
      <section id="Why" className="grid justify-center text-center pt-15 pb-40">
        <h1 className="text-black font-bold text-3xl pb-2">
          لماذا منصة الامل؟{' '}
        </h1>
        <p className="text-gray-700 pb-4">
          نقدم حلولا مبتكرة وموثوقة لضمان وصول المساعدة الطبيبة لكل من يحتاجها
        </p>
        <div className=" z-10 flex mt-6 justify-center ">
          <WhoCard
            icon={<Heart size={32} />}
            title="الشفافية الكاملة"
            description="تتبع كامل للتبرعات والمساعدات مع تقارير دورية واضحة"
            backgroundColor="#047854"
            width="250px"
          />
          <WhoCard
            icon={<Heart size={32} />}
            title="سهولة الاستخدام"
            description="واجهة بسيطة وسهلة تناسب جميع الفئات العمرية والتقنية"
            backgroundColor="#047854"
            width="250px"
          />
          <WhoCard
            icon={<Heart size={32} />}
            title="الامان والحماية"
            description="حماية عالية للبيانات الشخصية والمالية مع اعلى معايير الامان"
            backgroundColor="#047854"
            width="250px"
          />
          <WhoCard
            icon={<Heart size={32} />}
            title="التاثير الحقيقي"
            description="نتائج ملموسة وتغيير حقيقي في حياة المرضى والمحتاجين"
            backgroundColor="#047854"
            width="250px"
          />
        </div>
      </section>
      <section
        id="start"
        className="flex flex-col items-center justify-center text-center py-20"
        style={{ background: 'linear-gradient(135deg, #3B82F6, #10B981)' }}
      >
        <h1 className="text-white font-bold text-3xl pb-2">
          كن جزءا من التغيير
        </h1>
        <p className="text-white pb-4">
          ساعد من يحتاجك اليوم وكن سببا في اعادة الامل والحياة لمن فقدها
        </p>
        <Link
          href={'/pages/auth/login'}
          className="bg-white text-[#3B82F6] w-28 text-center py-2 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105  cursor-pointer"
        >
          ابدا رحلتك معنا
        </Link>
      </section>
      <footer className="text-right pl-10 pr-10 mt-10">
        <h1 className="text-black font-bold text-xl pb-2">منصة الامل</h1>
        <div className="flex justify-between">
          <div className="text-gray-700 pb-4 flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 flex-row-reverse">
              <Phone
                size={14}
                className="text-gray-500 rounded-2xl w-6 h-6 p-1"
              />
              <span>+970 59 123 4567</span>
            </div>
            <div className="flex items-center gap-2 flex-row-reverse">
              <Mail
                size={14}
                className="text-gray-500 rounded-2xl w-6 h-6 p-1"
              />
              <span>info@hope-platform.com</span>
            </div>
          </div>

          <p className="text-gray-700 pb-4 w-64 text-right">
            منصة انسانية تهدف الى ربط المحتاجين بالمساعدة الطبية اللازمة
          </p>
        </div>
        <div className="border-t border-gray-500 my-4"></div>
        <span className="text-gray-700 text-center block">
          منصة الامل جميع الحقوق محفوظة
        </span>
      </footer>
    </div>
  );
}
