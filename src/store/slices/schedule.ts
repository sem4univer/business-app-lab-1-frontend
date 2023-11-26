import { createSlice } from '@reduxjs/toolkit'
import { schedules } from '../../app/mock'

const scheduleSlice = createSlice({
   name: 'schedule',
   initialState: {
      schedules,
   },
   reducers: {
      setConfirmed: (state, action) => {
         const { id, confirmed } = action.payload
         const schedule = state.schedules.find((s) => s.id === id)
         if (schedule) {
            schedule.confirmed = confirmed
         }
      },
      updateSchedule: (state, action) => {
         const { id, date, time, economyPrice } = action.payload
         const schedule = state.schedules.find((s) => s.id === id)
         if (schedule) {
            schedule.date = new Date(date)
            schedule.time = new Date(time)
            console.log(new Date(date), new Date(time))
            schedule.economyPrice = economyPrice
         }
      },
   },
})

export const scheduleActions = scheduleSlice.actions

export const scheduleReducer = scheduleSlice.reducer
