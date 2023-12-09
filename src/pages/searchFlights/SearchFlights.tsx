import { useState } from 'react'
import { Confirm } from '../../components/Search/Confirm'
import { DataType, Flights } from '../../components/Search/Flights'
import { Search, SearchFilters } from '../../components/Search/Search'
import { useAppDispatch, useAppSelector } from '../../store'
import { flightActions } from '../../store/slices/flight'
import { getAirportByName } from '../../utils/get-airport-by-name'
import { getAirportCode } from '../../utils/get-airport-code'

export interface Selected {
   outbound?: DataType
   return?: DataType
}

export const SearchFlights = () => {
   const { schedules } = useAppSelector((state) => state.schedule)
   const { routes } = useAppSelector((state) => state.route)
   const { airports } = useAppSelector((state) => state.airport)
   const [filters, setFilters] = useState<SearchFilters>({})
   const [selectedFlight, setSelectedFlight] = useState<Selected>({})
   const dispatch = useAppDispatch()

   const handleConfirm = (passengers: number) => {
      dispatch(
         flightActions.setFlight({
            flight: {
               ...selectedFlight,
               cabinType: filters.cabinType,
               passengers,
            },
         })
      )
   }

   const foundOutboundFlights = schedules.filter((schedule) => {
      if (filters.departure) {
         return (
            getAirportCode(routes, schedule.routeId, airports, {
               isFrom: true,
            }) === getAirportByName(airports, filters.departure)
         )
      }
      if (filters.arrival) {
         return (
            getAirportCode(routes, schedule.routeId, airports) ===
            getAirportByName(airports, filters.arrival)
         )
      }

      if (filters.departureDate) {
         return schedule.date.getTime() === filters.departureDate.getTime()
      }

      return true
   })

   const foundReturnFlights = filters.roundTrip
      ? schedules.filter((schedule) => {
           if (filters.departure) {
              return (
                 getAirportCode(routes, schedule.routeId, airports) ===
                 getAirportByName(airports, filters.departure)
              )
           }
           if (filters.arrival) {
              return (
                 getAirportCode(routes, schedule.routeId, airports, {
                    isFrom: true,
                 }) === getAirportByName(airports, filters.arrival)
              )
           }

           if (filters.returnDate) {
              return schedule.date.getTime() === filters.returnDate?.getTime()
           }

           return true
        })
      : null

   return (
      <>
         <Search onChange={setFilters} />
         {filters.arrival && (
            <Flights
               flights={foundOutboundFlights}
               cabinType={filters.cabinType}
               selectedFlight={selectedFlight.outbound}
               onSelectedChange={(value) =>
                  setSelectedFlight({
                     ...selectedFlight,
                     outbound: value ?? undefined,
                  })
               }
            />
         )}
         {filters.roundTrip && (
            <Flights
               flights={foundReturnFlights}
               cabinType={filters.cabinType}
               selectedFlight={selectedFlight.return}
               onSelectedChange={(value) =>
                  setSelectedFlight({
                     ...selectedFlight,
                     return: value ?? undefined,
                  })
               }
            />
         )}
         {!filters.roundTrip
            ? selectedFlight.outbound
            : selectedFlight.outbound &&
              selectedFlight.return && <Confirm onConfirm={handleConfirm} />}
      </>
   )
}
