import { Aircraft } from '../app/types/schedule'

export function getAircraft(aircrafts: Aircraft[], aircraftId: number) {
   return aircrafts.find((a) => a.id === aircraftId)?.name
}
