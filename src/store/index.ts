import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { aircraftReducer } from './slices/aircraft'
import { airportReducer } from './slices/airport'
import { flightReducer } from './slices/flight'
import { routeReducer } from './slices/route'
import { scheduleReducer } from './slices/schedule'
import { userReducer } from './slices/user'

const store = configureStore({
   reducer: {
      schedule: scheduleReducer,
      route: routeReducer,
      airport: airportReducer,
      aircraft: aircraftReducer,
      user: userReducer,
      flight: flightReducer,
   },
   // to disable console serialize error
   middleware: getDefaultMiddleware({
      serializableCheck: false,
   }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
