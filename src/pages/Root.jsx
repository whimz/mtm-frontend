import { Outlet } from "react-router-dom"
import MainNavigation from "../components/nav/MainNavigation"
import Footer from '../components/layout/footer/Footer'
import Main from "../components/layout/main/Main"

export default function RootLayout(){
  return(
    <>
      <MainNavigation />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  )
}