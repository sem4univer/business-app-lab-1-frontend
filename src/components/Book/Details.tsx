import { FC } from 'react'
import { DataType } from '../Search/Flights'
import css from './Details.module.scss'

const flightDetails: { label: string; value: keyof DataType }[] = [
   { label: 'From', value: 'from' },
   { label: 'To', value: 'to' },
   { label: 'Date', value: 'date' },
   { label: 'Flight number', value: 'flightNumber' },
]

interface Props {
   flight?: DataType
   cabinType: string
}

export const Details: FC<Props> = ({ flight, cabinType }) => {
   if (!flight) return null

   return (
      <div className={css.details}>
         {flightDetails.map((item) => (
            <div className={css.block} key={item.label}>
               <span>{item.label}:</span>
               <p>{String(flight[item.value])}</p>
            </div>
         ))}
         <div className={css.block}>
            <span>Cabin type:</span>
            <p>{cabinType}</p>
         </div>
      </div>
   )
}
