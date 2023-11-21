import { FC } from 'react'

import { Button, Card, Flex, Input } from 'antd'
import classes from './AufForm.module.css'

export const AufForm: FC = () => {
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
                  <Input placeholder={'Login'} />
                  <Input placeholder={'Passwaod'} />
               </Flex>
               <Button>Зайти</Button>
            </Flex>
         </Card>
      </div>
   )
}
