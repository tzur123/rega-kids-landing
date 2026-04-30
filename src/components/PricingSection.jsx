import { Check, ArrowLeft } from 'lucide-react'
import styles from './PricingSection.module.css'

const FEATURES = [
  'ללא הגבלת מכשירים',
  'חודש ניסיון חינם – ללא חיוב',
  'כל סרטי הילדים והסדרות',
  'מפגשי לייב ואינטראקציה',
  'חדרי צ\'אט ופורומים',
  'דפי תוכן ועבודה חינוכיים',
  'ביטול בלחיצת כפתור, ללא קנסות',
  'מחיר קבוע לכל החיים',
]

export default function PricingSection({ onRegister }) {
  return (
    <section className={`section ${styles.section}`} id="pricing">
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">תמחור</div>
          <h2 className="section-title">מחיר אחד. <span className={styles.accent}>הכל כלול.</span></h2>
          <p className="section-sub">
            לא צריך לבחור חבילה – תוכנית אחת פשוטה עם כל מה שצריך.
          </p>
        </div>

        <div className={styles.cardWrap}>
          {/* Glow decoration */}
          <div className={styles.cardGlow} />

          <div className={styles.card}>
            <div className={styles.topRow}>
              <div>
                <div className={styles.planName}>רגע קידס</div>
                <div className={styles.planSub}>כל הפיצ'רים כלולים</div>
              </div>
              <div className={styles.trialBadge}>חודש חינם</div>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.currency}>₪</span>
              <span className={styles.price}>50</span>
              <span className={styles.period}>לחודש</span>
            </div>
            <p className={styles.priceNote}>מחיר קבוע לכל החיים למצטרפים עכשיו</p>

            <div className={styles.divider} />

            <ul className={styles.featureList}>
              {FEATURES.map((f, i) => (
                <li key={i} className={styles.featureItem}>
                  <Check size={15} strokeWidth={2.5} className={styles.featureCheck} />
                  {f}
                </li>
              ))}
            </ul>

            <button className={`btn-gold ${styles.cta}`} onClick={onRegister}>
              קבלו חודש ניסיון חינם
              <ArrowLeft size={17} />
            </button>

            <p className={styles.fine}>
              המחיר קבוע לכל החיים · ללא הפתעות בחשבונית
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
