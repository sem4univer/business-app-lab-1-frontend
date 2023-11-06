export interface Schedule {
   id: number
   date: Date
   time: Date
   aircraftId: number
   routeId: number
   flightNumber: number
   economyPrice: number
   confirmed: boolean
}

export interface Aircraft {
   id: number
   name: string
   makeModel: string
   totalSeats: number
   economySeats: number
   businessSeats: number
}

export interface Route {
   id: number
   departureAirportId: number
   arrivalAirportId: number
   distance: number
   flightTime: Date
}

export interface Airport {
   id: number
   countryId: number
   IATACode: string
   name: string
}

export interface Country {
   id: number
   name: string
}

export interface Office {
   id: number
   countryId: number
   title: string
   phone: number
   contact: string
}
