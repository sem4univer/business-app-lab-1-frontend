import { Button, DatePicker, Select } from 'antd'
import { FC, useState } from 'react'

import { useAppSelector } from '../../store'
import css from './ScheduleFilters.module.scss'

const sortOptions = [
   { value: 'Date-Time', label: 'Date-Time' },
   { value: 'Economy price', label: 'Economy Price' },
   { value: 'Confirmed/not-confirmed', label: 'Confirmed/not-confirmed' },
]

export interface Filters {
   from?: string
   to?: string
   sortBy?: string
   date?: Date
   flightNumber?: number
}

interface Props {
   onChange: (value: Filters) => void
}

export const ScheduleFilters: FC<Props> = ({ onChange }) => {
   const [filters, setFilters] = useState<Filters>({})
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
            <Select
               onChange={(value) => setFilters({ ...filters, from: value })}
               options={airportOptions}
               style={{ width: 250 }}
            />
            <Select
               onChange={(value) => setFilters({ ...filters, to: value })}
               options={airportOptions}
               style={{ width: 250 }}
            />
            <Select
               onChange={(value) => setFilters({ ...filters, sortBy: value })}
               options={sortOptions}
               style={{ width: 250 }}
            />
         </div>
         <div className={css.wrapper}>
            <DatePicker
               onChange={(value) =>
                  setFilters({ ...filters, date: value?.toDate() })
               }
            />
            <Select options={flightNumberOptions} style={{ width: 250 }} />
            <Button onClick={() => onChange(filters)}>Apply</Button>
         </div>
      </div>
   )
}
