"use client";

import { motion } from "framer-motion";
import { Check, LucideIcon, Truck } from "lucide-react";

interface Step {
  id: number;
  name: string;
  icon: LucideIcon;
}

interface StepHeaderProps {
  steps: Step[];
  currentStep: number;
}

export function StepHeader({ steps, currentStep }: StepHeaderProps) {
  return (
    <div className="bg-[#001A3D] p-8 md:p-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none">
        <Truck className="h-96 w-96 text-white" />
      </div>
      
      <div className="relative z-10 text-center md:text-left mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
        >
           <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-300">Partner Registration Portal</span>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
          ร่วมเป็นพาร์ทเนอร์ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">คราวน์ เซอร์วิส</span>
        </h2>
      </div>

      {/* Modern Stepper */}
      <div className="relative z-10 mt-8">
        <div className="flex justify-between relative max-w-2xl mx-auto md:mx-0">
          <div className="absolute left-0 top-5 w-full h-[1px] bg-white/10 z-0"></div>
          {steps.map((s) => {
            const isActive = currentStep === s.id;
            const isPassed = currentStep > s.id;
            
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                <motion.div 
                  initial={false}
                  animate={{
                    backgroundColor: isActive ? "#2563eb" : isPassed ? "#10b981" : "#0f172a",
                    borderColor: isActive ? "#3b82f6" : isPassed ? "#10b981" : "rgba(255,255,255,0.1)",
                    scale: isActive ? 1.1 : 1
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 shadow-xl`}
                >
                  {isPassed ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <s.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                  )}
                </motion.div>
                <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-white" : "text-slate-500"}`}>
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
