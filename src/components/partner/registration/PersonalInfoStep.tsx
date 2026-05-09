"use client";

import { motion } from "framer-motion";
import { User, Phone, MessageSquare, BadgeCheck } from "lucide-react";
import { FormInput } from "./FormInput";

interface PersonalInfoStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function PersonalInfoStep({ data, updateData }: PersonalInfoStepProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }} 
      className="max-w-2xl mx-auto space-y-10"
    >
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
         <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
          <User className="h-5 w-5" />
         </div>
         <div>
            <h3 className="text-xl font-black text-[#001A3D] tracking-tight">ข้อมูลส่วนตัวและตัวตน</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Personal Identification Details</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          label="ชื่อจริง (ตามบัตรประชาชน) *"
          placeholder="ระบุชื่อจริง"
          value={data.firstName}
          onChange={(val) => updateData("firstName", val)}
          icon={BadgeCheck}
          required
        />

        <FormInput 
          label="นามสกุล (ตามบัตรประชาชน) *"
          placeholder="ระบุนามสกุล"
          value={data.lastName}
          onChange={(val) => updateData("lastName", val)}
          icon={BadgeCheck}
          required
        />

        <FormInput 
          label="ชื่อเล่น / ชื่อเรียกในวงการ"
          placeholder="เช่น ช่างแดง, เฮียเมธ"
          value={data.nickname}
          onChange={(val) => updateData("nickname", val)}
          icon={User}
        />

        <FormInput 
          label="เบอร์โทรศัพท์มือถือ (หลัก) *"
          placeholder="08X-XXX-XXXX"
          value={data.phone}
          onChange={(val) => updateData("phone", val)}
          icon={Phone}
          required
        />

        <FormInput 
          label="เบอร์โทรศัพท์ (สำรอง)"
          placeholder="08X-XXX-XXXX"
          value={data.phoneSecondary}
          onChange={(val) => updateData("phoneSecondary", val)}
          icon={Phone}
        />

        <FormInput 
          label="LINE ID (เพื่อส่งพิกัดงาน)"
          placeholder="@line_id"
          value={data.lineId}
          onChange={(val) => updateData("lineId", val)}
          icon={MessageSquare}
        />
      </div>

      <div className="pt-8 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-6">
           <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
            <BadgeCheck className="h-4 w-4" />
           </div>
           <div>
              <h4 className="text-sm font-black text-[#001A3D] tracking-tight uppercase">ข้อมูลการเข้าสู่ระบบ</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Account Authentication</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput 
            label="ชื่อผู้ใช้งาน (Username) *"
            placeholder="ใช้สำหรับล็อกอินเข้าสู่ระบบ"
            value={data.username}
            onChange={(val) => updateData("username", val)}
            icon={User}
            required
          />

          <FormInput 
            label="รหัสผ่าน (Password) *"
            placeholder="ตั้งรหัสผ่านอย่างน้อย 6 ตัวอักษร"
            value={data.password}
            onChange={(val) => updateData("password", val)}
            icon={BadgeCheck}
            type="password"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}
