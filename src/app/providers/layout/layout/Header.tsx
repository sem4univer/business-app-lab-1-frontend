import { FC } from 'react'
import { Layout } from '../../../../common/layout'
import { Outlet } from 'react-router-dom'
import { Footer } from '../footer/Header'
import { Header } from '../header/Header'

export const AppLayout: FC = () => {
   return (
      <Layout footer={<Footer />} header={<Header />}>
         <Outlet />
      </Layout>
   )
}
