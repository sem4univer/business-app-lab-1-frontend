import {
   Aircraft,
   Airport,
   Country,
   Office,
   Route,
   Schedule,
} from '../types/schedule'

export const schedules: Schedule[] = [
   {
      id: 1,
      date: new Date('2023-02-12'),
      time: new Date('2023-02-12T10:00:00'),
      aircraftId: 101,
      routeId: 201,
      flightNumber: 1234,
      economyPrice: 500,
      confirmed: false,
   },
   {
      id: 2,
      date: new Date('2023-02-13'),
      time: new Date('2023-02-13T10:00:00'),
      aircraftId: 101,
      routeId: 202,
      flightNumber: 1235,
      economyPrice: 500,
      confirmed: false,
   },
]

export const aircrafts: Aircraft[] = [
   {
      id: 101,
      name: 'Boeing 737',
      makeModel: 'Boeing 737-800',
      totalSeats: 190,
      economySeats: 160,
      businessSeats: 30,
   },
]

export const routes: Route[] = [
   {
      id: 201,
      departureAirportId: 301,
      arrivalAirportId: 302,
      distance: 1000,
      flightTime: new Date('2023-02-12T10:00:00'),
   },
   {
      id: 202,
      departureAirportId: 302,
      arrivalAirportId: 301,
      distance: 1000,
      flightTime: new Date('2023-02-13T10:00:00'),
   },
]

export const airports: Airport[] = [
   {
      id: 301,
      countryId: 401,
      IATACode: 'JFK',
      name: 'John F. Kennedy International Airport',
   },
   {
      id: 302,
      countryId: 401,
      IATACode: 'KFJ',
      name: 'Other Airport',
   },
]

export const countries: Country[] = [
   {
      id: 401,
      name: 'United States',
   },
]

export const offices: Office[] = [
   {
      id: 501,
      countryId: 401,
      title: 'New York Office',
      phone: 1234567890,
      contact: 'John Doe',
   },
]
