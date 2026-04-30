import { useState } from 'react'
import { Tv, Baby, Radio, Check } from 'lucide-react'
import styles from './FeatureStrip.module.css'

const TABS = [
  {
    id: 'watch',
    icon: <Tv size={20} />,
    label: 'צפייה מיידית',
    title: 'התחילו לצפות כבר עכשיו',
    items: [
      'בטלוויזיות חכמות, טאבלט, מחשב ומובייל – גישה מיידית',
      'ניתן להתקין על כמה מכשירים שרוצים, ללא הגבלה',
      'איכות שידור גבוהה ושמע מרהיב',
      'ממשק ידידותי לילדים – נוח לניווט ובטוח לשימוש',
    ],
    image: '/mockup/mockup-tablet-1.png',
  },
  {
    id: 'kids',
    icon: <Baby size={20} />,
    label: 'תוכן לכל הגילאים',
    title: 'תוכן מושלם לכל שלב',
    items: [
      'עשרות סרטים וסדרות מגיל הגן עד בני נוער',
      'תוכן חינוכי ומהנה שנבחר בקפידה עבור משפחות',
      'עדכונים שוטפים של כותרים חדשים כל שבוע',
      'כל התכנים נבדקים ומאושרים לפי קבוצות גיל',
    ],
    image: '/mockup/mockup-phone-2.png',
  },
  {
    id: 'live',
    icon: <Radio size={20} />,
    label: 'לייב ואינטראקציה',
    title: 'חוויה שחורגת מהמסך',
    items: [
      'מפגשי לייב עם יוצרי תוכן ואנשי חינוך מובילים',
      'חדרי צ\'אט מפוקחים לשיחות בטוחות בין ילדים',
      'פורומים ייחודיים ודפי תוכן ועבודה אינטראקטיביים',
      'קהילה חיה שמשלימה את חוויית הצפייה',
    ],
    image: '/mockup/mockup-tablet-2.png',
  },
]

export default function FeatureStrip() {
  const [active, setActive] = useState('watch')
  const tab = TABS.find(t => t.id === active)

  return (
    <section className={styles.section} id="content">
      <div className="container">
        {/* Tab buttons */}
        <div className={styles.tabs}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`${styles.tab} ${active === t.id ? styles.tabActive : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span className={styles.tabIcon}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className={styles.content} key={active}>
          <div className={styles.text}>
            <h2 className="section-title">{tab.title}</h2>
            <ul className={styles.list}>
              {tab.items.map((item, i) => (
                <li key={i} className={`check-item ${styles.listItem}`}>
                  <Check size={16} className="icon" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.visual}>
            <img
              src={tab.image}
              alt={tab.label}
              className={styles.image}
              onError={e => { e.currentTarget.style.opacity = '0' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
