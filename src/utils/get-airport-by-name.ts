import { Airport } from '../app/types/schedule'

export function getAirportByName(airports: Airport[], name: string) {
   return airports.find((a) => a.name === name)?.IATACode
}
