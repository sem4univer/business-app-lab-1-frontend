import { Button, DatePicker, Form, Input, Select } from 'antd'
import { format } from 'date-fns'
import { Dayjs } from 'dayjs'
import { FC, useState } from 'react'
import css from './PassengerForm.module.scss'

const { Option } = Select

export interface Values {
   id?: string
   key?: string
   firstName?: string
   lastName?: string
   birthDate?: string
   passportNumber?: string
   passportCountry?: string
   phone?: string
}

interface Props {
   onSubmit: (value: Values) => void
}

export const PassengerForm: FC<Props> = ({ onSubmit }) => {
   const [values, setValues] = useState<Values>({})

   const handleChange = (name: string, value: string) => {
      setValues({ ...values, [name]: value })
      console.log(values, name, value)
   }

   const handleDateChange = (date: Dayjs | null, dateString: string) => {
      setValues({
         ...values,
         birthDate: date ? format(date?.toDate(), 'dd/MM/yyyy') : undefined,
      })
   }

   const handleSumbit = () => {
      onSubmit({
         ...values,
         id: values.passportNumber,
         key: values.passportNumber,
      })
   }

   return (
      <Form style={{ padding: '10px 20px' }} onFinish={handleSumbit}>
         <div className={css.wrapper}>
            <Form.Item
               label="First Name"
               name="firstName"
               rules={[
                  { required: true, message: 'Please enter your first name!' },
               ]}
            >
               <Input
                  onChange={(e) => handleChange('firstName', e.target.value)}
               />
            </Form.Item>

            <Form.Item
               label="Last Name"
               name="lastName"
               rules={[
                  { required: true, message: 'Please enter your last name!' },
               ]}
            >
               <Input
                  onChange={(e) => handleChange('lastName', e.target.value)}
               />
            </Form.Item>

            <Form.Item
               label="Date of Birth"
               name="dateOfBirth"
               rules={[
                  {
                     required: true,
                     message: 'Please select your date of birth!',
                  },
               ]}
            >
               <DatePicker onChange={handleDateChange} />
            </Form.Item>
         </div>

         <div className={css.wrapper}>
            <Form.Item
               label="Passport Number"
               name="passportNumber"
               rules={[
                  {
                     required: true,
                     message: 'Please enter your passport number!',
                  },
               ]}
            >
               <Input
                  onChange={(e) =>
                     handleChange('passportNumber', e.target.value)
                  }
               />
            </Form.Item>

            <Form.Item
               label="Passport Country"
               name="passportCountry"
               rules={[
                  {
                     required: true,
                     message: 'Please select your passport country!',
                  },
               ]}
            >
               <Select
                  style={{ width: '120px' }}
                  onChange={(value) => handleChange('passportCountry', value)}
               >
                  <Option value="ru">Russia</Option>
                  <Option value="us">United States</Option>
                  <Option value="uk">United Kingdom</Option>
               </Select>
            </Form.Item>

            <Form.Item
               label="Phone Number"
               name="phoneNumber"
               rules={[
                  {
                     required: true,
                     message: 'Please enter your phone number!',
                  },
               ]}
            >
               <Input
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
               />
            </Form.Item>
         </div>

         <Form.Item>
            <Button type="primary" htmlType="submit">
               Add Passenger
            </Button>
         </Form.Item>
      </Form>
   )
}
