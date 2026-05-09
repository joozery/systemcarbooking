"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  History, Search, Filter, 
  User, Activity, Shield, 
  Clock, ArrowRight, Server,
  AlertCircle, CheckCircle2, Info
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`);
      const data = await response.json();
      if (data.success) {
        setLogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionIcon = (action: string) => {
    if (action.includes('LOGIN')) return <Shield className="h-3.5 w-3.5 text-blue-500" />;
    if (action.includes('APPROVE')) return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
    if (action.includes('DELETE')) return <AlertCircle className="h-3.5 w-3.5 text-rose-500" />;
    return <Activity className="h-3.5 w-3.5 text-slate-400" />;
  };

  return (
    <div className="space-y-6 pb-10 max-w-[1600px] mx-auto">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Server className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Audit Logs</span>
          </div>
          <h1 className="text-2xl font-black text-[#001A3D] tracking-tight">
            ประวัติกิจกรรมระบบ
          </h1>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/20">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="ค้นหาตามการกระทำ, ชื่อผู้ใช้..."
              className="h-9 w-full rounded-lg bg-white border border-slate-200 pl-10 pr-4 text-[11px] font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-10 w-10 border-3 border-slate-100 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">กำลังดึงประวัติกิจกรรม...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <History className="h-10 w-10 text-slate-200 mb-3" />
                <h3 className="text-sm font-black text-slate-400 tracking-tight">ไม่พบประวัติการใช้งาน</h3>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-50 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <th className="pl-6 pr-4 py-4">เวลา (Time)</th>
                    <th className="px-4 py-4">ผู้กระทำ (User)</th>
                    <th className="px-4 py-4">กิจกรรม (Action)</th>
                    <th className="px-4 py-4">เป้าหมาย (Target)</th>
                    <th className="px-4 py-4">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50/50">
                  {logs.filter(log => 
                    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    log.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    log.target?.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((log, idx) => (
                    <tr key={log._id} className="group hover:bg-slate-50/50 transition-all duration-200">
                      <td className="pl-6 pr-4 py-4">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-[#001A3D]">
                            {new Date(log.createdAt).toLocaleDateString('th-TH')}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">
                            {new Date(log.createdAt).toLocaleTimeString('th-TH')}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                            <User className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex flex-col leading-tight">
                            <span className="text-[11px] font-bold text-[#001A3D]">{log.user?.name || 'Unknown'}</span>
                            <span className="text-[9px] font-black uppercase text-blue-500 tracking-widest">{log.userModel}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{log.action}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[11px] font-bold text-slate-500">{log.target || '-'}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-mono font-bold text-slate-300">{log.ipAddress || '0.0.0.0'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 tracking-tight">
            แสดงข้อมูลประวัติกิจกรรมล่าสุด 100 รายการ
          </span>
        </div>
      </div>

    </div>
  );
}
