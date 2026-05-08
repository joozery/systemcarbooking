"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Car, AlertTriangle, Wrench, Move, CheckCircle2, MapPin, Navigation, FileText, ChevronRight, ChevronLeft, Search, LocateFixed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

type BookingData = {
  serviceType: string;
  reason: string;
  engineStatus: string;
  movementStatus: string;
  origin: string;
  destination: string;
  notes: string;
};

function LocationPicker({ value, onChange, placeholder, icon: Icon }: { value: string, onChange: (v: string) => void, placeholder: string, icon: any }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const _sys_m = useRef<mapboxgl.Map | null>(null);
  const _sys_mk = useRef<mapboxgl.Marker | null>(null);
  const [searchText, setSearchText] = useState(value);
  const [isLoadingGps, setIsLoadingGps] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    const timer = setTimeout(() => {
      if (!mapContainer.current) return;

      try {
        _sys_m.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [100.5231, 13.7367], // Bangkok
          zoom: 11,
          trackResize: true
        });

        _sys_mk.current = new mapboxgl.Marker({ draggable: true, color: "#0047AB" })
          .setLngLat([100.5231, 13.7367])
          .addTo(_sys_m.current);

        _sys_mk.current.on('dragend', () => {
          const lngLat = _sys_mk.current?.getLngLat();
          if (lngLat) {
            onChange(`พิกัด: ${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`);
          }
        });

        _sys_m.current.on('load', () => {
          _sys_m.current?.resize();
        });
      } catch (err) {
        console.error("Mapbox init error:", err);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (_sys_m.current) {
        _sys_m.current.remove();
        _sys_m.current = null;
      }
    };
  }, []);

  const handleSearch = async () => {
    const map = _sys_m.current;
    const marker = _sys_mk.current;
    if (!searchText || !map || !marker) return;
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json`;
      const params = new URLSearchParams({
        access_token: mapboxgl.accessToken,
        country: 'th',
        language: 'th',
        limit: '1',
        types: 'address,poi,place,neighborhood'
      });

      const resp = await fetch(`${endpoint}?${params.toString()}`);
      const data = await resp.json();
      
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const [lng, lat] = feature.center;
        
        map.flyTo({ 
          center: [lng, lat], 
          zoom: 16,
          essential: true,
          duration: 2000
        });

        marker.setLngLat([lng, lat]);
        setSearchText(feature.place_name);
        onChange(feature.place_name);
      }
    } catch (e) {
      console.error("Geocoding error", e);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;
    const map = _sys_m.current;
    const marker = _sys_mk.current;
    if (!map || !marker) return;

    // Compatibility hack for invasive extensions (e.g. Location Spoofing)
    // that look for global variables and library references.
    (window as any).map = map;
    (window as any).marker = marker;
    (window as any).mapboxgl = mapboxgl;

    setIsLoadingGps(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { longitude, latitude } = pos.coords;
      
      map.flyTo({ center: [longitude, latitude], zoom: 16 });
      marker.setLngLat([longitude, latitude]);
      
      try {
        const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}&language=th`);
        const data = await resp.json();
        if (data.features && data.features.length > 0) {
          const name = data.features[0].place_name;
          setSearchText(name);
          onChange(name);
        } else {
          const coordStr = `พิกัด: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setSearchText(coordStr);
          onChange(coordStr);
        }
      } catch (e) {
        console.error("Reverse geocoding error", e);
      }
      setIsLoadingGps(false);
      // Clean up global hack
      delete (window as any).map;
      delete (window as any).marker;
      delete (window as any).mapboxgl;
    }, (err) => {
      console.error("GPS Error", err);
      setIsLoadingGps(false);
      delete (window as any).map;
      delete (window as any).marker;
      delete (window as any).mapboxgl;
      alert("ไม่สามารถเข้าถึงตำแหน่งปัจจุบันได้ กรุณาตรวจสอบการอนุญาต Location ในเบราว์เซอร์");
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Icon className="absolute left-4 top-4 h-6 w-6 text-[#0047AB]" />
        <input 
          type="text" 
          value={searchText}
          onChange={(e) => {
            const val = e.target.value;
            setSearchText(val);
            onChange(val); // Update parent state immediately
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={placeholder}
          className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 pl-14 pr-24 py-4 text-lg font-bold outline-none focus:border-[#0047AB] focus:bg-white"
        />
        <div className="absolute right-2 top-2.5 flex gap-1">
          <button 
            type="button"
            onClick={handleCurrentLocation}
            disabled={isLoadingGps}
            className={`p-2.5 rounded-md transition-all ${isLoadingGps ? "bg-slate-100 text-slate-400" : "bg-blue-50 text-[#0047AB] hover:bg-blue-100"}`}
            title="ใช้ตำแหน่งปัจจุบัน"
          >
            <LocateFixed className={`h-5 w-5 ${isLoadingGps ? "animate-pulse" : ""}`} />
          </button>
          <button 
            type="button"
            onClick={handleSearch}
            className="p-2.5 rounded-md bg-[#001A3D] text-white hover:bg-[#002a61] transition-all"
            title="ค้นหา"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="relative h-64 w-full rounded-lg bg-slate-100 overflow-hidden border-2 border-slate-100 shadow-inner">
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 p-2 rounded-md text-[10px] font-bold text-slate-500 backdrop-blur-sm border border-slate-200">
          คำแนะนำ: พิมพ์ค้นหา หรือ ลากหมุดไปยังตำแหน่งที่ต้องการ
        </div>
      </div>
    </div>
  );
}

export function BookingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<BookingData>({
    serviceType: "",
    reason: "",
    engineStatus: "",
    movementStatus: "",
    origin: "",
    destination: "",
    notes: "",
  });

  const updateData = (key: keyof BookingData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 8));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/booking/track");
    }, 1500);
  };

  const serviceOptions = [
    { id: "รถบรรทุก", image: "/car/truck.png", desc: "สำหรับขนย้ายสินค้าหรือสิ่งของขนาดใหญ่" },
    { id: "รถลากจูง", image: "/car/larh.png", desc: "สำหรับยกรถเสียหรือเกิดอุบัติเหตุ" },
  ];

  const reasonOptions = [
    { id: "รถเสีย", icon: Wrench },
    { id: "อุบัติเหตุ", icon: AlertTriangle },
    { id: "เคลื่อนย้ายปกติ", icon: Move },
  ];

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-2xl shadow-[#001A3D]/10 border border-slate-100">
      
      {/* Progress Bar */}
      <div className="mb-12 flex items-center gap-1 sm:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <div key={s} className={`flex items-center ${s < 8 ? "flex-1" : ""}`}>
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-500 ${
              step >= s ? "bg-[#0047AB] text-white shadow-lg shadow-blue-200 scale-110" : "bg-slate-100 text-slate-400"
            }`}>
              {s}
            </div>
            {s < 8 && (
              <div className={`h-1 w-full mx-1 rounded-full transition-all duration-700 ${
                step > s ? "bg-[#0047AB]" : "bg-slate-100"
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[350px]">
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">เลือกประเภทบริการที่คุณต้องการ</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { updateData("serviceType", opt.id); handleNext(); }}
                    className={`group flex flex-col items-center rounded-2xl border-2 p-8 text-center transition-all duration-300 ${
                      data.serviceType === opt.id ? "border-[#0047AB] bg-[#0047AB]/5 ring-4 ring-[#0047AB]/5" : "border-slate-100 hover:border-[#0047AB]/30 bg-white"
                    }`}
                  >
                    <div className="relative mb-4 flex h-40 w-full items-center justify-center transition-all duration-500 group-hover:scale-110">
                       <img 
                        src={opt.image} 
                        alt={opt.id}
                        className="h-full w-full object-contain drop-shadow-2xl"
                       />
                    </div>
                    <span className="text-xl font-bold text-[#001A3D]">{opt.id}</span>
                    <span className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">ระบุสาเหตุที่เรียกใช้บริการ</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {reasonOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { updateData("reason", opt.id); handleNext(); }}
                    className={`group flex flex-col items-center rounded-lg border-2 p-6 text-center transition-all ${
                      data.reason === opt.id ? "border-[#0047AB] bg-[#0047AB]/5" : "border-slate-100 hover:border-[#0047AB]/50"
                    }`}
                  >
                    <opt.icon className={`mb-3 h-8 w-8 ${data.reason === opt.id ? "text-[#0047AB]" : "text-slate-400 group-hover:text-[#0047AB]"}`} />
                    <span className="font-bold text-[#001A3D]">{opt.id}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">สถานะเครื่องยนต์ของรถคุณ</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["สตาร์ทติด", "สตาร์ทไม่ติด"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { updateData("engineStatus", opt); handleNext(); }}
                    className={`rounded-lg border-2 p-6 text-xl font-bold transition-all ${
                      data.engineStatus === opt ? "border-[#0047AB] bg-[#0047AB]/5 text-[#0047AB]" : "border-slate-100 text-[#001A3D] hover:border-[#0047AB]/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">สถานะการเคลื่อนย้าย (เข็นได้หรือไม่?)</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["เข็นเคลื่อนย้ายได้", "เข็นไม่ได้ / ล้อล็อค"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { updateData("movementStatus", opt); handleNext(); }}
                    className={`rounded-lg border-2 p-6 text-xl font-bold transition-all ${
                      data.movementStatus === opt ? "border-[#0047AB] bg-[#0047AB]/5 text-[#0047AB]" : "border-slate-100 text-[#001A3D] hover:border-[#0047AB]/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">ระบุจุดรับรถ (ต้นทาง)</h2>
              <div className="mt-8">
                <LocationPicker 
                  value={data.origin} 
                  onChange={(v) => updateData("origin", v)} 
                  placeholder="เช่น ซอยสุขุมวิท 55, หน้าเซ็นทรัลเวิลด์..."
                  icon={MapPin}
                />
              </div>
              <button 
                disabled={!data.origin}
                onClick={handleNext}
                className="mt-6 w-full rounded-lg bg-[#0047AB] py-4 text-center font-bold text-white disabled:opacity-50"
              >
                ยืนยันจุดรับรถ
              </button>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">ระบุจุดส่งรถ (ปลายทาง)</h2>
              <div className="mt-8">
                <LocationPicker 
                  value={data.destination} 
                  onChange={(v) => updateData("destination", v)} 
                  placeholder="เช่น อู่ซ่อมรถ B-Quik สาขาสาทร..."
                  icon={Navigation}
                />
              </div>
              <button 
                disabled={!data.destination}
                onClick={handleNext}
                className="mt-6 w-full rounded-lg bg-[#0047AB] py-4 text-center font-bold text-white disabled:opacity-50"
              >
                ยืนยันจุดส่งรถ
              </button>
            </motion.div>
          )}

          {step === 7 && (
            <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-black text-[#001A3D]">เงื่อนไขพิเศษ / หมายเหตุ (ถ้ามี)</h2>
              <div className="mt-8 relative">
                <FileText className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
                <textarea 
                  value={data.notes}
                  onChange={(e) => updateData("notes", e.target.value)}
                  placeholder="เช่น ต้องการรถสไลด์เท่านั้น, รถโหลดเตี้ย..."
                  rows={4}
                  className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 pl-14 pr-6 py-4 text-base font-bold outline-none focus:border-[#0047AB] focus:bg-white resize-none"
                />
              </div>
              <button 
                onClick={handleNext}
                className="mt-6 w-full rounded-lg bg-[#0047AB] py-4 text-center font-bold text-white"
              >
                ดำเนินการต่อ
              </button>
            </motion.div>
          )}

          {step === 8 && (
            <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-4 text-2xl font-black text-[#001A3D]">ตรวจสอบข้อมูลการจอง</h2>
              </div>
              
              <div className="mt-8 space-y-4 rounded-lg bg-slate-50 p-6 border border-slate-100">
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500 font-medium">ประเภทบริการ</span>
                  <span className="font-bold text-[#001A3D]">{data.serviceType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500 font-medium">สาเหตุ</span>
                  <span className="font-bold text-[#001A3D]">{data.reason}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500 font-medium">สถานะรถ</span>
                  <span className="font-bold text-[#001A3D]">{data.engineStatus} / {data.movementStatus}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-200 pb-3">
                  <span className="text-slate-500 font-medium">ต้นทาง</span>
                  <span className="font-bold text-[#001A3D]">{data.origin}</span>
                </div>
                <div className="flex flex-col gap-1 pb-1">
                  <span className="text-slate-500 font-medium">ปลายทาง</span>
                  <span className="font-bold text-[#001A3D]">{data.destination}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[#001A3D] py-4 text-center font-black text-white shadow-xl shadow-[#001A3D]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      กำลังสร้างคำขอ...
                    </span>
                  ) : (
                    "ยืนยันการเรียกใช้บริการ"
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {step > 1 && step < 8 && (
        <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
          <button onClick={handlePrev} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#001A3D]">
            <ChevronLeft className="h-4 w-4" /> ย้อนกลับ
          </button>
        </div>
      )}
    </div>
  );
}
