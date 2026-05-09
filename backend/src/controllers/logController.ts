import { Request, Response } from 'express';
import AuditLog from '../models/AuditLog';

// @desc    Get all audit logs
// @route   GET /api/logs
// @access  Private/Admin
export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await AuditLog.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถดึงข้อมูลประวัติได้'
    });
  }
};

// Helper function to create a log (to be used inside other controllers)
export const createAuditLog = async (data: {
  user: string;
  userModel: 'Staff' | 'Partner';
  action: string;
  target?: string;
  details?: string;
  ipAddress?: string;
}) => {
  try {
    await AuditLog.create(data);
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};
