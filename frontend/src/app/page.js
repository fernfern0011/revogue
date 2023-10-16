import styles from './page.module.css'
import Navbar from './components/Navbar'
import ItemPage from './components/ItemPage'

export default function Home() {
  return (
    <main className={styles.main}>

      <Navbar />

      <ItemPage />

    </main>
  )
}
