import { FC, useState } from 'react'

import { Schedule } from '../../app/types/schedule'
import {
   Filters,
   ScheduleFilters,
} from '../../components/Schedule/ScheduleFilters'
import { ScheduleModal } from '../../components/Schedule/ScheduleModal'
import {
   DataType,
   ScheduleTable,
} from '../../components/Schedule/ScheduleTable'
import { useAppSelector } from '../../store'
import { getAirportByName } from '../../utils/get-airport-by-name'
import { getAirportCode } from '../../utils/get-airport-code'

export const MainFlights: FC = () => {
   const { schedules } = useAppSelector((state) => state.schedule)
   const { routes } = useAppSelector((state) => state.route)
   const { airports } = useAppSelector((state) => state.airport)
   const [filters, setFilters] = useState<Filters>({})
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [selectedSchedule, setSelectedSchedule] = useState<DataType | null>(
      null
   )

   const scheduleFilterFn = (schedule: Schedule) => {
      if (filters.from) {
         return (
            getAirportCode(routes, schedule.routeId, airports, {
               isFrom: true,
            }) === getAirportByName(airports, filters.from)
         )
      }
      if (filters.to) {
         return (
            getAirportCode(routes, schedule.routeId, airports) ===
            getAirportByName(airports, filters.to)
         )
      }
      if (filters.date) {
         return schedule.date.getTime() === filters.date.getTime()
      }
      if (filters.flightNumber) {
         return schedule.flightNumber === filters.flightNumber
      }

      return true
   }

   const schedulesSortFn = (a: Schedule, b: Schedule) => {
      switch (filters.sortBy) {
         case 'Date-Time':
            return new Date(a.date).getTime() - new Date(b.date).getTime()
         case 'Economy price':
            return a.economyPrice - b.economyPrice
         case 'Confirmed/not-confirmed':
            if (a.confirmed === b.confirmed) {
               return 0
            }
            return a.confirmed ? -1 : 1
         default:
            return 0
      }
   }

   const filteredSchedules = schedules.filter(scheduleFilterFn)
   if (filters.sortBy) {
      schedules.sort(schedulesSortFn)
   }

   return (
      <>
         <ScheduleFilters onChange={setFilters} />
         <ScheduleTable
            data={filteredSchedules}
            selectedSchedule={selectedSchedule}
            onModalOpenedChange={setIsModalOpen}
            onSelectedScheduleChange={setSelectedSchedule}
         />
         <ScheduleModal
            isModalOpen={isModalOpen}
            onModalOpenedChange={setIsModalOpen}
            selectedSchedule={selectedSchedule}
         />
      </>
   )
}
