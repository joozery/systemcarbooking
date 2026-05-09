"use client";

import { LucideIcon } from "lucide-react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  required?: boolean;
}

export function FormInput({ 
  label, 
  placeholder, 
  type = "text", 
  value, 
  onChange, 
  icon: Icon,
  required = false 
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input 
          type={type} 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-12 rounded-xl border border-slate-100 bg-white ${Icon ? "pl-11" : "px-5"} pr-4 text-sm font-bold text-[#001A3D] outline-none transition-all focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 placeholder:text-slate-300 shadow-sm group-hover:border-slate-200 group-focus-within:shadow-md`}
        />
      </div>
    </div>
  );
}
