import express from 'express'
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment
} from '../controllers/appointmentController'

const router = express.Router()

router.post('/create', createAppointment) // Tạo mới cuộc hẹn
router.get('/', getAllAppointments) // Lấy tất cả cuộc hẹn
router.get('/:id', getSingleAppointment) // Lấy một cuộc hẹn theo ID
router.put('/:id', updateAppointment) // Cập nhật cuộc hẹn theo ID
router.delete('/:id', deleteAppointment) // Xóa cuộc hẹn theo ID

export default router
