import { createSlice } from '@reduxjs/toolkit'
import { Values } from '../../components/Book/PassengerForm'
import { Selected } from '../../pages/searchFlights/SearchFlights'

export interface Flight extends Selected {
   cabinType: string
   passengers: number
}

interface FlightState {
   flight: Flight
   passengers: Values[]
}

const initialState: FlightState = {
   flight: {} as Flight,
   passengers: [],
}

const flightSlice = createSlice({
   name: 'flight',
   initialState,
   reducers: {
      setFlight: (state, action) => {
         state.flight = action.payload.flight
      },
      setPassengers: (state, action) => {
         state.passengers = action.payload.passengers
      },
      issueTickets: (state, action) => {
         console.log(action.payload.paymentMethod) // TODO: нужна логика с уходом данных билета и оплаты на бэк
      },
   },
})

export const flightActions = flightSlice.actions

export const flightReducer = flightSlice.reducer
