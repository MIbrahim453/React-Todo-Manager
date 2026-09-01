import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
 
 function Layout() {
   return (
     <div className='min-h-screen'>
        <Header />
        <div className='flex'>
            <SideBar />
            <main className='flex-1'>
                <Outlet />
            </main>
        </div>
     </div>
   )
 }
 
 export default Layout