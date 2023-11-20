import './App.css'
import { AppLayout } from './providers/layout/layout/Layout'

import { RoutesProvider } from './providers/routes'

export function App() {
   return <RoutesProvider layout={<AppLayout />} />
}
