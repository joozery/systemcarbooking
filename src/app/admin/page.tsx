"use client";

import { Clock, CheckCircle2, AlertCircle, Truck, TrendingUp, Briefcase, CreditCard, MoreVertical, Eye, Edit2, Phone, Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
            <Briefcase className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">งานทั้งหมด</div>
            <div className="text-2xl font-black text-slate-800">1,246</div>
            <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-500">
              <TrendingUp className="mr-1 h-3 w-3" /> +12.5% จากสัปดาห์ที่แล้ว
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
            <Truck className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">งานที่กำลังดำเนินการ</div>
            <div className="text-2xl font-black text-slate-800">237</div>
            <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-500">
              <TrendingUp className="mr-1 h-3 w-3" /> +8.3% จากสัปดาห์ที่แล้ว
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">งานที่เสร็จสิ้น</div>
            <div className="text-2xl font-black text-slate-800">892</div>
            <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-500">
              <TrendingUp className="mr-1 h-3 w-3" /> +15.7% จากสัปดาห์ที่แล้ว
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-500">
            <CreditCard className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">รายได้รวม</div>
            <div className="text-2xl font-black text-slate-800">฿1,245,300</div>
            <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-500">
              <TrendingUp className="mr-1 h-3 w-3" /> +10.4% จากสัปดาห์ที่แล้ว
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Line Chart & Recent Jobs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Line Chart Placeholder */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800">ภาพรวมการใช้งาน</h3>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
              7 วันล่าสุด <ChevronDown className="h-3 w-3" />
            </button>
          </div>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span> งานทั้งหมด
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> งานที่เสร็จสิ้น
            </div>
          </div>
          {/* Mock Line Chart with SVG */}
          <div className="relative h-[200px] w-full">
             {/* Y-Axis Labels */}
             <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-medium text-slate-400">
               <span>250</span><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
             </div>
             {/* Graph Area */}
             <div className="absolute left-8 right-0 top-2 bottom-6 border-b border-slate-100">
               {/* Horizontal Grid Lines */}
               <div className="absolute inset-x-0 top-0 h-px bg-slate-100"></div>
               <div className="absolute inset-x-0 top-1/5 h-px bg-slate-100"></div>
               <div className="absolute inset-x-0 top-2/5 h-px bg-slate-100"></div>
               <div className="absolute inset-x-0 top-3/5 h-px bg-slate-100"></div>
               <div className="absolute inset-x-0 top-4/5 h-px bg-slate-100"></div>

               {/* Lines */}
               <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                 {/* Green Line (Completed) */}
                 <path d="M 0,130 L 70,90 L 140,105 L 210,100 L 280,90 L 350,100 L 420,70" fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                 {/* Blue Line (Total) */}
                 <path d="M 0,100 L 70,50 L 140,50 L 210,80 L 280,45 L 350,60 L 420,20" fill="none" stroke="#3b82f6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                 
                 {/* Dots Blue */}
                 <circle cx="0%" cy="100" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                 <circle cx="16.6%" cy="50" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                 <circle cx="33.3%" cy="50" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                 <circle cx="50%" cy="80" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                 <circle cx="66.6%" cy="45" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                 <circle cx="83.3%" cy="60" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                 <circle cx="100%" cy="20" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />

                 {/* Dots Green */}
                 <circle cx="0%" cy="130" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                 <circle cx="16.6%" cy="90" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                 <circle cx="33.3%" cy="105" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                 <circle cx="50%" cy="100" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                 <circle cx="66.6%" cy="90" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                 <circle cx="83.3%" cy="100" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                 <circle cx="100%" cy="70" r="4" fill="#10b981" stroke="white" strokeWidth="2" />
               </svg>
             </div>
             {/* X-Axis Labels */}
             <div className="absolute left-8 right-0 bottom-0 flex justify-between text-[10px] font-medium text-slate-400">
               <span>17 พ.ค.</span><span>18 พ.ค.</span><span>19 พ.ค.</span><span>20 พ.ค.</span><span>21 พ.ค.</span><span>22 พ.ค.</span><span>23 พ.ค.</span>
             </div>
          </div>
        </div>

        {/* Recent Jobs Table */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">งานล่าสุด</h3>
            <Link href="/admin/jobs" className="text-xs font-bold text-blue-600 hover:underline">ดูทั้งหมด</Link>
          </div>
          <div className="space-y-4">
            {[
              { id: "#CW240523-001", type: "รถลากจูง", origin: "กรุงเทพฯ", dest: "สมุทรปราการ", status: "กำลังดำเนินการ", badge: "bg-blue-50 text-blue-600" },
              { id: "#CW240523-002", type: "รถบรรทุก", origin: "ชลบุรี", dest: "ระยอง", status: "เสร็จสิ้น", badge: "bg-emerald-50 text-emerald-600" },
              { id: "#CW240523-003", type: "รถลากจูง", origin: "นนทบุรี", dest: "ปทุมธานี", status: "รอดำเนินการ", badge: "bg-amber-50 text-amber-600" },
              { id: "#CW240523-004", type: "รถบรรทุก", origin: "กรุงเทพฯ", dest: "นครปฐม", status: "กำลังดำเนินการ", badge: "bg-blue-50 text-blue-600" },
              { id: "#CW240523-005", type: "รถลากจูง", origin: "สมุทรสาคร", dest: "กรุงเทพฯ", status: "ยกเลิก", badge: "bg-red-50 text-red-600" },
            ].map((job, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div className="flex-1 grid grid-cols-4 items-center gap-4 text-xs">
                  <span className="font-bold text-slate-800 col-span-1">{job.id}</span>
                  <span className="text-slate-500 col-span-1">{job.type}</span>
                  <span className="text-slate-500 col-span-2 hidden sm:block">ต้นทาง: {job.origin} <span className="mx-2 text-slate-300">|</span> ปลายทาง: {job.dest}</span>
                </div>
                <div className={`px-2.5 py-1 rounded text-[10px] font-bold ${job.badge}`}>
                  {job.status}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Bottom Row: Donut Charts & Bar Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Donut Chart 1: Job Status */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-6">งานตามสถานะ</h3>
          <div className="flex items-center justify-between">
            {/* SVG Donut */}
            <div className="relative h-32 w-32 shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                {/* Cancelled (Red) 5% */}
                <circle strokeDasharray="100, 100" strokeDashoffset="0" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#ef4444" strokeWidth="6"></circle>
                {/* Completed (Green) 71% */}
                <circle strokeDasharray="95, 100" strokeDashoffset="0" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="6"></circle>
                {/* Active (Yellow) 19% */}
                <circle strokeDasharray="24, 100" strokeDashoffset="-71" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="6"></circle>
                {/* Pending (Blue) 18% (Sum is > 100 in design, but let's approximate visually) */}
                <circle strokeDasharray="5, 100" strokeDashoffset="-95" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="6"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-slate-800">1,246</span>
                <span className="text-[9px] font-medium text-slate-400">งานทั้งหมด</span>
              </div>
            </div>
            {/* Legend */}
            <div className="space-y-3 flex-1 ml-6">
              {[
                { label: "รอดำเนินการ", percent: "18%", count: "(224)", color: "bg-blue-500" },
                { label: "กำลังดำเนินการ", percent: "19%", count: "(237)", color: "bg-amber-500" },
                { label: "เสร็จสิ้น", percent: "71%", count: "(892)", color: "bg-emerald-500" },
                { label: "ยกเลิก", percent: "5%", count: "(61)", color: "bg-red-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.color}`}></span>
                    <span className="font-medium text-slate-600">{item.label}</span>
                  </div>
                  <div className="font-bold text-slate-800">
                    {item.percent} <span className="text-slate-400 font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donut Chart 2: Partner Status */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-6">พาร์ทเนอร์ / คนขับ</h3>
          <div className="flex items-center justify-between">
            {/* SVG Donut */}
            <div className="relative h-32 w-32 shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                {/* Pending (Gray) */}
                <circle strokeDasharray="100, 100" strokeDashoffset="0" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#cbd5e1" strokeWidth="6"></circle>
                {/* Offline (Green) */}
                <circle strokeDasharray="95, 100" strokeDashoffset="0" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="6"></circle>
                {/* Online (Blue) */}
                <circle strokeDasharray="40, 100" strokeDashoffset="-55" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="6"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-slate-800">356</span>
                <span className="text-[9px] font-medium text-slate-400">ทั้งหมด</span>
              </div>
            </div>
            {/* Legend */}
            <div className="space-y-4 flex-1 ml-6">
              {[
                { label: "ออนไลน์", count: "142 คน", color: "bg-blue-500" },
                { label: "ออฟไลน์", count: "201 คน", color: "bg-emerald-500" },
                { label: "กำลังตรวจสอบ", count: "13 คน", color: "bg-slate-300" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.color}`}></span>
                    <span className="font-medium text-slate-600">{item.label}</span>
                  </div>
                  <div className="font-bold text-slate-800">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart: Revenue */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-800">รายได้รวม</h3>
              <div className="text-2xl font-black text-slate-800 mt-1">฿1,245,300</div>
              <div className="text-[10px] font-bold text-emerald-500 mt-1">+10.4% จากช่วงที่ผ่านมา</div>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
              7 วันล่าสุด <ChevronDown className="h-3 w-3" />
            </button>
          </div>
          
          {/* CSS Bar Chart */}
          <div className="relative mt-6 h-28 w-full flex items-end justify-between px-2">
            {/* Background Grid */}
            <div className="absolute inset-0 flex flex-col justify-between border-b border-slate-100 pb-6 z-0">
               <div className="h-px w-full bg-slate-50"></div>
               <div className="h-px w-full bg-slate-50"></div>
               <div className="h-px w-full bg-slate-50"></div>
               <div className="h-px w-full bg-slate-50"></div>
            </div>
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[8px] font-medium text-slate-300 z-0">
               <span>300K</span><span>200K</span><span>100K</span><span>0</span>
            </div>

            {/* Bars */}
            {[
              { height: "55%", label: "17 พ.ค." },
              { height: "40%", label: "18 พ.ค." },
              { height: "48%", label: "19 พ.ค." },
              { height: "60%", label: "20 พ.ค." },
              { height: "50%", label: "21 พ.ค." },
              { height: "55%", label: "22 พ.ค." },
              { height: "90%", label: "23 พ.ค." },
            ].map((bar, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group ml-6">
                <div className="w-4 rounded-t-sm bg-blue-500 transition-all group-hover:bg-blue-600" style={{ height: bar.height }}></div>
                <span className="absolute -bottom-5 text-[8px] font-medium text-slate-400 whitespace-nowrap">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Bottom Row: Action Table & Online Partners */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
        
        {/* Table Area */}
        <div className="col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800">งานที่ต้องดำเนินการ</h3>
            <Link href="/admin/jobs" className="text-xs font-bold text-blue-600 hover:underline">ดูทั้งหมด</Link>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="text-slate-500 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-medium rounded-l-lg">รหัสงาน</th>
                  <th className="px-4 py-3 font-medium">ประเภทบริการ</th>
                  <th className="px-4 py-3 font-medium">ลูกค้า</th>
                  <th className="px-4 py-3 font-medium">ต้นทาง - ปลายทาง</th>
                  <th className="px-4 py-3 font-medium">วันที่สร้าง</th>
                  <th className="px-4 py-3 font-medium">ยอดชำระ</th>
                  <th className="px-4 py-3 font-medium">สถานะ</th>
                  <th className="px-4 py-3 font-medium text-center rounded-r-lg">จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {[
                  { id: "#CW240523-006", type: "รถลากจูง", customer: "คุณสมชาย ใจดี", route: "กรุงเทพฯ - สมุทรปราการ", date: "23 พ.ค. 2567 14:30", price: "฿2,500" },
                  { id: "#CW240523-007", type: "รถบรรทุก", customer: "บริษัท ABC จำกัด", route: "ชลบุรี - ระยอง", date: "23 พ.ค. 2567 13:45", price: "฿5,800" },
                  { id: "#CW240523-008", type: "รถลากจูง", customer: "คุณธนภัทร รุ่งเรือง", route: "นนทบุรี - ปทุมธานี", date: "23 พ.ค. 2567 12:20", price: "฿2,300" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 font-bold">{row.id}</td>
                    <td className="px-4 py-4 text-slate-500">{row.type}</td>
                    <td className="px-4 py-4">{row.customer}</td>
                    <td className="px-4 py-4 text-slate-500">{row.route}</td>
                    <td className="px-4 py-4 text-slate-500">{row.date}</td>
                    <td className="px-4 py-4 font-bold">{row.price}</td>
                    <td className="px-4 py-4">
                      <span className="bg-amber-50 text-amber-600 px-2 py-1 rounded text-[10px] font-bold">รอดำเนินการ</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-slate-400">
                        <button className="hover:text-blue-600 transition-colors"><Eye className="h-4 w-4" /></button>
                        <button className="hover:text-blue-600 transition-colors"><Edit2 className="h-4 w-4" /></button>
                        <button className="hover:text-slate-800 transition-colors"><MoreVertical className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Online Partners List */}
        <div className="col-span-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800">พาร์ทเนอร์ออนไลน์</h3>
            <Link href="/admin/vendors" className="text-xs font-bold text-blue-600 hover:underline">ดูทั้งหมด</Link>
          </div>
          <div className="space-y-5">
            {[
              { name: "สมชาย ใจดี", plate: "1ขธ 1234", img: "https://ui-avatars.com/api/?name=Somchai&background=e2e8f0&color=475569" },
              { name: "วิชัย แก้วมณี", plate: "2ณฆ 5678", img: "https://ui-avatars.com/api/?name=Wichai&background=e2e8f0&color=475569" },
              { name: "ณัฐวุฒิ ศรีสุข", plate: "3ฒศ 9101", img: "https://ui-avatars.com/api/?name=Nattawut&background=e2e8f0&color=475569" },
            ].map((partner, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={partner.img} alt={partner.name} className="h-10 w-10 rounded-full object-cover border border-slate-200" />
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{partner.name}</div>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500 mt-0.5">
                      <Truck className="h-3 w-3" /> {partner.plate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold">ออนไลน์</span>
                  <button className="text-blue-500 hover:text-blue-700 transition-colors">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
