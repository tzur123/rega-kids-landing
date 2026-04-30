import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './FaqSection.module.css'

const FAQS = [
  {
    q: 'מה זה רגע קידס?',
    a: 'רגע קידס הוא שירות מנוי לתוכן ילדים ומשפחה של רגע TV. בפלטפורמה תמצאו עשרות סרטים וסדרות, מפגשי לייב, חדרי צ\'אט מפוקחים, פורומים ודפי תוכן – הכל במקום אחד, בכל מכשיר.',
  },
  {
    q: 'כמה זה עולה?',
    a: 'המנוי עולה 50 ₪ לחודש לכלל התכנים. המחיר קבוע לכל החיים לכל מי שמצטרף עכשיו. החודש הראשון הוא חינם לגמרי – ללא חיוב.',
  },
  {
    q: 'אילו תכנים יש לילדים?',
    a: 'ספריית הילדים כוללת עשרות סרטי אנימציה, סדרות הרפתקאות, תכניות חינוכיות ותוכן מותאם לכל הגילאים – מגיל הגן ועד בני נוער. כל התכנים נבחרים בקפידה.',
  },
  {
    q: 'האם חדרי הצ\'אט בטוחים לילדים?',
    a: 'כן. כל חדרי הצ\'אט והפורומים מפוקחים ומנוהלים עם מנגנוני סינון ובקרה. הסביבה הדיגיטלית בטוחה ומתאימה לילדים.',
  },
  {
    q: 'באילו מכשירים ניתן לצפות?',
    a: 'ניתן לצפות בטלוויזיות חכמות (Samsung, LG, Sony, Android TV ועוד), בסמארטפונים וטאבלטים (iOS ו-Android), ובמחשב דרך הדפדפן. ניתן להתקין על כמה מכשירים שרוצים.',
  },
  {
    q: 'איך מבטלים את המנוי?',
    a: 'ביטול פשוט ומיידי – בלחיצת כפתור אחד מתוך האפליקציה או האתר. אין עלות ביטול, אין קנסות, ואין התחייבויות.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className={`section ${styles.section}`} id="faq">
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">שאלות נפוצות</div>
          <h2 className="section-title">הדברים שחשוב לדעת</h2>
        </div>

        <div className={styles.list}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={styles.chevron}
                  style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              {open === i && (
                <div className={styles.answer}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
