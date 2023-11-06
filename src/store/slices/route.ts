import { createSlice } from '@reduxjs/toolkit'
import { routes } from '../../app/mock'

const routeSlice = createSlice({
   name: 'route',
   initialState: {
      routes,
   },
   reducers: {},
})

export const routeActions = routeSlice.actions

export const routeReducer = routeSlice.reducer
