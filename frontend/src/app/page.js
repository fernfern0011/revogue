import styles from './page.module.css'
import Navbar from './components/Navbar'
import VerticalCarousel from './components/ItemPage'

export default function Home() {
  return (
    <main className={styles.main}>

      <Navbar />

      <VerticalCarousel />

    </main>
  )
}
