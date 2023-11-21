import { FC, useCallback, useEffect, useState } from 'react'

import { Button, Card, Flex, Input, Spin } from 'antd'

import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store'
import { FetchStatus } from '../../../store/slices/_common'
import {
   fetchLoginUser,
   selectUserFetchStatus,
} from '../../../store/slices/user'
import classes from './AufForm.module.css'

export const AufForm: FC = () => {
   const navigate = useNavigate()

   const fetchStatus = useAppSelector(selectUserFetchStatus)

   const [userData, setUserData] = useState({
      email: 'j.doe@amonic.com',
      password: '123',
   })

   const dispatch = useAppDispatch()

   const login = useCallback(() => {
      dispatch(fetchLoginUser(userData))
   }, [dispatch, userData])

   useEffect(() => {
      if (fetchStatus === FetchStatus['SUCCEEDED']) {
         // redirect;
         navigate('/profile')
      }
   }, [navigate, fetchStatus])

   return (
      <div className={classes['container']}>
         <Card
            title={'Вход в систему'}
            style={{
               width: 500,
            }}
         >
            <Flex vertical={true} gap={20}>
               <Flex vertical={true} gap={8}>
                  <Input
                     value={'j.doe@amonic.com'}
                     placeholder={'Email'}
                     onChange={(e) =>
                        setUserData((prev) => ({
                           ...prev,
                           email: e.target.value,
                        }))
                     }
                  />
                  <Input
                     value={'123'}
                     type={'password'}
                     placeholder={'Passwaod'}
                     onChange={(e) =>
                        setUserData((prev) => ({
                           ...prev,
                           password: e.target.value,
                        }))
                     }
                  />
               </Flex>
               <Button onClick={login}>Зайти</Button>
               {fetchStatus === FetchStatus.LOADING && <Spin />}
            </Flex>
         </Card>
      </div>
   )
}
