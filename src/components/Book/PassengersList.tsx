import { Button, Table } from 'antd'
import { FC, useState } from 'react'
import { Values } from './PassengerForm'
import css from './PassengersList.module.scss'

const columns = [
   {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
   },
   {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
   },
   {
      title: 'Date of Birth',
      dataIndex: 'birthDate',
      key: 'birthDate',
   },
   {
      title: 'Passport Number',
      dataIndex: 'passportNumber',
      key: 'passportNumber',
   },
   {
      title: 'Passport Country',
      dataIndex: 'passportCountry',
      key: 'passportCountry',
   },
   {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
   },
]

interface Props {
   values: Values[]
   onRemove: (id: string) => void
}

export const PassengerTable: FC<Props> = ({ values, onRemove }) => {
   const [selectedPassengerId, setSelectedPassengerId] = useState<
      string | undefined
   >(undefined)

   const handleRemove = () => {
      if (selectedPassengerId) {
         onRemove(selectedPassengerId)
      }
   }

   return (
      <>
         <Table
            columns={columns}
            dataSource={values}
            rowClassName={(flight) =>
               flight.id === selectedPassengerId ? css.selected : ''
            }
            onRow={(row) => {
               return {
                  onClick: () =>
                     setSelectedPassengerId(
                        row.id !== selectedPassengerId ? row.id : undefined
                     ),
               }
            }}
         />
         <Button onClick={handleRemove} className={css.removeBtn}>
            Remove
         </Button>
      </>
   )
}
