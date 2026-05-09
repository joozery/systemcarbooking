import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Staff from '../models/Staff';

// @desc    Get all staff members
// @route   GET /api/staff
// @access  Private/Admin
export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถดึงข้อมูลทีมงานได้'
    });
  }
};

// @desc    Create a new staff member
// @route   POST /api/staff
// @access  Private/Admin
export const createStaff = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, level, avatar } = req.body;

    // Check if staff already exists
    const staffExists = await Staff.findOne({ email });
    if (staffExists) {
      return res.status(400).json({
        success: false,
        message: 'อีเมลนี้ถูกใช้งานแล้ว'
      });
    }

    const staff = await Staff.create({
      name,
      email,
      password,
      role,
      level,
      avatar,
      status: 'pending' // Default status for new staff
    });

    res.status(201).json({
      success: true,
      message: 'เพิ่มทีมงานสำเร็จ',
      data: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'ข้อมูลไม่ถูกต้อง',
      error: (error as Error).message
    });
  }
};

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private/Admin
export const updateStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลทีมงาน'
      });
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'อัปเดตข้อมูลสำเร็จ',
      data: updatedStaff
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'ไม่สามารถอัปเดตข้อมูลได้'
    });
  }
};

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private/Admin
export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลทีมงาน'
      });
    }

    await staff.deleteOne();

    res.status(200).json({
      success: true,
      message: 'ลบข้อมูลทีมงานเรียบร้อยแล้ว'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถลบข้อมูลได้'
    });
  }
};
// @desc    Login staff member
// @route   POST /api/staff/login
// @access  Public
export const loginStaff = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check for staff email
    const staff = await Staff.findOne({ email });

    if (staff && (await staff.matchPassword(password))) {
      // Update last login
      staff.lastLogin = new Date();
      await staff.save();

      res.json({
        success: true,
        data: {
          _id: staff._id,
          name: staff.name,
          email: staff.email,
          role: staff.role,
          level: staff.level,
          avatar: staff.avatar,
          token: jwt.sign(
            { id: staff._id, role: staff.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '30d' }
          )
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
    });
  }
};
