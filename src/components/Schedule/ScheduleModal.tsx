import { Button, DatePicker, Form, InputNumber, Modal, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { FC } from 'react'
import { Schedule } from '../../app/types/schedule'
import { useAppDispatch } from '../../store'
import { scheduleActions } from '../../store/slices/schedule'
import { DataType } from './ScheduleTable'

interface Props {
   isModalOpen: boolean
   selectedSchedule: DataType | null
   onModalOpenedChange: (value: boolean) => void
}

export const ScheduleModal: FC<Props> = ({
   isModalOpen,
   selectedSchedule,
   onModalOpenedChange,
}) => {
   const dispatch = useAppDispatch()

   const handleFormFinish = (values: Schedule[]) => {
      dispatch(
         scheduleActions.updateSchedule({
            id: selectedSchedule?.id,
            ...values,
         })
      )
      onModalOpenedChange(false)
   }
   return (
      <Modal
         title="Edit Flight"
         open={isModalOpen}
         okButtonProps={{ style: { display: 'none' } }}
         cancelButtonProps={{ style: { display: 'none' } }}
      >
         <Form
            initialValues={{
               date: dayjs(selectedSchedule?.date, 'DD/MM/YYYY'),
               time: dayjs(selectedSchedule?.time, 'HH:mm'),
               economyPrice: selectedSchedule?.economyPrice,
            }}
            onFinish={handleFormFinish}
         >
            <Form.Item name="date" label="Date">
               <DatePicker />
            </Form.Item>
            <Form.Item name="time" label="Time">
               <TimePicker />
            </Form.Item>
            <Form.Item name="economyPrice" label="Economy Price">
               <InputNumber />
            </Form.Item>
            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Save
               </Button>
            </Form.Item>
         </Form>
      </Modal>
   )
}
