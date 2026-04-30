import { useEffect, useState } from 'react'
import { ArrowLeft, Play } from 'lucide-react'
import styles from './Hero.module.css'

function useCountdown(targetDate) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetDate) - new Date())
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function CountUnit({ value, label }) {
  const s = String(value).padStart(2, '0')
  return (
    <div className={styles.unit}>
      <div className={styles.digits}>
        <span className={styles.digit}>{s[0]}</span>
        <span className={styles.digit}>{s[1]}</span>
      </div>
      <span className={styles.unitLabel}>{label}</span>
    </div>
  )
}

export default function Hero({ onRegister }) {
  const time = useCountdown('2026-05-15T23:59:59')

  return (
    <section className={styles.hero}>
      {/* Gradient layers */}
      <div className={styles.bgBase} />
      <div className={styles.bgGlow} />
      <div className={styles.bgGrid} />
      <div className={styles.bgFade} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Play size={12} fill="currentColor" />
            <span>חודש ניסיון חינם · בלי התחייבות</span>
          </div>

          <h1 className={styles.title}>
            כל עולם<br />
            <span className={styles.titleAccent}>הילדים שלכם</span><br />
            במקום אחד
          </h1>

          <p className={styles.sub}>
            סרטים, סדרות, מפגשי לייב, חדרי צ'אט ועוד –<br />
            תוכן ילדים פרימיום ב-50 ₪ בחודש
          </p>

          {/* Countdown */}
          <div className={styles.countdownWrap}>
            <p className={styles.countdownLabel}>ההצעה זמינה עד ה-15 במאי</p>
            <div className={styles.countdown}>
              <CountUnit value={time.days}    label="ימים"  />
              <span className={styles.sep}>:</span>
              <CountUnit value={time.hours}   label="שעות"  />
              <span className={styles.sep}>:</span>
              <CountUnit value={time.minutes} label="דקות"  />
              <span className={styles.sep}>:</span>
              <CountUnit value={time.seconds} label="שניות" />
            </div>
          </div>

          <div className={styles.ctas}>
            <button className="btn-gold" onClick={onRegister}>
              קבלו חודש ניסיון חינם
              <ArrowLeft size={18} />
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}>
              <Play size={15} />
              גלו את התכנים
            </button>
          </div>

          <p className={styles.fine}>
            לא נדרשת כרטיס אשראי עד לאחר חודש הניסיון · ביטול בכל עת
          </p>
        </div>

        {/* Mockup visual */}
        <div className={styles.visual}>
          <div className={styles.mockupGlow} />
          <img
            className={styles.mockupMain}
            src="/mockup/mockup-tablet-1.png"
            alt="רגע קידס על מכשירים"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <img
            className={styles.mockupFloat}
            src="/mockup/mockup-phone-1.png"
            alt=""
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>
      </div>
    </section>
  )
}
