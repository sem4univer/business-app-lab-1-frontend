import { FC } from 'react'
import { ScheduleTable } from '../../components/ScheduleTable'
import { useAppSelector } from '../../app/utils/hooks'

export const MainFlights: FC = () => {
   const { schedules } = useAppSelector((state) => state.schedule)

   return (
      <>
         <ScheduleTable schedules={schedules} />
      </>
   )
}
