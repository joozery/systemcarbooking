import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Partner from '../models/Partner';

// @desc    Register a new partner
// @route   POST /api/partners/register
// @access  Public
export const registerPartner = async (req: Request, res: Response) => {
  try {
    const { username, password, ...otherData } = req.body;
    
    // Check if username already exists
    const existingPartner = await Partner.findOne({ username });
    if (existingPartner) {
      return res.status(400).json({ success: false, message: 'ชื่อผู้ใช้งานนี้มีในระบบแล้ว' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new partner entry
    const partner = new Partner({
      ...otherData,
      username,
      password: hashedPassword
    });
    
    // Save to database
    const savedPartner = await partner.save();
    
    res.status(201).json({
      success: true,
      message: 'สมัครพาร์ทเนอร์สำเร็จ ทีมงานจะทำการตรวจสอบข้อมูลของคุณ',
      data: savedPartner
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json({
      success: false,
      message: 'ไม่สามารถส่งข้อมูลใบสมัครได้ กรุณาตรวจสอบข้อมูลอีกครั้ง',
      error: (error as Error).message
    });
  }
};

// @desc    Get all partners (Admin only)
// @route   GET /api/partners
// @access  Private/Admin
export const getPartners = async (req: Request, res: Response) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: partners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถดึงข้อมูลพาร์ทเนอร์ได้'
    });
  }
};

// @desc    Update partner status (Admin only)
// @route   PUT /api/partners/:id/status
// @access  Private/Admin
export const updatePartnerStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'สถานะไม่ถูกต้อง' });
    }

    const partner = await Partner.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!partner) {
      return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลพาร์ทเนอร์' });
    }

    res.status(200).json({
      success: true,
      message: `อัปเดตสถานะเป็น ${status === 'approved' ? 'อนุมัติ' : 'ปฏิเสธ'} เรียบร้อยแล้ว`,
      data: partner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'ไม่สามารถอัปเดตสถานะได้'
    });
  }
};

// @desc    Login partner
// @route   POST /api/partners/login
// @access  Public
export const loginPartner = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 1. Find partner
    const partner = await Partner.findOne({ username });
    if (!partner) {
      return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // 2. Check if approved
    if (partner.status !== 'approved') {
      return res.status(403).json({ 
        success: false, 
        message: partner.status === 'pending' 
          ? 'บัญชีของคุณกำลังอยู่ระหว่างการตรวจสอบ' 
          : 'บัญชีของคุณถูกปฏิเสธการเข้าใช้งาน' 
      });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // 4. Return success (In a real app, you'd send a JWT here)
    res.status(200).json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      data: {
        id: partner._id,
        firstName: partner.firstName,
        lastName: partner.lastName,
        nickname: partner.nickname,
        phone: partner.phone
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
    });
  }
};
