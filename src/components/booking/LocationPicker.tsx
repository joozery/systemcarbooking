"use client";

import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Search, LocateFixed } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

// Access token should be in .env
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface LocationPickerProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: any;
}

export default function LocationPicker({ value, onChange, placeholder, icon: Icon }: LocationPickerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [searchText, setSearchText] = useState(value);
  const [isLoadingGps, setIsLoadingGps] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    const timer = setTimeout(() => {
      if (!mapContainer.current) return;

      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [100.5231, 13.7367], // Bangkok
          zoom: 11,
          trackResize: true
        });

        marker.current = new mapboxgl.Marker({ draggable: true, color: "#0047AB" })
          .setLngLat([100.5231, 13.7367])
          .addTo(map.current);

        marker.current.on('dragend', () => {
          const lngLat = marker.current?.getLngLat();
          if (lngLat) {
            onChange(`พิกัด: ${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`);
          }
        });

        map.current.on('load', () => {
          map.current?.resize();
        });
      } catch (err) {
        console.error("Mapbox init error:", err);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!searchText || !map.current || !marker.current) return;
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
        
        map.current.flyTo({ 
          center: [lng, lat], 
          zoom: 16,
          essential: true,
          duration: 2000
        });

        marker.current.setLngLat([lng, lat]);
        setSearchText(feature.place_name);
        onChange(feature.place_name);
      }
    } catch (e) {
      console.error("Geocoding error", e);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation || !map.current || !marker.current) return;

    // Compatibility hack for invasive extensions (e.g. Location Spoofing)
    // that look for global variables and library references.
    (window as any).map = map.current;
    (window as any).marker = marker.current;
    (window as any).mapboxgl = mapboxgl;

    setIsLoadingGps(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { longitude, latitude } = pos.coords;
      
      map.current?.flyTo({ center: [longitude, latitude], zoom: 16 });
      marker.current?.setLngLat([longitude, latitude]);
      
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

      // Clean up global hack after a short delay
      setTimeout(() => {
        delete (window as any).map;
        delete (window as any).marker;
        delete (window as any).mapboxgl;
      }, 500);
    }, (err) => {
      console.error("GPS Error", err);
      setIsLoadingGps(false);
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
            onChange(val);
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
