import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from '../../../../common/layout'
import { Header } from '../header/Header'

export const AppLayout: FC = () => {
   return (
      <Layout header={<Header />}>
         <Outlet />
      </Layout>
   )
}
