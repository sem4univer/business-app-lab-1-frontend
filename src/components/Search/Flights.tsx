import Table, { ColumnsType } from 'antd/es/table'
import { format } from 'date-fns'
import { FC } from 'react'
import { Schedule } from '../../app/types/schedule'
import { useAppSelector } from '../../store'
import { getAirportCode } from '../../utils/get-airport-code'
import css from './Flights.module.scss'

export interface DataType {
   id: number
   key: React.Key
   date: string
   time: string
   from: string
   to: string
   flightNumber: number
   cabinPrice: number
}

const columns: ColumnsType<DataType> = [
   {
      title: 'From',
      key: 'from',
      dataIndex: 'from',
   },
   { title: 'To', key: 'to', dataIndex: 'to' },
   { title: 'Date', key: 'date', dataIndex: 'date' },
   { title: 'Time', key: 'time', dataIndex: 'time' },
   { title: 'Flight number', key: 'flightNumber', dataIndex: 'flightNumber' },
   { title: 'Cabin price', key: 'cabinPrice', dataIndex: 'cabinPrice' },
   {
      title: 'Number of stops',
      key: 'numberOfStops',
      dataIndex: 'numberOfStops',
   },
]

interface Props {
   flights: Schedule[] | null
   cabinType?: string
   selectedFlight?: DataType
   onSelectedChange: (value: DataType | null) => void
}

export const Flights: FC<Props> = ({
   flights,
   cabinType,
   selectedFlight,
   onSelectedChange,
}) => {
   const { routes } = useAppSelector((state) => state.route)
   const { airports } = useAppSelector((state) => state.airport)

   const flightsData: DataType[] =
      flights?.map((flight) => {
         const businessPrice = Math.round(flight.economyPrice * 1.35)
         const price =
            cabinType === 'Economy'
               ? flight.economyPrice
               : cabinType === 'Business'
               ? businessPrice
               : Math.round(businessPrice * 1.3)

         return {
            key: flight.id,
            id: flight.id,
            date: format(flight.date, 'dd/MM/yyyy'),
            time: format(flight.time, 'HH:mm'),
            from: getAirportCode(routes, flight.routeId, airports, {
               isFrom: true,
            }),
            to: getAirportCode(routes, flight.routeId, airports),
            flightNumber: flight.flightNumber,
            cabinPrice: price,
            numberOfStops: 0,
         }
      }) ?? []

   return (
      <div>
         <div>
            <h3>Outbound flight details</h3>
            <Table
               dataSource={flightsData}
               columns={columns}
               rowClassName={(schedule) =>
                  schedule.id === selectedFlight?.id ? css.selected : ''
               }
               onRow={(row) => {
                  return {
                     onClick: () =>
                        onSelectedChange(
                           row.id !== selectedFlight?.id ? row : null
                        ),
                  }
               }}
            />
         </div>
      </div>
   )
}
