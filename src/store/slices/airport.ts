import { createSlice } from '@reduxjs/toolkit'
import { airports } from '../../app/mock'

const airportSlice = createSlice({
   name: 'airport',
   initialState: {
      airports,
   },
   reducers: {},
})

export const airportActions = airportSlice.actions

export const airportReducer = airportSlice.reducer
