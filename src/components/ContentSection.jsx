import { Film, Radio, MessageSquare, BookOpen, Users, ShieldCheck } from 'lucide-react'
import styles from './ContentSection.module.css'

const CYAN = '#00f1ff'

const CARDS = [
  {
    icon: <Film size={28} />,
    title: 'סרטים וסדרות',
    desc: 'עשרות כותרים לילדים ולמשפחה – מסרטי אנימציה ועד הרפתקאות, מעודכנים כל הזמן.',
  },
  {
    icon: <Radio size={28} />,
    title: 'מפגשי לייב',
    desc: 'שידורים חיים עם יוצרי תוכן, סטוריטלרים ואנשי חינוך מהטובים בישראל.',
  },
  {
    icon: <MessageSquare size={28} />,
    title: 'חדרי צ\'אט',
    desc: 'סביבה בטוחה ומפוקחת לשיחות בין ילדים – כי קהילה חשובה לא פחות מתוכן.',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'דפי תוכן ועבודה',
    desc: 'חומרי לימוד, משחקים חינוכיים ופעילויות יצירתיות שמשלימות את חוויית הצפייה.',
  },
  {
    icon: <Users size={28} />,
    title: 'פורומים ייחודיים',
    desc: 'מקום שבו ילדים משתפים, דנים ומגלים תכנים חדשים יחד – קהילה אמיתית.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'בטוח ומאובטח',
    desc: 'כל התכנים נבדקים ומאושרים. סביבה דיגיטלית בטוחה שהורים יכולים לסמוך עליה.',
  },
]

export default function ContentSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">מה תמצאו</div>
          <h2 className="section-title">הכל כלול ב<span className={styles.accent}>רגע קידס</span></h2>
          <p className="section-sub">
            לא צריך לבחור – כל הפיצ'רים, כל התכנים, תוכנית אחת פשוטה.
          </p>
        </div>

        <div className={styles.grid}>
          {CARDS.map((card, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIcon}>
                {card.icon}
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
