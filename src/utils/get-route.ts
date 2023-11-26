import { Route } from '../app/types/schedule'

export function getRoute(routes: Route[], routeId: number) {
   return routes.find((s) => s.id === routeId)
}
