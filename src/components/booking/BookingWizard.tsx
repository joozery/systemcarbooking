"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Steps
import ServiceTypeStep from "./steps/ServiceTypeStep";
import ReasonStep from "./steps/ReasonStep";
import VehicleStatusStep from "./steps/VehicleStatusStep";
import LocationStep from "./steps/LocationStep";
import NotesStep from "./steps/NotesStep";
import ContactInfoStep from "./steps/ContactInfoStep";
import SummaryStep from "./steps/SummaryStep";

export type BookingData = {
  serviceType: string;
  reason: string;
  engineStatus: string;
  movementStatus: string;
  origin: string;
  destination: string;
  notes: string;
  customerName: string;
  customerPhone: string;
  customerLineId: string;
};

export function BookingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<BookingData>({
    serviceType: "",
    reason: "",
    engineStatus: "",
    movementStatus: "",
    origin: "",
    destination: "",
    notes: "",
    customerName: "",
    customerPhone: "",
    customerLineId: "",
  });

  const updateData = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 9));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        router.push(`/booking/track?id=${result.id}`);
      } else {
        alert("เกิดข้อผิดพลาด: " + result.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-2xl shadow-[#001A3D]/10 border border-slate-100">
      
      {/* Progress Bar */}
      <div className="mb-12 flex items-center gap-1 sm:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
          <div key={s} className={`flex items-center ${s < 9 ? "flex-1" : ""}`}>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-500 ${
              step >= s ? "bg-[#0047AB] text-white shadow-lg shadow-blue-200 scale-110" : "bg-slate-100 text-slate-400"
            }`}>
              {s}
            </div>
            {s < 9 && (
              <div className={`h-1 w-full mx-1 rounded-full transition-all duration-700 ${
                step > s ? "bg-[#0047AB]" : "bg-slate-100"
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[350px]">
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <ServiceTypeStep 
              selectedType={data.serviceType} 
              onSelect={(type) => { updateData("serviceType", type); handleNext(); }} 
            />
          )}

          {step === 2 && (
            <ReasonStep 
              selectedReason={data.reason} 
              onSelect={(reason) => { updateData("reason", reason); handleNext(); }} 
            />
          )}

          {step === 3 && (
            <VehicleStatusStep 
              type="engine" 
              value={data.engineStatus} 
              onSelect={(val) => { updateData("engineStatus", val); handleNext(); }} 
            />
          )}

          {step === 4 && (
            <VehicleStatusStep 
              type="movement" 
              value={data.movementStatus} 
              onSelect={(val) => { updateData("movementStatus", val); handleNext(); }} 
            />
          )}

          {step === 5 && (
            <LocationStep 
              type="origin" 
              value={data.origin} 
              onChange={(val) => updateData("origin", val)} 
              onNext={handleNext} 
            />
          )}

          {step === 6 && (
            <LocationStep 
              type="destination" 
              value={data.destination} 
              onChange={(val) => updateData("destination", val)} 
              onNext={handleNext} 
            />
          )}

          {step === 7 && (
            <NotesStep 
              value={data.notes} 
              onChange={(val) => updateData("notes", val)} 
              onNext={handleNext} 
            />
          )}

          {step === 8 && (
            <ContactInfoStep 
              name={data.customerName}
              phone={data.customerPhone}
              lineId={data.customerLineId}
              onChange={updateData}
              onNext={handleNext}
            />
          )}

          {step === 9 && (
            <SummaryStep 
              data={data} 
              isSubmitting={isSubmitting} 
              onSubmit={handleSubmit} 
            />
          )}

        </AnimatePresence>
      </div>

      {step > 1 && step < 9 && (
        <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
          <button onClick={handlePrev} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#001A3D]">
            <ChevronLeft className="h-4 w-4" /> ย้อนกลับ
          </button>
        </div>
      )}
    </div>
  );
}
