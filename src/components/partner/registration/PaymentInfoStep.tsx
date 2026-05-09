"use client";

import { motion } from "framer-motion";
import { CreditCard, Landmark, Info, ShieldCheck } from "lucide-react";
import { FormInput } from "./FormInput";

interface PaymentInfoStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function PaymentInfoStep({ data, updateData }: PaymentInfoStepProps) {
  const banks = [
    "กสิกรไทย", "ไทยพาณิชย์", "กรุงเทพ", "กรุงไทย", "กรุงศรี", "ทหารไทยธนชาต", "ออมสิน"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }} 
      className="max-w-2xl mx-auto space-y-10"
    >
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
         <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
          <CreditCard className="h-5 w-5" />
         </div>
         <div>
            <h3 className="text-xl font-black text-[#001A3D] tracking-tight">ข้อมูลการเงิน (Payment)</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Financial Account Details</p>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ธนาคาร</label>
          <div className="relative group">
            <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
            <select 
              value={data.bank} 
              onChange={(e) => updateData("bank", e.target.value)} 
              className="w-full h-12 rounded-xl border border-slate-100 bg-white pl-11 pr-4 text-sm font-bold text-[#001A3D] outline-none transition-all focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer group-hover:border-slate-200"
            >
              <option value="">เลือกธนาคาร</option>
              {banks.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <FormInput 
          label="เลขที่บัญชี"
          placeholder="XXX-X-XXXXX-X"
          value={data.accountNo}
          onChange={(val) => updateData("accountNo", val)}
          icon={CreditCard}
        />

        <div className="md:col-span-2">
          <FormInput 
            label="ชื่อบัญชี (ต้องตรงกับชื่อผู้สมัคร)"
            placeholder="ระบุชื่อ-นามสกุล ภาษาไทย"
            value={data.accountName}
            onChange={(val) => updateData("accountName", val)}
            icon={ShieldCheck}
            required
          />
        </div>
      </div>

      <div className="p-6 rounded-xl bg-[#0047AB]/5 border border-[#0047AB]/10 flex items-start gap-4">
         <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="h-4 w-4 text-[#0047AB]" />
         </div>
         <div className="space-y-1">
            <p className="text-xs font-black text-[#001A3D] uppercase tracking-wide">ข้อมูลความเข้าใจทางการเงิน</p>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
              * พาร์ทเนอร์จะรับทราบราคาจริงที่เก็บจากลูกค้าหลังจากได้รับงาน ผลตอบแทนสุทธิที่คุณเห็นคือรายได้ที่คุณจะได้รับจริงหลังจากหักค่าธรรมเนียมแพลตฟอร์มแล้ว
            </p>
         </div>
      </div>
    </motion.div>
  );
}
