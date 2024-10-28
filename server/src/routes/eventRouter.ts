import express from 'express'
import {
  createEvent,
  deleteEvent,
  getAllOnlineEvents,
  getSingleEvent,
  updateEvent
} from '../controllers/eventsController'

const router = express.Router()

router.get('/', getAllOnlineEvents) // Lấy tất cả sự kiện online
router.post('/create', createEvent) // Tạo sự kiện mới
router.get('/:id', getSingleEvent) // Lấy một sự kiện theo ID
router.put('/:id', updateEvent) // Cập nhật sự kiện theo ID
router.delete('/:id', deleteEvent) // Xóa sự kiện theo ID

export default router
