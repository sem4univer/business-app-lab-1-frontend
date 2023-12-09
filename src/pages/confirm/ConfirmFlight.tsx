import { Button, Radio } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { flightActions } from '../../store/slices/flight'
import css from './ConfirmFlight.module.scss'

export const ConfirmFlight = () => {
   const { flight } = useAppSelector((state) => state.flight)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const [paymentMethod, setPaymentMethod] = useState('')

   const handleTicketsIssue = () => {
      if (!paymentMethod) return
      dispatch(flightActions.issueTickets({ paymentMethod }))
      navigate('/search')
   }

   return (
      <div className={css.confirm}>
         <div className={css.amount}>
            <span>Total amount:</span>
            {flight.outbound?.cabinPrice && flight.return?.cabinPrice && (
               <p>
                  {flight.passengers *
                     (flight.outbound?.cabinPrice + flight.return?.cabinPrice)}
                  $
               </p>
            )}
         </div>
         <div className={css.payment}>
            <span style={{ marginRight: '8px' }}>Paid using:</span>
            <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)}>
               <Radio value="creditCard">Credit Card</Radio>
               <Radio value="cash">Cash</Radio>
               <Radio value="voucher">Voucher</Radio>
            </Radio.Group>
         </div>
         <div className={css.actions}>
            <Button onClick={handleTicketsIssue}>Issue tickets</Button>
            <Link to="/book">
               <Button>Cancel</Button>
            </Link>
         </div>
      </div>
   )
}
