"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, UserPlus, ShieldAlert, 
  Info, CheckCircle2, Clock, 
  X, ArrowRight, User, Shield
} from "lucide-react";
import Link from "next/link";
import { useNotifications } from "@/context/NotificationContext";

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPopover({ isOpen, onClose }: NotificationPopoverProps) {
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return <User className="h-4 w-4 text-blue-500" />;
      case 'warning': return <Shield className="h-4 w-4 text-amber-500" />;
      case 'success': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      default: return <Info className="h-4 w-4 text-slate-500" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'user': return 'bg-blue-50';
      case 'warning': return 'bg-amber-50';
      case 'success': return 'bg-emerald-50';
      default: return 'bg-slate-50';
    }
  };

  // Show only last 5 notifications in popover
  const displayNotifications = notifications.slice(0, 5);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-12 z-[70] w-80 md:w-[380px] overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <div className="flex items-center gap-2.5">
                <h3 className="text-[15px] font-black text-[#001A3D] tracking-tight">การแจ้งเตือน</h3>
                {unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0047AB] text-[10px] font-black text-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button 
                onClick={onClose}
                className="rounded-full p-1 text-slate-300 hover:bg-slate-50 hover:text-slate-500 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
              {displayNotifications.map((notif, idx) => (
                <Link 
                  key={notif.id}
                  href={notif.link}
                  onClick={() => {
                    markAsRead(notif.id);
                    onClose();
                  }}
                  className={`group relative flex items-start gap-3.5 px-5 py-3.5 transition-all hover:bg-slate-50/50 cursor-pointer ${idx !== displayNotifications.length - 1 ? 'border-b border-slate-50/50' : ''}`}
                >
                  <div className="pt-1.5 w-2 shrink-0">
                    {notif.unread && (
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    )}
                  </div>
                  
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconBg(notif.type)} transition-transform group-hover:scale-105`}>
                    {getIcon(notif.type)}
                  </div>

                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[13px] leading-tight truncate ${notif.unread ? 'font-black text-[#001A3D]' : 'font-bold text-slate-400'}`}>
                        {notif.title}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                        <Clock className="h-3 w-3" />
                        {notif.time}
                      </div>
                    </div>
                    <p className={`text-[12px] leading-relaxed line-clamp-2 ${notif.unread ? 'font-medium text-slate-500' : 'font-medium text-slate-300'}`}>
                      {notif.message}
                    </p>
                  </div>
                </Link>
              ))}
              
              {notifications.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-sm font-bold text-slate-400">ไม่มีการแจ้งเตือน</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3.5 bg-slate-50/30">
              <Link 
                href="/admin/notifications"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-slate-100 py-2.5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 shadow-sm transition-all hover:bg-[#001A3D] hover:text-white hover:border-[#001A3D] group"
              >
                ดูทั้งหมด
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
