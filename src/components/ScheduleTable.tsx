import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { format } from 'date-fns'
import { FC, useMemo } from 'react'
import { Schedule } from '../app/types/schedule'
import { useAppSelector } from '../app/utils/hooks'

interface DataType {
   key: React.Key
   date: string
   time: string
   from: string
   to: string
   flightNumber: number
   aircraft?: string
   economyPrice: number
   businessPrice: number
   firstClassPrice: number
}

const scheduleColumns: ColumnsType<DataType> = [
   { title: 'Date', key: 'date', dataIndex: 'date' },
   { title: 'Time', key: 'time', dataIndex: 'time' },
   {
      title: 'From',
      key: 'from',
      dataIndex: 'from',
   },
   { title: 'To', key: 'to', dataIndex: 'to' },
   { title: 'Flight number', key: 'flightNumber', dataIndex: 'flightNumber' },
   { title: 'Aircraft', key: 'aircraft', dataIndex: 'aircraft' },
   { title: 'Economy price', key: 'economyPrice', dataIndex: 'economyPrice' },
   {
      title: 'Business price',
      key: 'businessPrice',
      dataIndex: 'businessPrice',
   },
   {
      title: 'First class price',
      key: 'firstClassPrice',
      dataIndex: 'firstClassPrice',
   },
]

interface Props {
   data: Schedule[]
}

export const ScheduleTable: FC<Props> = ({ data }) => {
   const { routes } = useAppSelector((state) => state.route)
   const { airports } = useAppSelector((state) => state.airport)
   const { aircrafts } = useAppSelector((state) => state.aircraft)

   const schedules: DataType[] = useMemo(() => {
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

      return data.map((schedule) => {
         const businessPrice = Math.round(schedule.economyPrice * 1.35)
         const firstClassPrice = Math.round(businessPrice * 1.3)

         return {
            key: schedule.id,
            id: schedule.id,
            date: format(schedule.date, 'dd/MM/yyyy'),
            time: format(schedule.time, 'HH:mm'),
            from: getAirportCode(schedule.routeId, { isFrom: true }),
            to: getAirportCode(schedule.routeId),
            flightNumber: schedule.flightNumber,
            aircraft: getAircraft(schedule.aircraftId),
            economyPrice: schedule.economyPrice,
            businessPrice,
            firstClassPrice,
         }
      })
   }, [aircrafts, airports, data, routes])

   return <Table dataSource={schedules} columns={scheduleColumns} />
}
