import { FC, PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
   header: ReactNode;
   footer: ReactNode;
}

export const Layout: FC<Props> = ({ header, children, footer }) => {
   return (
      <>
         <header>{header}</header>
         <main>{children}</main>
         <footer>{footer}</footer>
      </>
   )
}
