import { Button, DatePicker, Form, Radio, Select } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../store'
import css from './Search.module.scss'

const cabinTypeOptions = [
   {
      value: 'Economy',
      label: 'Economy',
   },
   {
      value: 'Business',
      label: 'Business',
   },
   {
      value: 'First class',
      label: 'First class',
   },
]

export interface SearchFilters {
   departure?: string
   arrival?: string
   cabinType?: string
   roundTrip?: boolean
   departureDate?: Date
   returnDate?: Date
}

interface Props {
   onChange: (value: SearchFilters) => void
}

export const Search: React.FC<Props> = ({ onChange }) => {
   const [filters, setFilters] = useState<SearchFilters>({})
   const { airports } = useAppSelector((state) => state.airport)

   const airportOptions = airports.map((airport) => ({
      value: airport.name,
      label: airport.name,
   }))

   const handleSearch = () => {
      onChange(filters)
   }

   return (
      <Form className={css.filters}>
         <div className={css.wrapper}>
            <Form.Item label="Departure Airport">
               <Select
                  style={{ width: 120 }}
                  onChange={(value) =>
                     setFilters({ ...filters, departure: value })
                  }
                  options={airportOptions}
               />
            </Form.Item>

            <Form.Item label="Arrival Airport">
               <Select
                  style={{ width: 120 }}
                  onChange={(value) =>
                     setFilters({ ...filters, arrival: value })
                  }
                  options={airportOptions}
               />
            </Form.Item>

            <Form.Item label="Cabin type">
               <Select
                  style={{ width: 120 }}
                  onChange={(value) =>
                     setFilters({ ...filters, cabinType: value })
                  }
                  options={cabinTypeOptions}
               />
            </Form.Item>
         </div>
         <div className={css.wrapper}>
            <Form.Item label="Trip Type">
               <Radio.Group
                  onChange={(e) =>
                     setFilters({
                        ...filters,
                        roundTrip: e.target.value === 'roundTrip',
                     })
                  }
               >
                  <Radio value="oneWay">One way</Radio>
                  <Radio value="roundTrip">Round trip</Radio>
               </Radio.Group>
            </Form.Item>

            <Form.Item label="Departure Date">
               <DatePicker
                  onChange={(date) =>
                     setFilters({ ...filters, departureDate: date?.toDate() })
                  }
               />
            </Form.Item>

            {filters.roundTrip && (
               <Form.Item label="Return Date">
                  <DatePicker
                     onChange={(date) =>
                        setFilters({ ...filters, returnDate: date?.toDate() })
                     }
                  />
               </Form.Item>
            )}

            <Form.Item>
               <Button onClick={handleSearch}>Apply</Button>
            </Form.Item>
         </div>
      </Form>
   )
}
