import express from "express";
import { 
  createBooking, 
  getBookings, 
  getBookingById, 
  updateBookingStatus,
  getPartnerBookings
} from "../controllers/bookingController";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.patch("/:id/status", updateBookingStatus);
router.get("/partner/:partnerId", getPartnerBookings);

export default router;
