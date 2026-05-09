"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Truck, MapPin, CreditCard, 
  FileText, ChevronRight, ChevronLeft 
} from "lucide-react";

// Sub-components
import { StepHeader } from "./registration/StepHeader";
import { PersonalInfoStep } from "./registration/PersonalInfoStep";
import { VehicleInfoStep } from "./registration/VehicleInfoStep";
import { ZoneTimeStep } from "./registration/ZoneTimeStep";
import { PaymentInfoStep } from "./registration/PaymentInfoStep";
import { DocumentUploadStep } from "./registration/DocumentUploadStep";
import { SuccessStep } from "./registration/SuccessStep";

const steps = [
  { id: 1, name: "ข้อมูลส่วนตัว", icon: User },
  { id: 2, name: "ข้อมูลรถ", icon: Truck },
  { id: 3, name: "พื้นที่/เวลา", icon: MapPin },
  { id: 4, name: "การเงิน", icon: CreditCard },
  { id: 5, name: "เอกสาร", icon: FileText },
];

export function PartnerWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    firstName: "", lastName: "", nickname: "",
    username: "", password: "",
    phone: "", phoneSecondary: "", lineId: "",
    vehicleTypes: [] as string[], vehicleModel: "",
    licensePlate: "", plateProvince: "",
    extraEquipment: [] as string[],
    baseProvince: "", baseDistrict: "",
    serviceScope: "เฉพาะในจังหวัดและปริมณฑล",
    availableTime: "สแตนด์บาย 24 ชม.",
    bank: "", accountNo: "", accountName: "",
    acceptPrice: false, acceptGP: false, acceptLiability: false,
    documents: {
      idCardUrl: "",
      driverLicenseUrl: "",
      carFrontUrl: "",
      carSideUrl: "",
      bankBookUrl: "",
      insuranceUrl: "",
    }
  });

  const updateData = (key: string, value: any) => setData((prev) => ({ ...prev, [key]: value }));
  
  const toggleVehicleType = (type: string) => {
    setData(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(type) 
        ? prev.vehicleTypes.filter(t => t !== type)
        : [...prev.vehicleTypes, type]
    }));
  };

  const toggleEquipment = (item: string) => {
    setData(prev => ({
      ...prev,
      extraEquipment: prev.extraEquipment.includes(item)
        ? prev.extraEquipment.filter(i => i !== item)
        : [...prev.extraEquipment, item]
    }));
  };

  const handleSubmit = async () => {
    if (!data.acceptPrice || !data.acceptGP || !data.acceptLiability) {
      alert("กรุณายอมรับเงื่อนไขการให้บริการทั้งหมดก่อนส่งใบสมัคร");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partners/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        setStep(6);
      } else {
        alert(result.message || "เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleNext = () => {
    if (step === 5) {
      handleSubmit();
      return;
    }
    setStep((s) => Math.min(s + 1, 6));
  };
  
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden">
      
      <StepHeader steps={steps} currentStep={step} />

      <div className="min-h-[500px] p-8 md:p-14 relative bg-slate-50/30">
        <AnimatePresence mode="wait">
          {step === 1 && <PersonalInfoStep key="step1" data={data} updateData={updateData} />}
          {step === 2 && (
            <VehicleInfoStep 
              key="step2" 
              data={data} 
              updateData={updateData} 
              toggleVehicleType={toggleVehicleType}
              toggleEquipment={toggleEquipment}
            />
          )}
          {step === 3 && <ZoneTimeStep key="step3" data={data} updateData={updateData} />}
          {step === 4 && <PaymentInfoStep key="step4" data={data} updateData={updateData} />}
          {step === 5 && <DocumentUploadStep key="step5" data={data} updateData={updateData} />}
          {step === 6 && <SuccessStep key="success" />}
        </AnimatePresence>

        {/* Navigation Footer */}
        {step <= 5 && (
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between max-w-2xl mx-auto">
            <button 
              onClick={handlePrev} 
              disabled={step === 1}
              className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-4 rounded-2xl transition-all ${
                step === 1 ? "text-slate-200 cursor-not-allowed" : "text-slate-400 hover:text-[#001A3D] hover:bg-white hover:shadow-sm"
              }`}
            >
              <ChevronLeft className="h-4 w-4" /> ย้อนกลับ
            </button>
            <button 
              onClick={handleNext} 
              className="flex items-center gap-3 rounded-xl bg-[#001A3D] px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-900/20 transition-all hover:bg-blue-600 hover:shadow-blue-600/30 active:scale-95"
            >
              {step === 5 ? "ส่งใบสมัครเข้าร่วมทีม" : "ดำเนินการต่อ"} 
              <ChevronRight className="h-4 w-4 opacity-50" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
