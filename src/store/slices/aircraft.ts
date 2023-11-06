import { createSlice } from '@reduxjs/toolkit'
import { aircrafts } from '../../app/mock'

const aircraftSlice = createSlice({
   name: 'aircraft',
   initialState: {
      aircrafts,
   },
   reducers: {},
})

export const aircraftActions = aircraftSlice.actions

export const aircraftReducer = aircraftSlice.reducer
