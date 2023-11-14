import { Button, DatePicker, Select } from 'antd'
import { FC } from 'react'
import { useAppSelector } from '../app/utils/hooks'
import css from './ScheduleFilters.module.scss'

const sortOptions = [
   { value: 'Date-Time', label: 'Date-Time' },
   { value: 'Economy price', label: 'Economy Price' },
   { value: 'Confirmed/not-confirmed', label: 'Confirmed/not-confirmed' },
]

export const ScheduleFilters: FC = () => {
   const { airports } = useAppSelector((state) => state.airport)
   const { schedules } = useAppSelector((state) => state.schedule)

   const airportOptions = airports.map((airport) => ({
      value: airport.name,
      label: airport.name,
   }))

   const flightNumberOptions = schedules.map((schedule) => ({
      value: schedule.flightNumber,
      label: schedule.flightNumber,
   }))

   return (
      <div className={css.filters}>
         <div className={css.wrapper}>
            <Select options={airportOptions} style={{ width: 250 }} />
            <Select options={airportOptions} style={{ width: 250 }} />
            <Select options={sortOptions} style={{ width: 250 }} />
         </div>
         <div className={css.wrapper}>
            <DatePicker />
            <Select options={flightNumberOptions} style={{ width: 250 }} />
            <Button>Apply</Button>
         </div>
      </div>
   )
}
