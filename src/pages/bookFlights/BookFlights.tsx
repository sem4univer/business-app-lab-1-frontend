import { Button } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Details } from '../../components/Book/Details'
import { PassengerForm, Values } from '../../components/Book/PassengerForm'
import { PassengerTable } from '../../components/Book/PassengersList'
import { useAppSelector } from '../../store'
import css from './BookFlights.module.scss'

export const BookFlights = () => {
   const { flight } = useAppSelector((state) => state.flight)
   const [passengersList, setPassengersList] = useState<Values[]>([])

   const handleRemove = (id: string) => {
      setPassengersList(passengersList.filter((p) => p.id !== id))
   }

   return (
      <div className={css.booking}>
         <h3>Outbound flight</h3>

         <Details flight={flight.outbound} cabinType={flight.cabinType} />

         <h3>Return flight</h3>

         {flight.return && (
            <Details flight={flight.return} cabinType={flight.cabinType} />
         )}

         <h3>Passengers list</h3>
         {passengersList.length < flight.passengers && (
            <PassengerForm
               onSubmit={(values) =>
                  setPassengersList((cur) => [...cur, values])
               }
            />
         )}

         <PassengerTable values={passengersList} onRemove={handleRemove} />

         <div className={css.buttons}>
            <Link to="/search">
               <Button>Back to search for flights</Button>
            </Link>
            {passengersList.length === flight.passengers && (
               <Link to="/confirm">
                  <Button type="primary">Confirm Booking</Button>
               </Link>
            )}
         </div>
      </div>
   )
}
