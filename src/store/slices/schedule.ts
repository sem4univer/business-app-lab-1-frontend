import { createSlice } from '@reduxjs/toolkit'
import { schedules } from '../../app/mock'

const scheduleSlice = createSlice({
   name: 'schedule',
   initialState: {
      schedules,
   },
   reducers: {},
})

export const scheduleActions = scheduleSlice.actions

export const scheduleReducer = scheduleSlice.reducer
