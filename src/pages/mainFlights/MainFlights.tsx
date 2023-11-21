import { FC } from 'react'

import { ScheduleFilters } from '../../components/ScheduleFilters'
import { ScheduleTable } from '../../components/ScheduleTable'
import { useAppSelector } from '../../store'

export const MainFlights: FC = () => {
   const { schedules } = useAppSelector((state) => state.schedule)

   return (
      <>
         <ScheduleFilters />
         <ScheduleTable data={schedules} />
      </>
   )
}
