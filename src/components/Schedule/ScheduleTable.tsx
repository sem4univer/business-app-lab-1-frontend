import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { format } from 'date-fns'
import { FC } from 'react'
import { Schedule } from '../../app/types/schedule'
import { useAppDispatch, useAppSelector } from '../../store'
import { scheduleActions } from '../../store/slices/schedule'
import { getAircraft } from '../../utils/get-aircraft'
import { getAirportCode } from '../../utils/get-airport-code'
import css from './ScheduleTable.module.scss'

export interface DataType {
   id: number
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
   confirmed: boolean
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
   selectedSchedule: DataType | null
   onModalOpenedChange: (value: boolean) => void
   onSelectedScheduleChange: (value: DataType | null) => void
}

export const ScheduleTable: FC<Props> = ({
   data,
   selectedSchedule,
   onModalOpenedChange,
   onSelectedScheduleChange,
}) => {
   const { routes } = useAppSelector((state) => state.route)
   const { airports } = useAppSelector((state) => state.airport)
   const { aircrafts } = useAppSelector((state) => state.aircraft)
   const dispatch = useAppDispatch()

   let schedules: DataType[] = data.map((schedule) => {
      const businessPrice = Math.round(schedule.economyPrice * 1.35)
      const firstClassPrice = Math.round(businessPrice * 1.3)

      return {
         key: schedule.id,
         id: schedule.id,
         date: format(schedule.date, 'dd/MM/yyyy'),
         time: format(schedule.time, 'HH:mm'),
         from: getAirportCode(routes, schedule.routeId, airports, {
            isFrom: true,
         }),
         to: getAirportCode(routes, schedule.routeId, airports),
         flightNumber: schedule.flightNumber,
         aircraft: getAircraft(aircrafts, schedule.aircraftId),
         economyPrice: schedule.economyPrice,
         businessPrice,
         firstClassPrice,
         confirmed: schedule.confirmed,
      }
   })

   const handleCancel = () => {
      if (selectedSchedule) {
         dispatch(
            scheduleActions.setConfirmed({
               id: selectedSchedule.id,
               confirmed: !selectedSchedule.confirmed,
            })
         )
         onSelectedScheduleChange(null)
      }
   }

   const handleEdit = () => {
      if (selectedSchedule) {
         onModalOpenedChange(true)
      }
   }

   return (
      <>
         <Table
            dataSource={schedules}
            columns={scheduleColumns}
            rowClassName={(schedule) =>
               schedule.id === selectedSchedule?.id
                  ? css.selected
                  : !schedule.confirmed
                  ? css.unconfirmed
                  : ''
            }
            onRow={(row) => {
               return {
                  onClick: () =>
                     onSelectedScheduleChange(
                        row.id !== selectedSchedule?.id ? row : null
                     ),
               }
            }}
         />
         <Button onClick={handleCancel}>Cancel Flight</Button>
         <Button onClick={handleEdit}>Edit Flight</Button>
      </>
   )
}
