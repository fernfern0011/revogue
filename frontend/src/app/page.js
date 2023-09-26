// import Image from 'next/image'
// import styles from './page.module.css'
import  Contact  from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
   <main>
      <div className='contact-form'>
        <Contact/>
        <Footer />
      </div>
    </main>
  )
}
