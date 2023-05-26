import {h, Fragment} from 'preact'
import Header from './components/Header.tsx'

export default () => (
  <>
  <Header>
    <div></div>
  </Header>
  <div className={`p-12 flex flex-col justify-center items-center h-[calc(100vh-6em)]`}>
    <img src="/assets/logo.png" alt="logo" width="100" className="mb-6"/>
    <div className="text-black font-bold">
      minizavr
    </div>
  </div>
  </>
);