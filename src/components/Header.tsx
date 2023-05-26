import {h, Fragment, JSX} from 'preact'

interface HeaderProps {
  children: JSX.Element | JSX.Element[];
}

export default ({ children }: HeaderProps) => (
  <header className="h-5 bg-black">
    {children}
  </header>
);