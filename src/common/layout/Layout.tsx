import { FC, PropsWithChildren, ReactNode } from 'react'

import classes from './Layout.module.css'

interface Props extends PropsWithChildren {
   header: ReactNode
}

export const Layout: FC<Props> = ({ header, children }) => {
   return (
      <>
         <header className={classes['header']}>{header}</header>
         <main className={classes['main']}>{children}</main>
      </>
   )
}
