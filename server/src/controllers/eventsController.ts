/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express'
import { db } from '../firebase'; // Nếu bạn muốn lưu thông tin sự kiện vào Firestore
import eventbriteAPI from '../services/api'
import createResponse from '../utils/dataResponse'
import { mapEventData, removeUndefinedFields } from '../utils/event'
import { IAppointment } from '../types/appointment';

// Lấy tất cả sự kiện online từ Eventbrite
export const getAllOnlineEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await eventbriteAPI.get(
      '/destination/events/?event_ids=1026809162847,944160819427,1039249381877,1021502701077,924334598667,794212209097,63049080497,165655358637&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=50&include_parent_events=true'
    )

    if (response.status === 200) {
      const events = response.data.events.map(mapEventData)
      res.status(200).json({
        status: 200,
        data: events,
        message: 'Events retrieved successfully'
      })
    } else {
      res.status(response.status).json({
        status: response.status,
        data: null,
        message: 'Failed to retrieve events'
      })
    }
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      data: null,
      message: error.message
    })
  }
}
export const createEvent = async (req: Request, res: Response): Promise<void> => {

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

    // Lưu sự kiện vào Firestore
    const docRef = await db.collection('events').add(newData)

    res.status(201).json(createResponse(201, { id: docRef.id, ...newData }, 'Event created successfully'))
  } catch (error: any) {
    res.status(500).json(createResponse(500, null, error.message))
  }
}

// Lấy một sự kiện từ Firestore
export const getSingleEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await db.collection('events').doc(req.params.id).get()

    if (!doc.exists) {
      res.status(404).json(createResponse(404, null, 'Event not found'))
    } else {
      res.status(200).json(createResponse(200, { id: doc.id, ...doc.data() }, 'Event retrieved successfully'))
    }
  } catch (error: any) {
    res.status(500).json(createResponse(500, null, error.message))
  }
}

// Cập nhật một sự kiện
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const { title, description, start_time, end_time } = req.body

  try {
    const updatedEvent = {
      ...(title && { title }),
      ...(description && { description }),
      ...(start_time && { start_time }),
      ...(end_time && { end_time }),
      updated_at: new Date().toISOString()
    }

    await db.collection('events').doc(req.params.id).update(updatedEvent)

    res.status(200).json(createResponse(200, { id: req.params.id, ...updatedEvent }, 'Event updated successfully'))
  } catch (error: any) {
    res.status(500).json(createResponse(500, null, error.message))
  }
}

// Xóa một sự kiện
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    await db.collection('events').doc(req.params.id).delete()

    res.status(200).json(createResponse(200, null, 'Event deleted successfully'))
  } catch (error: any) {
    res.status(500).json(createResponse(500, null, error.message))
  }
}
