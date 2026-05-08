"use client";

import { motion } from "framer-motion";
import { 
  History, Search, Filter, Trash2, Download,
  User, Shield, CreditCard, Settings, Car,
  ExternalLink, Info, AlertTriangle, AlertCircle,
  Smartphone, Monitor, Globe
} from "lucide-react";
import { useState } from "react";

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const logs = [
    { 
      id: "LOG-5021", 
      admin: "Admin Opor", 
      action: "UPDATE_PRICE", 
      description: "แก้ไขราคาเริ่มต้นบริการรถสไลด์ จาก ฿1,200 เป็น ฿1,500", 
      category: "Settings",
      time: "10 นาทีที่แล้ว", 
      status: "warning",
      device: "MacBook Pro • Chrome",
      ip: "182.52.xx.xxx"
    },
    { 
      id: "LOG-5020", 
      admin: "วิลาศิณี ใจดี", 
      action: "APPROVE_PAYOUT", 
      description: "อนุมัติการเบิกเงินให้ บจก. รถยกสายไหม ยอด ฿12,400", 
      category: "Finance",
      time: "45 นาทีที่แล้ว", 
      status: "info",
      device: "Windows 11 • Edge",
      ip: "1.10.xx.xxx"
    },
    { 
      id: "LOG-5019", 
      admin: "เกรียงไกร สายลุย", 
      action: "ASSIGN_JOB", 
      description: "มอบหมายงาน CW-1042 ให้กับคนขับ คุณสมพร", 
      category: "Jobs",
      time: "1 ชม. ที่แล้ว", 
      status: "info",
      device: "iPhone 15 • Safari",
      ip: "171.96.xx.xxx"
    },
    { 
      id: "LOG-5018", 
      admin: "Admin Opor", 
      action: "LOGIN", 
      description: "เข้าสู่ระบบสำเร็จ", 
      category: "Auth",
      time: "2 ชม. ที่แล้ว", 
      status: "info",
      device: "MacBook Pro • Chrome",
      ip: "182.52.xx.xxx"
    },
    { 
      id: "LOG-5017", 
      admin: "สมโภชน์ ยอดขวัญ", 
      action: "DELETE_JOB", 
      description: "ลบรายการจองที่ยกเลิก CW-1035 ออกจากระบบ", 
      category: "Jobs",
      time: "เมื่อวานนี้, 21:30", 
      status: "danger",
      device: "Windows 10 • Chrome",
      ip: "124.122.xx.xxx"
    },
  ];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Settings': return <Settings className="h-4 w-4" />;
      case 'Finance': return <CreditCard className="h-4 w-4" />;
      case 'Jobs': return <Car className="h-4 w-4" />;
      case 'Auth': return <Shield className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'danger': return 'bg-red-50 text-red-600 border-red-100';
      case 'info': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#001A3D] tracking-tight flex items-center gap-3">
            <History className="h-8 w-8 text-[#0047AB]" />
            บันทึกกิจกรรมแอดมิน
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">ตรวจสอบความเคลื่อนไหวและการเปลี่ยนแปลงทั้งหมดภายในระบบ</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download className="h-4 w-4" />
            ดาวน์โหลด Log
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-100 transition-all">
            <Trash2 className="h-4 w-4" />
            ล้างบันทึกเก่า
          </button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="ค้นหาตามชื่อแอดมิน, รายละเอียดกิจกรรม หรือไอดี..."
            className="w-full rounded-xl bg-slate-50 py-3 pl-12 pr-4 text-xs font-bold outline-none border border-slate-100 focus:border-blue-400 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="h-4 w-4" />
            ทุกหมวดหมู่
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
             ช่วงเวลา
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-8 py-5">เวลา / รหัสบันทึก</th>
                <th className="px-8 py-5">ผู้ดำเนินการ</th>
                <th className="px-8 py-5">กิจกรรม</th>
                <th className="px-8 py-5">รายละเอียด</th>
                <th className="px-8 py-5">อุปกรณ์ / IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log, i) => (
                <motion.tr 
                  key={log.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-[#001A3D]">{log.time}</span>
                      <span className="text-[10px] font-bold text-slate-400">{log.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold text-[#001A3D] whitespace-nowrap">{log.admin}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider ${getStatusStyle(log.status)}`}>
                      {getCategoryIcon(log.category)}
                      {log.action}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-medium text-slate-600 max-w-xs leading-relaxed">
                      {log.description}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        {log.device.includes('Mac') || log.device.includes('Win') ? <Monitor className="h-3 w-3" /> : <Smartphone className="h-3 w-3" />}
                        {log.device}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                        <Globe className="h-3 w-3" />
                        {log.ip}
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
          <button className="text-xs font-black text-[#0047AB] hover:underline flex items-center gap-2">
            โหลดข้อมูลเพิ่มเติม
            <ExternalLink className="h-3 w-3" />
          </button>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Crown Wealth Security System v1.0</span>
        </div>
      </div>

    </div>
  );
}
