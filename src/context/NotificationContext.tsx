"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  type: 'info' | 'success' | 'warning' | 'user';
  unread: boolean;
  link: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "พาร์ทเนอร์ใหม่สมัครสมาชิก",
      message: "จินจีอู คิม ได้ส่งเอกสารสมัครสมาชิกเพื่อขอรับงานในระบบ พร้อมแนบเอกสารใบขับขี่และบัตรประชาชน",
      time: "2 นาทีที่แล้ว",
      date: "10 พ.ค. 2569",
      type: 'user',
      unread: true,
      link: "/admin/vendors"
    },
    {
      id: "2",
      title: "พนักงานรอการอนุมัติ",
      message: "พนักงานใหม่ 'devart' รอการยืนยันเข้าสู่ระบบเพื่อเริ่มใช้งานจัดการงานหน้าร้าน",
      time: "1 ชั่วโมงที่แล้ว",
      date: "10 พ.ค. 2569",
      type: 'warning',
      unread: true,
      link: "/admin/staff"
    },
    {
      id: "3",
      title: "ระบบอัปเดตสำเร็จ",
      message: "Crown Wealth ได้รับการอัปเดตเป็นเวอร์ชัน 1.2.0 เรียบร้อยแล้ว (Security Patch & UI Refinement)",
      time: "3 ชั่วโมงที่แล้ว",
      date: "10 พ.ค. 2569",
      type: 'success',
      unread: false,
      link: "/admin/notifications"
    },
    {
      id: "4",
      title: "รายการจองใหม่",
      message: "มีรายการจองรถสไลด์ใหม่จากคุณสมชาย ที่เขตบางนา สำหรับพรุ่งนี้เวลา 10:00 น.",
      time: "5 ชั่วโมงที่แล้ว",
      date: "10 พ.ค. 2569",
      type: 'info',
      unread: false,
      link: "/admin/jobs"
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
