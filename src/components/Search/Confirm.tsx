import { Button } from 'antd'
import Input from 'antd/es/input/Input'
import { ChangeEventHandler, FC, useState } from 'react'
import { Link } from 'react-router-dom'
import css from './Confirm.module.scss'

interface Props {
   onConfirm: (value: number) => void
}

export const Confirm: FC<Props> = ({ onConfirm }) => {
   const [passengers, setPassengers] = useState(1)

   const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = Number(e.target.value)

      if (value > 0) {
         setPassengers(value)
      }
   }

   return (
      <div className={css.confirm}>
         <div className={css.passengers}>
            <span>Passengers</span>
            <Input
               width="100px"
               type="number"
               value={passengers}
               onChange={handleChange}
            />
         </div>
         <Link to="/book">
            <Button onClick={() => onConfirm(passengers)}>Book Flight</Button>
         </Link>
      </div>
   )
}
