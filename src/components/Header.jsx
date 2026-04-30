import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import styles from './Header.module.css'

export default function Header({ onRegister }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a
          href="https://rega.org.il/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logos}
          aria-label="עבור לאתר רגע TV"
        >
          <img src="/rega-tv-logo.svg" alt="רגע TV" className={styles.logo} />
          <span className={styles.logoDivider} />
          <img src="/kids-logo.svg" alt="Kids" className={styles.logoKids} />
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <a href="#content" onClick={() => setMenuOpen(false)}>תכנים</a>
          <a href="#devices" onClick={() => setMenuOpen(false)}>מכשירים</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>מחיר</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>שאלות</a>
        </nav>

        <div className={styles.actions}>
          <a
            href="https://rega.org.il/subscriber/login?redirect=/"
            className={styles.loginBtn}
          >
            כניסה
          </a>
          <button className={`btn-primary ${styles.registerBtn}`} onClick={onRegister}>
            הצטרפו חינם
          </button>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="תפריט"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}
