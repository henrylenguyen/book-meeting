// src/index.ts
import cors from 'cors'; // Thêm import cho cors
import express from 'express'
import appointmentRouter from './routes/appointmentRouter'
import eventsRouter from './routes/eventRouter'

const app = express()
const PORT = process.env.PORT || 3000

// Sử dụng cors cho tất cả các đường dẫn
app.use(cors())

app.use(express.json())
app.use('/api/v1/events', eventsRouter)

app.use('/api/v1/appointments', appointmentRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
