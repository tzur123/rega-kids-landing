import { Check, ArrowLeft } from 'lucide-react'
import styles from './DevicesSection.module.css'

const ITEMS = [
  'טלוויזיות חכמות – Samsung, LG, Sony, Android TV ועוד',
  'סמארטפונים וטאבלטים – iOS ו-Android',
  'מחשב – דפדפן כרום, Edge, ספארי ועוד',
  'כמה מכשירים במקביל – לכל בני המשפחה',
]

export default function DevicesSection({ onRegister }) {
  return (
    <section className={`section ${styles.section}`} id="devices">
      <div className="container">
        <div className={styles.inner}>

          <div className={styles.mockupWrap}>
            <div className={styles.glow} />
            <img
              src="/mockup/mockup-tablet-1.png"
              alt="צפייה על כל מכשיר"
              className={styles.imgMain}
              onError={e => { e.currentTarget.style.opacity = '0' }}
            />
            <img
              src="/mockup/mockup-phone-1.png"
              alt=""
              className={styles.imgFloat}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </div>

          <div className={styles.text}>
            <div className="section-label">נגיש מכל מקום</div>
            <h2 className="section-title">צפו בכל מכשיר,<br />בכל מקום</h2>
            <p className="section-sub">
              אפליקציה אחת על כל המסכים שלכם. ללא הגבלה, ללא עלות נוספת.
            </p>
            <ul className={styles.list}>
              {ITEMS.map((item, i) => (
                <li key={i} className="check-item">
                  <Check size={16} className="icon" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className={`btn-primary ${styles.cta}`} onClick={onRegister}>
              התחילו עכשיו
              <ArrowLeft size={16} />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
