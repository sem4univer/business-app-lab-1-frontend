import { FC, ReactNode } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Auf } from '../../../pages/auf/Auf'
import { BookFlights } from '../../../pages/bookFlights/BookFlights'
import { ConfirmFlight } from '../../../pages/confirm/ConfirmFlight'
import { MainFlights } from '../../../pages/mainFlights/MainFlights'
import { Profile } from '../../../pages/profile/Header'
import { SearchFlights } from '../../../pages/searchFlights/SearchFlights'

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
               path: '/search',
               element: <SearchFlights />,
            },
            {
               path: '/book',
               element: <BookFlights />,
            },
            {
               path: '/confirm',
               element: <ConfirmFlight />,
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
