export const mockApointment = {
  id: 'd3b6d535-bbfb-40d7-9479-71a14b17525b',
  title: 'Project Kickoff Meeting',
  attendees: [
    { id: 1, name: 'Henry Lê Nguyễn', email: 'thailnp133@gmail.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' }
  ],
  recurrence: {
    repeatUnit: 'Does not repeat', // 'Does not repeat', 'Every weekday (Mon - Fri)', 'Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'
    repeatInterval: 0,
    repeatOn: [], // [0, 1, 2, 3, 4] for Weekly, [1, 15] for Monthly, [1, 15] for Yearly
    repeatStart: '2024-11-10',
    repeatEnd: '2024-11-10'
  },
  reminders: [
    { method: 'email', minutesBefore: 15 },
    { method: 'popup', minutesBefore: 5 }
  ],
  organizer: { id: 1, name: 'Henry Lê Nguyễn', email: 'thailnp133@gmail.com' },
  location: 'Room A01',
  timezone: 'Asia/Bangkok (UTC +7)',
  color: '#ffffff',
  description: 'Kickoff meeting to align on project goals and timelines.',
  notes: 'Ensure everyone has access to the project plan.',
  agenda: [
    { topic: 'Introduction', duration: 10 },
    { topic: 'Project Goals', duration: 20 },
    { topic: 'Next Steps', duration: 15 }
  ],
  meeting_type: 'Team Meeting', // 'Team Meeting', 'Client Meeting', 'Training', 'Interview', 'Conference'
  required_equipment: ['Projector', 'Whiteboard'],
  rsvp_status: [
    { attendee_id: 1, status: 'Accepted' },
    { attendee_id: 2, status: 'Tentative' }
  ],
  attachments: [{ file_name: 'Project_Goals.pdf', url: 'https://example.com/project-goals.pdf' }],
  priority: 'High', // 'Low', 'Medium', 'High'
  tags: ['Project A', 'Kickoff'],
  external_links: [{ platform: 'Google Calendar', url: 'https://calendar.google.com/event?id=abcd1234' }],
  cancellation_policy: 'Meeting will be rescheduled if the organizer cancels within 24 hours.',
  eventTime: { startTime: '10:00 AM', endTime: '11:30 AM', startDate: '2024-11-10', endDate: '2024-11-10' },
  created_at: '2024-10-30T10:25:00.000Z',
  updated_at: '2024-10-30T10:25:00.000Z',
  url: 'https://meet.jit.si/ProjectKickoffMeeting',
  share_url: 'https://example.com/project-kickoff-meeting',
  type: 'recurring', // 'single', 'recurring'
  category: 'appointment' // 'appointment', 'event'
}
