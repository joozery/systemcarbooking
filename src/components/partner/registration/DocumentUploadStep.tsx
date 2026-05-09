"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FileText, UploadCloud, Camera, IdCard, 
  Truck, CreditCard, ShieldAlert, Check, 
  ShieldCheck, Loader2, X
} from "lucide-react";

interface DocumentUploadStepProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function DocumentUploadStep({ data, updateData }: DocumentUploadStepProps) {
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeDocKey, setActiveDocKey] = useState<string | null>(null);

  const documents = [
    { key: "idCardUrl", title: "รูปถ่ายบัตรประชาชน", icon: IdCard, desc: "เห็นเลขบัตรและชื่อชัดเจน" },
    { key: "driverLicenseUrl", title: "ใบอนุญาตขับขี่", icon: FileText, desc: "ชนิดที่ 2 ขึ้นไป" },
    { key: "carFrontUrl", title: "รูปถ่ายหน้ารถ", icon: Camera, desc: "เห็นป้ายทะเบียนชัดเจน" },
    { key: "carSideUrl", title: "รูปถ่ายด้านข้างรถ", icon: Truck, desc: "เห็นภาพรวมตัวรถและอุปกรณ์" },
    { key: "bankBookUrl", title: "หน้าสมุดบัญชี", icon: CreditCard, desc: "สำหรับโอนเงินค่าจ้าง" },
    { key: "insuranceUrl", title: "กรมธรรม์สินค้า", icon: ShieldAlert, desc: "ถ้ามี (เพื่อความมั่นใจลูกค้า)" },
  ];

  const consents = [
    { key: "acceptPrice", label: "ยินยอมปฏิบัติตามมาตรฐานราคาของ คราวน์ เซอร์วิส" },
    { key: "acceptGP", label: "ยินยอมให้หักค่าธรรมเนียมแพลตฟอร์ม (GP) ตามตกลง" },
    { key: "acceptLiability", label: "ยินยอมรับผิดชอบต่อความเสียหายที่เกิดจากการปฏิบัติงาน" },
  ];

  const handleFileClick = (key: string) => {
    setActiveDocKey(key);
    if (fileInputRef.current) fileInputRef.current.value = "";
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const currentKey = activeDocKey; // Store key locally to avoid race conditions
    
    if (!file || !currentKey) return;

    setUploading(currentKey);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "partners/documents");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        // Direct update to ensure we don't lose other documents' state
        const updatedDocs = {
          ...data.documents,
          [currentKey]: result.data.url
        };
        updateData("documents", updatedDocs);
      } else {
        alert("อัปโหลดไม่สำเร็จ: " + result.message);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setUploading(null);
      setActiveDocKey(null); // Clear for next upload
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    }
  };

  const removeFile = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateData("documents", {
      ...data.documents,
      [key]: ""
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }} 
      className="max-w-2xl mx-auto space-y-12"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*,.pdf"
        onChange={handleFileChange}
      />

      <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
         <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
          <UploadCloud className="h-5 w-5" />
         </div>
         <div>
            <h3 className="text-xl font-black text-[#001A3D] tracking-tight">รายการเอกสารที่ต้องอัปโหลด</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Documentation and Verification</p>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.map((doc) => {
          const isUploaded = !!data.documents[doc.key];
          const isUploading = uploading === doc.key;

          return (
            <button 
              key={doc.key} 
              type="button"
              onClick={() => !isUploading && handleFileClick(doc.key)}
              className={`group relative flex items-center gap-4 p-5 rounded-xl bg-white border transition-all text-left ${
                isUploaded 
                  ? "border-green-500 shadow-lg shadow-green-500/5 bg-green-50/10" 
                  : "border-slate-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5"
              }`}
            >
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center transition-all shadow-inner ${
                isUploaded ? "bg-green-600 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
              }`}>
                {isUploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <doc.icon className="h-6 w-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[11px] font-black uppercase tracking-wide truncate ${isUploaded ? "text-green-700" : "text-[#001A3D]"}`}>
                  {doc.title}
                </div>
                <div className="text-[9px] font-bold text-slate-400 mt-0.5 truncate">
                  {isUploaded ? "อัปโหลดเรียบร้อยแล้ว" : doc.desc}
                </div>
              </div>
              
              {isUploaded ? (
                <div 
                  onClick={(e) => removeFile(doc.key, e)}
                  className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                >
                   <X className="h-4 w-4" />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-blue-200 group-hover:text-blue-500">
                   <UploadCloud className="h-4 w-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Consent Section */}
      <div className="p-8 rounded-2xl bg-[#001A3D] text-white space-y-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
            <ShieldCheck className="h-48 w-48 text-white" />
         </div>
         
         <div className="relative z-10 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
               <ShieldAlert className="h-4 w-4 text-blue-400" />
            </div>
            <h4 className="text-lg font-black tracking-tight uppercase">การยอมรับเงื่อนไขและข้อตกลง</h4>
         </div>

         <div className="relative z-10 space-y-4">
           {consents.map((item) => (
             <label key={item.key} className="flex items-start gap-4 cursor-pointer group bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center mt-0.5">
                   <input 
                     type="checkbox" 
                     checked={data[item.key as keyof any] as boolean}
                     onChange={(e) => updateData(item.key, e.target.checked)}
                     className="peer h-6 w-6 appearance-none rounded-lg border-2 border-white/20 bg-transparent transition-all checked:bg-blue-600 checked:border-blue-600" 
                   />
                   <Check className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
             </label>
           ))}
         </div>
      </div>
    </motion.div>
  );
}
