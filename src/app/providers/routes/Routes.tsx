import { FC, ReactNode } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Auf } from '../../../pages/auf/Auf'
import { MainFlights } from '../../../pages/mainFlights/MainFlights'
import { Profile } from '../../../pages/profile/Header'

const getRouter = (layout: ReactNode) =>
   createBrowserRouter([
      {
         path: '/',
         element: layout,
         children: [
            {
               path: 'auth',
               element: <Auf />,
            },
            {
               path: '/',
               element: <MainFlights />,
            },
            {
               path: 'profile',
               element: <Profile />,
            },
         ],
      },
   ])

interface Props {
   layout: ReactNode
}

export const RoutesProvider: FC<Props> = ({ layout }) => {
   const router = getRouter(layout)

   return <RouterProvider router={router} />
}
