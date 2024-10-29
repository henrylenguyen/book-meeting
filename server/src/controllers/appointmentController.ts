/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { db } from '../firebase' // Đảm bảo bạn đã cấu hình Firestore trong file này

import { IAppointment } from '../types/appointment'
import createResponse from '../utils/dataResponse' // Hàm tạo phản hồi chuẩn
import { removeUndefinedFields } from '../utils/event'

// Tạo mới một cuộc hẹn và lưu vào Firestore
export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    // Lấy dữ liệu từ body của request
    const {
      id,
      title,
      attendees,
      eventTime,
      recurrence,
      location,
      timezone,
      color,
      description,
      url,
      type,
      category,
      share_url
    } = req.body as IAppointment

    // Tạo đối tượng cuộc hẹn
    const newAppointment: IAppointment = {
      id,
      title,
      attendees,
      eventTime,
      recurrence,
      location,
      timezone,
      color,
      description,
      url,
      type,
      category,
      share_url
    }
    const newData = removeUndefinedFields(newAppointment)

    // Lưu cuộc hẹn vào Firestore (collection "appointments")
    const docRef = await db.collection('appointments').add(newData)

    // Trả về phản hồi JSON thành công
    res.status(201).json(createResponse(201, { ...newData, id: docRef.id }, 'Appointment created successfully'))
  } catch (error: any) {
    // Trả về phản hồi lỗi 500 nếu có lỗi xảy ra
    res.status(500).json(createResponse(500, null, error.message))
  }
}

// Lấy tất cả các cuộc hẹn
export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await db.collection('appointments').get()
    const appointments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    res.status(200).json(createResponse(200, appointments, 'Appointments retrieved successfully'))
  } catch (error: any) {
    res.status(500).json(createResponse(500, null, error.message))
  }
}

// Lấy một cuộc hẹn cụ thể theo ID
export const getSingleAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await db.collection('appointments').doc(req.params.id).get()

    if (!doc.exists) {
      res.status(404).json(createResponse(404, null, 'Appointment not found'))
    } else {
      res.status(200).json(createResponse(200, { id: doc.id, ...doc.data() }, 'Appointment retrieved successfully'))
    }
  } catch (error: any) {
    res.status(500).json(createResponse(500, null, error.message))
  }
}

// Cập nhật một cuộc hẹn
export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedAppointment = req.body as Partial<IAppointment>

    await db.collection('appointments').doc(req.params.id).update(updatedAppointment)

    res
      .status(200)
      .json(createResponse(200, { id: req.params.id, ...updatedAppointment }, 'Appointment updated successfully'))
  } catch (error: any) {
    res.status(500).json(createResponse(500, null, error.message))
  }
}

// Xóa một cuộc hẹn
export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    await db.collection('appointments').doc(req.params.id).delete()

    res.status(200).json(createResponse(200, null, 'Appointment deleted successfully'))
  } catch (error: any) {
    res.status(500).json(createResponse(500, null, error.message))
  }
}
