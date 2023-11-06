import { configureStore } from '@reduxjs/toolkit'
import { scheduleReducer } from './slices/schedule'
import { routeReducer } from './slices/route'
import { airportReducer } from './slices/airport'
import { aircraftReducer } from './slices/aircraft'

const store = configureStore({
   reducer: {
      schedule: scheduleReducer,
      route: routeReducer,
      airport: airportReducer,
      aircraft: aircraftReducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
