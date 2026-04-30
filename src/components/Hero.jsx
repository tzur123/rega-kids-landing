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
      <div className={styles.unitValue}>{s}</div>
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
          <h1 className={styles.title}>
            כל עולם<br />
            <span className={styles.titleAccent}>הילדים שלכם</span><br />
            במקום אחד
          </h1>

          <div className={styles.badge}>
            <Play size={12} fill="currentColor" />
            <span>חודש ניסיון חינם · בלי התחייבות</span>
          </div>

          <p className={styles.sub}>
            <span className={styles.subLine}>סרטים, סדרות, מפגשי לייב, פורומים, צ'אט ועוד!</span>
            <span className={styles.subLine}>
              <span className={styles.subLinePart}>תוכן ילדים פרימיום</span>
              <span className={styles.subLinePart}>עכשיו רק ב-<span className={styles.subPrice}>50 ₪</span> בחודש</span>
            </span>
          </p>

          {/* Countdown */}
          <div className={styles.countdownWrap}>
            <p className={styles.countdownLabel}>המבצע עוד מעט נגמר - מהרו להירשם</p>
            <div className={styles.countdown}>
              <CountUnit value={time.days} label="ימים" />
              <CountUnit value={time.hours} label="שעות" />
              <CountUnit value={time.minutes} label="דקות" />
              <CountUnit value={time.seconds} label="שניות" />
            </div>
          </div>

          <div className={styles.ctas}>
            <button className="btn-gold" onClick={onRegister}>
              קבלו חודש ניסיון חינם
              <ArrowLeft size={18} />
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}>
              גלו את התכנים
              <Play size={15} />
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
