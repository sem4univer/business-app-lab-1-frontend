import { FC } from 'react'
import css from './ScheduleTable.module.scss'
import { Schedule } from '../app/types/schedule'
import { format } from 'date-fns'
import { useAppSelector } from '../app/utils/hooks'

const scheduleColumns = [
   'Date',
   'Time',
   'From',
   'To',
   'Flight number',
   'Aircraft',
   'Economy price',
   'Business price',
   'First class price',
]

interface Props {
   schedules: Schedule[]
}

export const ScheduleTable: FC<Props> = ({ schedules }) => {
   const { routes } = useAppSelector((state) => state.route)
   const { airports } = useAppSelector((state) => state.airport)
   const { aircrafts } = useAppSelector((state) => state.aircraft)

   const getRoute = (routeId: number) => {
      return routes.find((s) => s.id === routeId)
   }

   const getAirport = (airportId?: number) => {
      return airports.find((a) => a.id === airportId)
   }

   const getAirportCode = (
      routeId: number,
      options?: {
         isFrom: boolean
      }
   ) => {
      const route = getRoute(routeId)
      return (
         getAirport(
            options?.isFrom
               ? route?.departureAirportId
               : route?.arrivalAirportId
         )?.IATACode ?? 'Информация не найдена'
      )
   }

   const getAircraft = (aircraftId: number) => {
      return aircrafts.find((a) => a.id === aircraftId)?.name
   }

   return (
      <table>
         <thead>
            <tr>
               {scheduleColumns.map((col) => (
                  <th className={css.th}>{col}</th>
               ))}
            </tr>
         </thead>

         <tbody>
            {schedules.map((schedule) => {
               const businessPrice = Math.round(schedule.economyPrice * 1.35)
               const firstClassPrice = Math.round(businessPrice * 1.3)

               return (
                  <tr className={css.tr}>
                     <td>{format(schedule.date, 'dd/MM/yyyy')}</td>

                     <td>{format(schedule.time, 'HH:mm')}</td>

                     <td>
                        {getAirportCode(schedule.routeId, { isFrom: true })}
                     </td>

                     <td>{getAirportCode(schedule.routeId)}</td>

                     <td>{schedule.flightNumber}</td>

                     <td>{getAircraft(schedule.aircraftId) ?? '?'}</td>

                     <td>{schedule.economyPrice}</td>

                     <td>{businessPrice}</td>

                     <td>{firstClassPrice}</td>
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}
