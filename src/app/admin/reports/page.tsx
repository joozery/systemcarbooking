"use client";

import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Truck, 
  DollarSign, 
  Calendar, 
  Download,
  ArrowUpRight,
  Map,
  Clock,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const stats = [
    { label: "รายได้รวมเดือนนี้", value: "฿1,240,500", trend: "+12.5%", isUp: true, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "จำนวนงานทั้งหมด", value: "842 งาน", trend: "+5.2%", isUp: true, icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "ลูกค้าใหม่", value: "128 คน", trend: "-2.4%", isUp: false, icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "ระยะเวลาตอบสนองเฉลี่ย", value: "14 นาที", trend: "-15.0%", isUp: true, icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const topVendors = [
    { name: "เก่งกล้า ยานยนต์", jobs: 142, revenue: "฿213,000", rating: 4.9 },
    { name: "วินเนอร์ สไลด์ออน", jobs: 128, revenue: "฿192,000", rating: 4.8 },
    { name: "สมชาย ใจดี", jobs: 98, revenue: "฿147,000", rating: 4.7 },
  ];

  return (
    <div className="space-y-8 font-noto-thai pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#001A3D] tracking-tight">รายงานและสถิติ</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">วิเคราะห์ภาพรวมธุรกิจและประสิทธิภาพการทำงาน</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black text-[#001A3D] hover:bg-slate-50 transition-all">
            <Calendar className="h-4 w-4" /> 7 วันล่าสุด
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-[#0047AB] px-5 py-3 text-xs font-black text-white hover:bg-[#003580] shadow-lg shadow-blue-500/20 transition-all">
            <Download className="h-4 w-4" /> ส่งออกรายงาน
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${stat.isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                {stat.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-[#001A3D]">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black text-[#001A3D]">แนวโน้มรายได้</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">เปรียบเทียบระหว่างรายได้จากรถสไลด์และรถยก</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-[#0047AB]" /> <span className="text-[10px] font-bold text-slate-500 uppercase">รถสไลด์</span></div>
              <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-blue-300" /> <span className="text-[10px] font-bold text-slate-500 uppercase">รถยก</span></div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4">
            {[45, 62, 58, 75, 90, 82, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1 items-center">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} className="w-full max-w-[20px] rounded-t-md bg-[#0047AB] opacity-90 hover:opacity-100 transition-opacity cursor-pointer relative group">
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#001A3D] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">฿{h*1200}</div>
                  </motion.div>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${h/2}%` }} className="w-full max-w-[20px] rounded-t-sm bg-blue-300 opacity-80" />
                </div>
                <span className="text-[10px] font-black text-slate-400">จันทร์ - {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-black text-[#001A3D] mb-6">พาร์ทเนอร์ดีเด่น</h3>
          <div className="space-y-6">
            {topVendors.map((vendor, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-[#0047AB] group-hover:bg-[#0047AB] group-hover:text-white transition-all">{i+1}</div>
                <div className="flex-1">
                  <div className="text-sm font-black text-[#001A3D] flex items-center justify-between">
                    {vendor.name}
                    <span className="text-[#0047AB] text-xs">฿{vendor.jobs} งาน</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <div key={s} className={`h-1 w-3 rounded-full ${s <= Math.floor(vendor.rating) ? "bg-amber-400" : "bg-slate-100"}`} />)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{vendor.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 rounded-xl border border-slate-200 bg-white py-3.5 text-xs font-black text-[#001A3D] hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            ดูพาร์ทเนอร์ทั้งหมด <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Hot Zones Placeholder */}
         <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-black text-[#001A3D]">พื้นที่งานหนาแน่น (Hot Zones)</h3>
               <Map className="h-5 w-5 text-slate-300" />
            </div>
            <div className="space-y-5">
               {[
                 { name: "กรุงเทพฯ - จตุจักร", percent: 85, color: "bg-red-500" },
                 { name: "กรุงเทพฯ - บางนา", percent: 62, color: "bg-amber-500" },
                 { name: "ชลบุรี - ศรีราชา", percent: 45, color: "bg-blue-500" },
                 { name: "ปทุมธานี - ลำลูกกา", percent: 38, color: "bg-purple-500" },
               ].map((zone, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                       <span>{zone.name}</span>
                       <span>{zone.percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: `${zone.percent}%` }} className={`h-full ${zone.color} rounded-full`} />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Recent Exported Reports */}
         <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-black text-[#001A3D] mb-6">ไฟล์รายงานล่าสุด</h3>
            <div className="space-y-4">
               {[
                 { name: "Monthly_Revenue_May_2024.pdf", size: "2.4 MB", date: "เมื่อสักครู่" },
                 { name: "Vendor_Performance_Q1.xlsx", size: "1.1 MB", date: "2 ชั่วโมงที่แล้ว" },
                 { name: "User_Demographics_2024.pdf", size: "5.8 MB", date: "เมื่อวานนี้" },
               ].map((file, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-red-500 font-black text-[10px]">PDF</div>
                       <div>
                          <div className="text-xs font-bold text-[#001A3D]">{file.name}</div>
                          <div className="text-[10px] font-medium text-slate-400">{file.size} • {file.date}</div>
                       </div>
                    </div>
                    <Download className="h-4 w-4 text-slate-300" />
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
