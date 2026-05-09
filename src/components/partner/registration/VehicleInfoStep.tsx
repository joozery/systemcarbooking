"use client";

import { motion } from "framer-motion";
import { Truck, Hash, Settings, Check } from "lucide-react";
import { FormInput } from "./FormInput";

interface VehicleInfoStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
  toggleVehicleType: (type: string) => void;
  toggleEquipment: (item: string) => void;
}

export function VehicleInfoStep({ 
  data, 
  updateData, 
  toggleVehicleType, 
  toggleEquipment 
}: VehicleInfoStepProps) {
  const vehicleOptions = [
    "รถสไลด์ (ถาดกองพื้น)", 
    "รถสไลด์ (ถาดเอียง)", 
    "รถยกช้อนล้อ", 
    "รถลากจูง/เครน", 
    "รถยกใหญ่ (6 ล้อ / 10 ล้อ)"
  ];

  const equipmentOptions = [
    { label: "ตัวเสริมล้อ (Dolly)", id: "dolly" },
    { label: "วินซ์ไฟฟ้า (Winch)", id: "winch" },
    { label: "สายพ่วงแบต / เติมลม", id: "battery" }
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
          <Truck className="h-5 w-5" />
         </div>
         <div>
            <h3 className="text-xl font-black text-[#001A3D] tracking-tight">ข้อมูลรถและอุปกรณ์</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Vehicle and Equipment Details</p>
         </div>
      </div>
      
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ประเภทรถที่มีให้บริการ (เลือกได้มากกว่า 1 ข้อ)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {vehicleOptions.map((type) => {
            const isSelected = data.vehicleTypes.includes(type);
            return (
              <button 
                key={type}
                type="button"
                onClick={() => toggleVehicleType(type)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                  isSelected 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 scale-[1.02]" 
                    : "bg-white border-slate-100 text-slate-600 hover:border-blue-500/30 hover:bg-slate-50"
                }`}
              >
                <div className={`h-4 w-4 rounded flex items-center justify-center shrink-0 ${isSelected ? "bg-white text-blue-600" : "bg-slate-100"}`}>
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                <span className="text-[11px] font-bold leading-tight">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          label="ยี่ห้อและรุ่นรถ"
          placeholder="เช่น Isuzu NPR 150"
          value={data.vehicleModel}
          onChange={(val) => updateData("vehicleModel", val)}
          icon={Settings}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormInput 
            label="ทะเบียนรถ"
            placeholder="1กข-1234"
            value={data.licensePlate}
            onChange={(val) => updateData("licensePlate", val)}
            icon={Hash}
          />
          <FormInput 
            label="จังหวัด"
            placeholder="กรุงเทพฯ"
            value={data.plateProvince}
            onChange={(val) => updateData("plateProvince", val)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">อุปกรณ์เสริมที่มี</label>
        <div className="flex flex-wrap gap-2">
          {equipmentOptions.map((item) => {
            const isSelected = data.extraEquipment.includes(item.label);
            return (
              <button 
                key={item.id}
                type="button"
                onClick={() => toggleEquipment(item.label)}
                className={`px-5 py-2.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${
                  isSelected 
                    ? "bg-[#001A3D] border-[#001A3D] text-white shadow-md shadow-[#001A3D]/20" 
                    : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
