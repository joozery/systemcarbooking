"use client";

import { motion } from "framer-motion";
import { 
  DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, 
  Wallet, Download, Filter, Search, MoreHorizontal,
  CheckCircle2, Clock, AlertCircle, FileText
} from "lucide-react";
import { useState } from "react";

export default function FinancePage() {
  const [filterStatus, setFilterStatus] = useState("all");

  const stats = [
    { name: "รายได้รวมทั้งหมด", value: "฿428,500", change: "+12.5%", trending: "up", icon: DollarSign, color: "bg-blue-500" },
    { name: "ยอดที่ต้องจ่ายพาร์ทเนอร์", value: "฿184,200", change: "+5.2%", trending: "up", icon: Wallet, color: "bg-amber-500" },
    { name: "กำไรสุทธิ (Net)", value: "฿244,300", change: "+18.3%", trending: "up", icon: TrendingUp, color: "bg-emerald-500" },
  ];

  const transactions = [
    { id: "TX-9042", customer: "สมหมาย รักเรียน", job: "CW-1042", amount: "฿2,100", status: "completed", date: "วันนี้, 14:20" },
    { id: "TX-9041", customer: "วิภาวดี มีสุข", job: "CW-1041", amount: "฿1,800", status: "completed", date: "วันนี้, 12:45" },
    { id: "TX-9040", customer: "กิตติศักดิ์ จริงใจ", job: "CW-1040", amount: "฿3,500", status: "pending", date: "วันนี้, 11:10" },
    { id: "TX-9039", customer: "ประธาน สายเปย์", job: "CW-1039", amount: "฿1,500", status: "completed", date: "เมื่อวาน, 18:30" },
    { id: "TX-9038", customer: "อาทิตย์ สดใส", job: "CW-1038", amount: "฿4,200", status: "failed", date: "เมื่อวาน, 16:15" },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#001A3D] tracking-tight">การเงินและธุรกรรม</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">ตรวจสอบรายได้ และจัดการการโอนเงินคืนให้พาร์ทเนอร์</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-[#0047AB] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-[#003580] transition-all">
            <Filter className="h-4 w-4" />
            ตัวกรองขั้นสูง
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white shadow-lg shadow-current/20`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black ${
                stat.trending === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
              }`}>
                {stat.trending === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.name}</div>
            <div className="mt-2 text-3xl font-black text-[#001A3D]">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Transactions Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-black text-[#001A3D]">ธุรกรรมล่าสุด</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหา..."
                  className="rounded-lg bg-slate-50 py-2 pl-10 pr-4 text-xs font-bold outline-none border border-slate-100 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <th className="px-8 py-4">ธุรกรรม</th>
                    <th className="px-8 py-4">ลูกค้า / เลขที่งาน</th>
                    <th className="px-8 py-4">จำนวนเงิน</th>
                    <th className="px-8 py-4">สถานะ</th>
                    <th className="px-8 py-4 text-right">ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-[#001A3D]">{tx.id}</span>
                          <span className="text-[10px] font-medium text-slate-400">{tx.date}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-[#001A3D]">{tx.customer}</span>
                          <span className="text-[10px] font-black text-blue-500">{tx.job}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[14px] font-black text-[#001A3D]">{tx.amount}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                          tx.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                          tx.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {tx.status === 'completed' ? <CheckCircle2 className="h-3 w-3" /> : 
                           tx.status === 'pending' ? <Clock className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                          {tx.status === 'completed' ? 'สำเร็จ' : tx.status === 'pending' ? 'รอตรวจสอบ' : 'ล้มเหลว'}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white hover:text-[#0047AB] hover:shadow-sm transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-4 bg-slate-50/30 border-t border-slate-50 text-center">
              <button className="text-xs font-black text-[#0047AB] hover:underline">ดูรายการทั้งหมด</button>
            </div>
          </div>
        </div>

        {/* Sidebar: Payout Requests */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#001A3D] p-8 text-white shadow-xl shadow-blue-950/20">
            <h3 className="text-lg font-black mb-2">คำขอเบิกเงิน</h3>
            <p className="text-xs font-medium text-blue-300 opacity-60 mb-8">พาร์ทเนอร์รอการตรวจสอบและโอนเงิน</p>
            
            <div className="space-y-6">
              {[
                { name: "บจก. รถยกสายไหม", amount: "฿12,400", time: "2 ชม. ที่แล้ว" },
                { name: "คุณสมพร สไลด์ออน", amount: "฿4,500", time: "5 ชม. ที่แล้ว" },
                { name: "อู่วิชัย รามอินทรา", amount: "฿8,900", time: "เมื่อวานนี้" },
              ].map((payout, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold">{payout.name}</span>
                    <span className="text-[10px] font-medium text-blue-300 opacity-50">{payout.time}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-black text-blue-400">{payout.amount}</div>
                    <div className="text-[9px] font-black uppercase text-white/40">รอโอน</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-10 rounded-xl bg-[#0047AB] py-4 text-xs font-black shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
              จัดการคำขอทั้งหมด
            </button>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6 text-amber-500">
              <AlertCircle className="h-5 w-5" />
              <h4 className="text-[13px] font-black uppercase tracking-wider text-slate-700">แจ้งเตือนระบบ</h4>
            </div>
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              มีรายการชำระเงินที่มียอดสูงเกิน ฿5,000 จำนวน 2 รายการ กรุณาตรวจสอบเอกสารแนบให้ละเอียดก่อนกดยืนยัน
            </p>
            <button className="mt-6 flex items-center gap-2 text-xs font-black text-[#0047AB] hover:underline">
              <FileText className="h-4 w-4" />
              ดูรายการที่ต้องตรวจสอบ
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
