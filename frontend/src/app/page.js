// import Image from 'next/image'
// import styles from './page.module.css'
import  Contact  from './components/Contact'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar/Sidebar'


export default function Home() {
  return (
   <main>
      <div className='container'>
        <div className="app-container">
          <Contact />
          <Sidebar />
        </div>
        <Footer/>
    </div>
    </main>
  )
}

