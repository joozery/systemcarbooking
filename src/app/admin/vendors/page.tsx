"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ShieldCheck, UserX, UserCheck, MoreVertical, Truck, CheckCircle2, XCircle, Loader2, Phone, MapPin, CreditCard, FileText, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "@/components/admin/ConfirmModal";

interface Partner {
  _id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  username: string;
  password?: string;
  vehicleModel: string;
  licensePlate: string;
  plateProvince: string;
  baseProvince: string;
  baseDistrict: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  documents: {
    idCardUrl?: string;
    driverLicenseUrl?: string;
    carFrontUrl?: string;
    carSideUrl?: string;
    bankBookUrl?: string;
    insuranceUrl?: string;
  };
  bank: string;
  accountNo: string;
  accountName: string;
}

export default function AdminVendorsPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Confirmation Modal State
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "warning" | "danger" | "success";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "warning",
    onConfirm: () => {},
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partners`);
      const result = await res.json();
      if (result.success) {
        setPartners(result.data);
        if (result.data.length > 0 && !selectedPartner) {
          setSelectedPartner(result.data[0]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch partners:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    setConfirmConfig({
      isOpen: true,
      title: status === 'approved' ? "อนุมัติพาร์ทเนอร์" : "ปฏิเสธพาร์ทเนอร์",
      message: `คุณต้องการ${status === 'approved' ? 'อนุมัติ' : 'ปฏิเสธ'}พาร์ทเนอร์รายนี้ใช่หรือไม่?`,
      type: status === 'approved' ? "warning" : "danger",
      onConfirm: async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partners/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
          });
          const result = await res.json();
          if (result.success) {
            fetchPartners();
            if (selectedPartner?._id === id) {
              setSelectedPartner({ ...selectedPartner, status });
            }
            setConfirmConfig({
              isOpen: true,
              title: "ดำเนินการสำเร็จ",
              message: result.message,
              type: "success",
              onConfirm: () => {
                setConfirmConfig(prev => ({ ...prev, isOpen: false }));
              }
            });
          }
        } catch (err) {
          console.error("Failed to update status:", err);
          setConfirmConfig({
            isOpen: true,
            title: "เกิดข้อผิดพลาด",
            message: "ไม่สามารถอัปเดตสถานะได้ในขณะนี้",
            type: "danger",
            onConfirm: () => {
                setConfirmConfig(prev => ({ ...prev, isOpen: false }));
            }
          });
        }
      }
    });
  };

  const filteredPartners = partners.filter(p => p.status === activeTab);

  return (
    <div className="space-y-6 flex flex-col h-full relative">
      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001A3D]/90 backdrop-blur-sm p-4 md:p-20"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 font-bold hover:text-blue-400 transition-colors"
              >
                <X className="h-6 w-6" /> ปิดหน้าต่าง
              </button>
              <img 
                src={previewImage} 
                alt="Preview" 
                className="rounded-2xl shadow-2xl border-4 border-white/10 max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#001A3D]">จัดการพาร์ทเนอร์ (Vendors)</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">ตรวจสอบเอกสารและอนุมัติคนขับเข้าสู่ระบบ</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        {[
          { id: "pending", label: "รอตรวจสอบ", count: partners.filter(p => p.status === "pending").length },
          { id: "approved", label: "อนุมัติแล้ว", count: partners.filter(p => p.status === "approved").length },
          { id: "rejected", label: "ปฏิเสธ", count: partners.filter(p => p.status === "rejected").length }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === tab.id ? "border-[#0047AB] text-[#0047AB]" : "border-transparent text-slate-500"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 flex-1 min-h-0">
        {/* List Side */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {loading ? (
               <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-600" /></div>
            ) : filteredPartners.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
                <UserX className="h-8 w-8 opacity-20" />
                <p className="text-xs font-bold">ไม่มีรายการในหมวดนี้</p>
              </div>
            ) : (
              filteredPartners.map((partner) => (
                <button 
                  key={partner._id} 
                  onClick={() => setSelectedPartner(partner)}
                  className={`w-full text-left transition-all rounded-xl border p-4 group ${
                    selectedPartner?._id === partner._id 
                      ? "border-[#0047AB] bg-white shadow-md ring-1 ring-blue-500/10" 
                      : "border-transparent bg-white hover:border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[#001A3D] text-sm group-hover:text-blue-600 transition-colors">
                      {partner.firstName} {partner.lastName} ({partner.nickname})
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {new Date(partner.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Phone className="h-3 w-3" /> {partner.phone}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detail Side */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col h-[calc(100vh-280px)] overflow-hidden">
          {selectedPartner ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
                    {selectedPartner.firstName[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#001A3D]">{selectedPartner.firstName} {selectedPartner.lastName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        selectedPartner.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        selectedPartner.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedPartner.status === 'pending' ? 'รอตรวจสอบ' : 
                         selectedPartner.status === 'approved' ? 'อนุมัติแล้ว' : 'ปฏิเสธ'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        ID: {selectedPartner._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedPartner.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleUpdateStatus(selectedPartner._id, 'rejected')}
                        className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 transition-all border border-red-100"
                      >
                        <XCircle className="h-4 w-4" /> ปฏิเสธ
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(selectedPartner._id, 'approved')}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                      >
                        <ShieldCheck className="h-4 w-4" /> อนุมัติพาร์ทเนอร์
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
                        <Phone className="h-3 w-3" /> ข้อมูลติดต่อ
                      </h4>
                      <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500 font-bold">ชื่อผู้ใช้งาน (Username)</span>
                            <span className="text-sm text-blue-600 font-black tracking-tight">{selectedPartner.username}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500 font-bold">เบอร์โทรศัพท์</span>
                            <span className="text-sm text-[#001A3D] font-black">{selectedPartner.phone}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500 font-bold">พื้นที่ให้บริการ</span>
                            <span className="text-sm text-[#001A3D] font-black">{selectedPartner.baseDistrict}, {selectedPartner.baseProvince}</span>
                         </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
                        <Truck className="h-3 w-3" /> ข้อมูลยานพาหนะ
                      </h4>
                      <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500 font-bold">รุ่นรถ</span>
                            <span className="text-sm text-[#001A3D] font-black">{selectedPartner.vehicleModel}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500 font-bold">ทะเบียน</span>
                            <span className="text-sm text-[#001A3D] font-black">{selectedPartner.licensePlate} {selectedPartner.plateProvince}</span>
                         </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
                        <CreditCard className="h-3 w-3" /> ข้อมูลการชำระเงิน
                      </h4>
                      <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500 font-bold">ธนาคาร</span>
                            <span className="text-sm text-[#001A3D] font-black">{selectedPartner.bank}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500 font-bold">เลขบัญชี</span>
                            <span className="text-sm text-[#001A3D] font-black font-mono">{selectedPartner.accountNo}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-xs text-slate-500 font-bold">ชื่อบัญชี</span>
                            <span className="text-sm text-[#001A3D] font-black">{selectedPartner.accountName}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
                      <FileText className="h-3 w-3" /> เอกสารแนบ (คลิกเพื่อขยาย)
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedPartner.documents).map(([key, url]) => (
                        <div 
                          key={key} 
                          onClick={() => url && setPreviewImage(url as string)}
                          className={`group relative aspect-video rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-zoom-in ${!url && 'cursor-default opacity-50'}`}
                        >
                          {url ? (
                            <>
                              <img src={url as string} alt={key} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                              <div className="absolute inset-0 bg-[#0047AB]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 className="text-white h-8 w-8 drop-shadow-lg" />
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                               <FileText className="h-6 w-6 mb-1 opacity-20" />
                               <span className="text-[8px] font-black uppercase tracking-widest opacity-50">ไม่มีข้อมูล</span>
                            </div>
                          )}
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur shadow-sm text-[8px] font-black uppercase tracking-widest text-[#001A3D]">
                            {key.replace('Url', '').replace('car', 'Vehicle ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-slate-300 space-y-4">
               <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center">
                  <Truck className="h-10 w-10 opacity-10" />
               </div>
               <p className="text-sm font-bold">กรุณาเลือกพาร์ทเนอร์เพื่อดูรายละเอียด</p>
            </div>
          )}
        </div>
      </div>
      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type={confirmConfig.type}
      />
    </div>
  );
}
