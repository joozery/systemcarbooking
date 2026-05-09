"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Truck, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  Camera, 
  IdCard, 
  Check,
  MapPin,
  Clock,
  CreditCard,
  AlertCircle,
  Info
} from "lucide-react";
import Link from "next/link";

type PartnerData = {
  // 1. Personal
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  phoneSecondary: string;
  lineId: string;
  // 2. Vehicle
  vehicleTypes: string[];
  vehicleModel: string;
  licensePlate: string;
  plateProvince: string;
  extraEquipment: string[];
  // 3. Zone
  baseProvince: string;
  baseDistrict: string;
  serviceScope: string;
  availableTime: string;
  // 4. Payment
  bank: string;
  accountNo: string;
  accountName: string;
  // 5. Acceptance
  acceptPrice: boolean;
  acceptGP: boolean;
  acceptLiability: boolean;
};

const steps = [
  { id: 1, name: "ส่วนตัว", icon: User },
  { id: 2, name: "ข้อมูลรถ", icon: Truck },
  { id: 3, name: "พื้นที่/เวลา", icon: MapPin },
  { id: 4, name: "การเงิน", icon: CreditCard },
  { id: 5, name: "เอกสาร", icon: FileText },
];

export function PartnerWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PartnerData>({
    firstName: "",
    lastName: "",
    nickname: "",
    phone: "",
    phoneSecondary: "",
    lineId: "",
    vehicleTypes: [],
    vehicleModel: "",
    licensePlate: "",
    plateProvince: "",
    extraEquipment: [],
    baseProvince: "",
    baseDistrict: "",
    serviceScope: "เฉพาะในจังหวัดและปริมณฑล",
    availableTime: "สแตนด์บาย 24 ชม.",
    bank: "",
    accountNo: "",
    accountName: "",
    acceptPrice: false,
    acceptGP: false,
    acceptLiability: false,
  });

  const updateData = (key: keyof PartnerData, value: any) => setData((prev) => ({ ...prev, [key]: value }));
  
  const toggleVehicleType = (type: string) => {
    const current = data.vehicleTypes;
    if (current.includes(type)) {
      updateData("vehicleTypes", current.filter(t => t !== type));
    } else {
      updateData("vehicleTypes", [...current, type]);
    }
  };

  const toggleEquipment = (item: string) => {
    const current = data.extraEquipment;
    if (current.includes(item)) {
      updateData("extraEquipment", current.filter(i => i !== item));
    } else {
      updateData("extraEquipment", [...current, item]);
    }
  };

  const handleNext = () => {
    if (step === 5) {
      if (!data.acceptPrice || !data.acceptGP || !data.acceptLiability) {
        alert("กรุณายอมรับเงื่อนไขการให้บริการทั้งหมดก่อนส่งใบสมัคร");
        return;
      }
      // Logic for final submission can be added here
    }
    setStep((s) => Math.min(s + 1, 6));
  };
  
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="mx-auto max-w-4xl rounded-[40px] bg-white shadow-2xl shadow-[#001A3D]/10 border border-slate-100 overflow-hidden font-noto-thai">
      
      {/* Header Section */}
      <div className="bg-[#001A3D] p-8 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none">
          <Truck className="h-96 w-96 text-white" />
        </div>
        
        <div className="relative z-10 text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
             <div className="h-1.5 w-1.5 rounded-full bg-[#0047AB] animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">Driver Network</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight">ใบสมัครพาร์ทเนอร์ <br className="hidden md:block" /> <span className="text-[#0047AB]">คราวน์ เซอร์วิส</span></h2>
          <p className="mt-4 text-base font-medium text-slate-400 max-w-md">มาร่วมเป็นเครือข่ายรถยกมืออาชีพ รับงานง่าย จ่ายเงินไว มีแอดมินดูแล 24 ชม.</p>
        </div>

        {/* Stepper */}
        {step <= 5 && (
          <div className="relative z-10">
            <div className="flex justify-between relative">
              <div className="absolute left-0 top-5 w-full h-0.5 bg-white/5 z-0"></div>
              {steps.map((s, i) => {
                const isActive = step === s.id;
                const isPassed = step > s.id;
                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      isActive ? "bg-[#0047AB] border-[#0047AB] text-white shadow-[0_0_20px_rgba(0,71,171,0.4)] scale-110" : 
                      isPassed ? "bg-emerald-500 border-emerald-500 text-white" : 
                      "bg-[#001430] border-white/10 text-white/30"
                    }`}>
                      {isPassed ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.1em] transition-colors duration-300 ${isActive ? "text-white" : "text-white/30"}`}>
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Form Content */}
      <div className="min-h-[500px] p-8 md:p-14 relative bg-slate-50/50">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto space-y-10">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0047AB]"><User className="h-4 w-4" /></div>
                 <h3 className="text-xl font-black text-[#001A3D]">ข้อมูลส่วนตัวและตัวตน</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ชื่อ-นามสกุล (ตรงตามบัตรประชาชน)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="ชื่อจริง" value={data.firstName} onChange={(e) => updateData("firstName", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                    <input type="text" placeholder="นามสกุล" value={data.lastName} onChange={(e) => updateData("lastName", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ชื่อเล่น / ชื่อเรียกในวงการ</label>
                  <input type="text" placeholder="เช่น ช่างแดง" value={data.nickname} onChange={(e) => updateData("nickname", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">เบอร์โทรศัพท์มือถือ (หลัก)</label>
                  <input type="tel" placeholder="08X-XXX-XXXX" value={data.phone} onChange={(e) => updateData("phone", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">เบอร์โทรศัพท์ (สำรอง)</label>
                  <input type="tel" placeholder="08X-XXX-XXXX" value={data.phoneSecondary} onChange={(e) => updateData("phoneSecondary", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">LINE ID (เพื่อส่งพิกัดงาน)</label>
                  <input type="text" placeholder="@line_id" value={data.lineId} onChange={(e) => updateData("lineId", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Vehicle Info */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto space-y-10">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0047AB]"><Truck className="h-4 w-4" /></div>
                 <h3 className="text-xl font-black text-[#001A3D]">ข้อมูลรถและอุปกรณ์</h3>
              </div>
              
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ประเภทรถที่มีให้บริการ (เลือกได้มากกว่า 1 ข้อ)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "รถสไลด์ (ถาดกองพื้น)", 
                    "รถสไลด์ (ถาดเอียง)", 
                    "รถยกช้อนล้อ", 
                    "รถลากจูง/เครน", 
                    "รถยกใหญ่ (6 ล้อ / 10 ล้อ)"
                  ].map((type) => (
                    <button 
                      key={type}
                      onClick={() => toggleVehicleType(type)}
                      className={`flex items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                        data.vehicleTypes.includes(type) ? "bg-[#0047AB] border-[#0047AB] text-white shadow-lg" : "bg-white border-slate-200 text-slate-600 hover:border-[#0047AB]/30"
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ยี่ห้อและรุ่นรถ</label>
                  <input type="text" placeholder="เช่น Isuzu NPR 150" value={data.vehicleModel} onChange={(e) => updateData("vehicleModel", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ทะเบียนรถและจังหวัด</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="1กข-1234" value={data.licensePlate} onChange={(e) => updateData("licensePlate", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                    <input type="text" placeholder="กรุงเทพฯ" value={data.plateProvince} onChange={(e) => updateData("plateProvince", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">อุปกรณ์เสริมที่มี</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "ตัวเสริมล้อ (Dolly)", id: "dolly" },
                    { label: "วินซ์ไฟฟ้า (Winch)", id: "winch" },
                    { label: "สายพ่วงแบต / เติมลม", id: "battery" }
                  ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => toggleEquipment(item.label)}
                      className={`px-6 py-3 rounded-full border text-xs font-black transition-all ${
                        data.extraEquipment.includes(item.label) ? "bg-[#001A3D] border-[#001A3D] text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Zone & Time */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto space-y-10">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0047AB]"><MapPin className="h-4 w-4" /></div>
                 <h3 className="text-xl font-black text-[#001A3D]">พื้นที่ให้บริการและเวลา</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">จังหวัดที่สแตนด์บายหลัก</label>
                  <input type="text" placeholder="ระบุจังหวัดที่จอดรถประจำ" value={data.baseProvince} onChange={(e) => updateData("baseProvince", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">อำเภอ/เขต ที่รับงานประจำ</label>
                  <input type="text" placeholder="เช่น ลาดพร้าว, ปากเกร็ด" value={data.baseDistrict} onChange={(e) => updateData("baseDistrict", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">พื้นที่ที่ยินดีไป (Scope)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["เฉพาะในจังหวัดและปริมณฑล", "วิ่งข้ามจังหวัด/ทั่วไทย"].map((scope) => (
                    <button key={scope} onClick={() => updateData("serviceScope", scope)} className={`flex items-center gap-3 p-5 rounded-2xl border transition-all ${data.serviceScope === scope ? "border-[#0047AB] bg-blue-50/50" : "bg-white border-slate-200 hover:border-slate-300"}`}>
                       <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${data.serviceScope === scope ? "border-[#0047AB] bg-[#0047AB]" : "border-slate-300"}`}>
                          {data.serviceScope === scope && <Check className="h-3 w-3 text-white" />}
                       </div>
                       <span className={`text-sm font-bold ${data.serviceScope === scope ? "text-[#001A3D]" : "text-slate-600"}`}>{scope}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ช่วงเวลาที่สะดวกรับงาน</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "สแตนด์บาย 24 ชม.", id: "24h" },
                    { label: "ช่วงกลางวัน (06:00-20:00)", id: "day" },
                    { label: "ช่วงกลางคืน (20:00-06:00)", id: "night" }
                  ].map((time) => (
                    <button key={time.id} onClick={() => updateData("availableTime", time.label)} className={`p-4 rounded-2xl border text-center transition-all ${data.availableTime === time.label ? "bg-[#001A3D] border-[#001A3D] text-white" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                       <div className="text-xs font-black leading-tight">{time.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Payment Info */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto space-y-10">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0047AB]"><CreditCard className="h-4 w-4" /></div>
                 <h3 className="text-xl font-black text-[#001A3D]">ข้อมูลการเงิน (Payment)</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ธนาคาร</label>
                  <select value={data.bank} onChange={(e) => updateData("bank", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all">
                    <option value="">เลือกธนาคาร</option>
                    <option value="กสิกรไทย">กสิกรไทย</option>
                    <option value="ไทยพาณิชย์">ไทยพาณิชย์</option>
                    <option value="กรุงเทพ">กรุงเทพ</option>
                    <option value="กรุงไทย">กรุงไทย</option>
                    <option value="กรุงศรี">กรุงศรี</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">เลขที่บัญชี</label>
                  <input type="text" placeholder="XXX-X-XXXXX-X" value={data.accountNo} onChange={(e) => updateData("accountNo", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">ชื่อบัญชี (ต้องตรงกับชื่อผู้สมัคร)</label>
                  <input type="text" placeholder="ชื่อ-นามสกุล ภาษาไทย" value={data.accountName} onChange={(e) => updateData("accountName", e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-[#0047AB] outline-none transition-all" />
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#0047AB]/5 border border-[#0047AB]/10 flex items-start gap-4">
                 <Info className="h-5 w-5 text-[#0047AB] mt-1 shrink-0" />
                 <p className="text-xs font-medium text-slate-600 leading-relaxed">
                   * พาร์ทเนอร์จะรับทราบราคาจริงที่จะต้องทำการเก็บเงินจากลูกค้าหลังจากได้รับงานแล้ว และจะเห็นเฉพาะผลตอบแทนสุทธิที่คุณจะได้รับในขั้นตอนเสนองานเบื้องต้น
                 </p>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Documents & Acceptance */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto space-y-12">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0047AB]"><FileText className="h-4 w-4" /></div>
                 <h3 className="text-xl font-black text-[#001A3D]">รายการเอกสารที่ต้องอัปโหลด</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "รูปถ่ายบัตรประชาชน", icon: IdCard },
                  { title: "รูปถ่ายใบอนุญาตขับขี่", icon: FileText },
                  { title: "รูปถ่ายหน้ารถ (เห็นทะเบียนชัดเจน)", icon: Camera },
                  { title: "รูปถ่ายด้านข้างรถ (เห็นภาพรวม)", icon: Truck },
                  { title: "รูปถ่ายหน้าสมุดบัญชี", icon: CreditCard },
                  { title: "กรมธรรม์ประกันสินค้า (ถ้ามี)", icon: ShieldAlert },
                ].map((doc, idx) => (
                  <div key={idx} className="group relative flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#0047AB] transition-all cursor-pointer">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
                      <doc.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-black text-[#001A3D] truncate">{doc.title}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-0.5">คลิกเพื่ออัปโหลด</div>
                    </div>
                    <UploadCloud className="h-4 w-4 text-slate-300 group-hover:text-[#0047AB]" />
                  </div>
                ))}
              </div>

              {/* Consent Section */}
              <div className="p-8 rounded-[32px] bg-[#001A3D] text-white space-y-6 shadow-2xl">
                 <h4 className="text-lg font-black tracking-tight">การยอมรับเงื่อนไข</h4>
                 <div className="space-y-4">
                   {[
                     { key: "acceptPrice", label: "ข้าพเจ้ายินยอมปฏิบัติตามมาตรฐานราคาของ คราวน์ เซอร์วิส" },
                     { key: "acceptGP", label: "ข้าพเจ้ายินยอมให้แพลตฟอร์มหักค่าธรรมเนียม (GP) ตามที่ตกลงกัน" },
                     { key: "acceptLiability", label: "ข้าพเจ้ายินยอมรับผิดชอบต่อความเสียหายที่เกิดจากการปฏิบัติงาน" },
                   ].map((item) => (
                     <label key={item.key} className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative flex h-6 w-6 shrink-0 items-center justify-center mt-0.5">
                           <input 
                             type="checkbox" 
                             checked={data[item.key as keyof PartnerData] as boolean}
                             onChange={(e) => updateData(item.key as keyof PartnerData, e.target.checked)}
                             className="peer h-6 w-6 appearance-none rounded-lg border-2 border-white/20 bg-transparent transition-all checked:bg-[#0047AB] checked:border-[#0047AB]" 
                           />
                           <Check className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                     </label>
                   ))}
                 </div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS STEP */}
          {step === 6 && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center max-w-lg mx-auto">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative h-32 w-32 rounded-full bg-emerald-50 border-4 border-white shadow-xl flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
              </div>
              <h2 className="text-4xl font-black text-[#001A3D] mb-4 tracking-tight">ส่งใบสมัครสำเร็จ!</h2>
              <p className="text-base font-medium text-slate-500 leading-relaxed mb-10">
                ทีมแอดมินได้รับข้อมูลของคุณแล้ว เราจะทำการตรวจสอบความถูกต้องของเอกสารและติดต่อกลับผ่าน LINE หรือเบอร์โทรศัพท์ของคุณภายใน 24 ชม.
              </p>
              <Link href="/" className="px-10 py-4 rounded-2xl bg-[#001A3D] text-white font-black shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all">
                 ตกลง กลับหน้าหลัก
              </Link>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation Footer */}
        {step <= 5 && (
          <div className="mt-14 pt-8 border-t border-slate-100 flex items-center justify-between max-w-2xl mx-auto">
            <button 
              onClick={handlePrev} 
              disabled={step === 1}
              className={`flex items-center gap-2 text-sm font-black px-6 py-4 rounded-2xl transition-all ${
                step === 1 ? "text-slate-200 cursor-not-allowed" : "text-slate-500 hover:bg-white hover:shadow-sm"
              }`}
            >
              <ChevronLeft className="h-4 w-4" /> ย้อนกลับ
            </button>
            <button 
              onClick={handleNext} 
              className="flex items-center gap-2 rounded-2xl bg-[#001A3D] px-10 py-4 text-sm font-black text-white shadow-2xl shadow-[#001A3D]/20 transition-all hover:bg-[#002a5d] active:scale-95"
            >
              {step === 5 ? "ส่งใบสมัครเข้าร่วมทีม" : "ถัดไป"} <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
