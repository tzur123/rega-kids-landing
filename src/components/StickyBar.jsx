import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import styles from './StickyBar.module.css'

export default function StickyBar({ onRegister }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className={`${styles.bar} ${show ? styles.visible : ''}`}>
      <span className={styles.text}>
        <strong>רגע קידס</strong> – כל עולם הילדים ב-50 ₪ לחודש
      </span>
      <button className="btn-gold" onClick={onRegister} style={{ padding: '12px 28px', fontSize: '15px' }}>
        חינם לחודש הראשון
        <ArrowLeft size={15} />
      </button>
    </div>
  )
}
