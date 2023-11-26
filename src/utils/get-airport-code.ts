import { Airport, Route } from '../app/types/schedule'
import { getAirport } from './get-airport'
import { getRoute } from './get-route'

export function getAirportCode(
   routes: Route[],
   routeId: number,
   airports: Airport[],
   options?: {
      isFrom: boolean
   }
) {
   const route = getRoute(routes, routeId)
   return (
      getAirport(
         airports,
         options?.isFrom ? route?.departureAirportId : route?.arrivalAirportId
      )?.IATACode ?? 'Информация не найдена'
   )
}
