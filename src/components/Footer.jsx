import { ArrowLeft } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer({ onRegister }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
          <a
            href="https://rega.org.il/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logos}
            aria-label="עבור לאתר רגע TV"
          >
            <img src="/rega-tv-logo.svg" alt="רגע TV" className={styles.logo} />
            <span className={styles.div} />
            <img src="/kids-logo.svg" alt="Kids" className={styles.logoKids} />
          </a>
            <p className={styles.tagline}>
              עולם התוכן לילדים ולמשפחה – פרימיום, בטוח ומהנה.
            </p>
          </div>

          <div className={styles.cta}>
            <p className={styles.ctaText}>מוכנים להתחיל?</p>
            <button className="btn-gold" onClick={onRegister}>
              חודש חינם – הצטרפו עכשיו
              <ArrowLeft size={16} />
            </button>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2026 רגע TV. כל הזכויות שמורות.</p>
          <div className={styles.links}>
            <a href="#">תנאי שימוש</a>
            <span>·</span>
            <a href="#">מדיניות פרטיות</a>
            <span>·</span>
            <a href="mailto:support@rega.org.il">יצרו קשר</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
