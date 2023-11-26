import { Airport } from '../app/types/schedule'

export function getAirport(airports: Airport[], airportId?: number) {
   return airports.find((a) => a.id === airportId)
}
