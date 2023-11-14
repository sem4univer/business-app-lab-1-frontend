import { FC } from 'react'
import { useAppSelector } from '../../app/utils/hooks'
import { ScheduleFilters } from '../../components/ScheduleFilters'
import { ScheduleTable } from '../../components/ScheduleTable'

export const MainFlights: FC = () => {
   const { schedules } = useAppSelector((state) => state.schedule)

   return (
      <>
         <ScheduleFilters />
         <ScheduleTable data={schedules} />
      </>
   )
}
