import { useState, useEffect, useRef } from 'react'
import {
  X, Phone, Mail, User, CreditCard,
  Calendar, Lock, IdCard, ChevronLeft,
  Check, Loader2, ArrowLeft,
} from 'lucide-react'
import styles from './RegisterModal.module.css'

/* ─── helpers ─── */
function formatCardNumber(raw) {
  return raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(raw) {
  const d = raw.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
}

function isPhone(v)  { return /^0\d{9}$/.test(v.replace(/[-\s]/g, '')) }
function isEmail(v)  { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }
function isExpiry(v) { return /^\d{2}\/\d{2}$/.test(v) }

const STEP_LABELS = ['פרטים', 'תשלום', 'אישור']

/* ─── Step dots ─── */
function StepIndicator({ current, total }) {
  return (
    <div className={styles.stepsWrapper}>
      <div className={styles.steps}>
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1
          const done = n < current
          const active = n === current
          const isLast = n === total
          return (
            <div key={n} className={`${styles.stepGroup} ${isLast ? styles.stepGroupLast : ''}`}>
              <div className={styles.stepDotWrap}>
                <div className={`${styles.stepDot} ${done ? styles.done : ''} ${active ? styles.active : ''}`}>
                  {done ? <Check size={14} strokeWidth={3} /> : n}
                </div>
                <span className={`${styles.stepLabel} ${active ? styles.stepLabelActive : ''} ${done ? styles.stepLabelDone : ''}`}>
                  {STEP_LABELS[i]}
                </span>
              </div>
              {!isLast && (
                <div className={`${styles.stepLine} ${done ? styles.lineDone : ''}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Input field ─── */
function Field({ label, icon: Icon, error, ...props }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrap}>
        <Icon size={17} className={styles.inputIcon} />
        <input className={`${styles.input} ${error ? styles.inputError : ''}`} {...props} />
      </div>
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  )
}

/* ─── Main Modal ─── */
export default function RegisterModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [mode, setMode] = useState('phone') // phone | email
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(5)

  const [form, setForm] = useState({
    contact: '', name: '',
    cardNum: '', cardName: '', expiry: '', cvv: '', id: '',
  })
  const [errors, setErrors] = useState({})

  const overlayRef = useRef(null)

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* close on overlay click */
  const handleOverlay = e => { if (e.target === overlayRef.current) onClose() }

  /* close on Escape */
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* redirect countdown at step 3 */
  useEffect(() => {
    if (step !== 3) return
    if (redirect <= 0) { window.location.href = 'https://rega.org.il/'; return }
    const id = setTimeout(() => setRedirect(r => r - 1), 1000)
    return () => clearTimeout(id)
  }, [step, redirect])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const clearError = k => setErrors(e => ({ ...e, [k]: '' }))

  /* Validate step 1 */
  function validateStep1() {
    const errs = {}
    if (mode === 'phone' && !isPhone(form.contact)) errs.contact = 'נא להזין מספר טלפון תקין'
    if (mode === 'email' && !isEmail(form.contact)) errs.contact = 'נא להזין כתובת אימייל תקינה'
    if (form.name.trim().length < 2) errs.name = 'נא להזין שם מלא'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  /* Validate step 2 */
  function validateStep2() {
    const errs = {}
    const cn = form.cardNum.replace(/\s/g, '')
    if (cn.length < 15 || cn.length > 16) errs.cardNum = 'מספר כרטיס לא תקין'
    if (form.cardName.trim().length < 2) errs.cardName = 'נא להזין שם בעל הכרטיס'
    if (!isExpiry(form.expiry)) errs.expiry = 'פורמט: MM/YY'
    if (form.cvv.length < 3) errs.cvv = 'CVV לא תקין'
    if (form.id.replace(/\D/g,'').length < 9) errs.id = 'ת.ז. לא תקינה'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function goStep2() {
    if (!validateStep1()) return
    setStep(2)
  }

  function goStep3() {
    if (!validateStep2()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 2000)
  }

  /* card number display */
  const maskedNum = form.cardNum.replace(/\s/g, '').padEnd(16, '·')
    .replace(/(.{4})/g, '$1 ').trim()

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleOverlay}>
      <div className={styles.modal} role="dialog" aria-modal="true">

        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="סגור">
          <X size={20} />
        </button>

        {/* Logos */}
        <div className={styles.modalLogos}>
          <img src="/rega-tv-logo.svg" alt="רגע TV" className={styles.mLogo} />
          <span className={styles.mLogoDivider} />
          <img src="/kids-logo.svg" alt="Kids" className={styles.mLogoKids} />
        </div>

        {/* Steps indicator */}
        <StepIndicator current={step} total={3} />

        {/* ═══ STEP 1 ═══ */}
        {step === 1 && (
          <div className={styles.stepPanel}>
            <div className={styles.stepMeta}>שלב 1 מתוך 3</div>
            <h2 className={styles.stepTitle}>מה הפרטים שלך?</h2>
            <p className={styles.stepDesc}>יש ליצור חשבון כדי להתחיל</p>

            {/* Toggle phone/email */}
            <div className={styles.toggle}>
              <button
                className={`${styles.toggleBtn} ${mode === 'phone' ? styles.toggleActive : ''}`}
                onClick={() => { setMode('phone'); clearError('contact') }}
              >
                <Phone size={15} /> טלפון
              </button>
              <button
                className={`${styles.toggleBtn} ${mode === 'email' ? styles.toggleActive : ''}`}
                onClick={() => { setMode('email'); clearError('contact') }}
              >
                <Mail size={15} /> אימייל
              </button>
            </div>

            {mode === 'phone' ? (
              <Field
                label="מספר טלפון"
                icon={Phone}
                type="tel"
                inputMode="numeric"
                placeholder="050-000-0000"
                value={form.contact}
                onChange={e => { set('contact', e.target.value); clearError('contact') }}
                error={errors.contact}
              />
            ) : (
              <Field
                label="כתובת אימייל"
                icon={Mail}
                type="email"
                placeholder="example@gmail.com"
                value={form.contact}
                onChange={e => { set('contact', e.target.value); clearError('contact') }}
                error={errors.contact}
              />
            )}

            <Field
              label="שם מלא"
              icon={User}
              type="text"
              placeholder="ישראל ישראלי"
              value={form.name}
              onChange={e => { set('name', e.target.value); clearError('name') }}
              error={errors.name}
            />

            <button className={`${styles.submitBtn}`} onClick={goStep2}>
              המשך לפרטי תשלום
              <ArrowLeft size={17} />
            </button>
            <p className={styles.finePrint}>
              חודש ראשון חינם · ביטול בכל עת
            </p>
          </div>
        )}

        {/* ═══ STEP 2 ═══ */}
        {step === 2 && (
          <div className={styles.stepPanel}>
            <div className={styles.stepMeta}>שלב 2 מתוך 3</div>
            <h2 className={styles.stepTitle}>פרטי כרטיס אשראי</h2>
            <p className={styles.stepDesc}>לא יחויבו עד לאחר חודש הניסיון</p>

            {/* Card preview */}
            <div className={styles.cardPreview}>
              <div className={styles.cardPreviewBg} />
              <div className={styles.cardPreviewNum}>
                {maskedNum}
              </div>
              <div className={styles.cardPreviewRow}>
                <div>
                  <div className={styles.cardPreviewLabel}>שם</div>
                  <div className={styles.cardPreviewVal}>{form.cardName || 'השם שלך'}</div>
                </div>
                <div>
                  <div className={styles.cardPreviewLabel}>תוקף</div>
                  <div className={styles.cardPreviewVal}>{form.expiry || 'MM/YY'}</div>
                </div>
              </div>
              <CreditCard size={24} className={styles.cardIcon} />
            </div>

            {/* Security notice */}
            <div className={styles.secBadge}>
              <Lock size={14} />
              <span>מחובר בצורה מוצפנת · תקן PCI DSS</span>
            </div>

            <Field
              label="מספר כרטיס"
              icon={CreditCard}
              type="text"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              value={form.cardNum}
              onChange={e => { set('cardNum', formatCardNumber(e.target.value)); clearError('cardNum') }}
              error={errors.cardNum}
            />

            <Field
              label="שם בעל הכרטיס"
              icon={User}
              type="text"
              placeholder="ישראל ישראלי"
              value={form.cardName}
              onChange={e => { set('cardName', e.target.value); clearError('cardName') }}
              error={errors.cardName}
            />

            <div className={styles.row}>
              <Field
                label="תאריך תפוגה"
                icon={Calendar}
                type="text"
                inputMode="numeric"
                placeholder="MM/YY"
                maxLength={5}
                value={form.expiry}
                onChange={e => { set('expiry', formatExpiry(e.target.value)); clearError('expiry') }}
                error={errors.expiry}
              />
              <Field
                label="CVV"
                icon={Lock}
                type="text"
                inputMode="numeric"
                placeholder="•••"
                maxLength={4}
                value={form.cvv}
                onChange={e => { set('cvv', e.target.value.replace(/\D/g,'')); clearError('cvv') }}
                error={errors.cvv}
              />
            </div>

            <Field
              label="ת.ז. בעל הכרטיס"
              icon={IdCard}
              type="text"
              inputMode="numeric"
              placeholder="000000000"
              maxLength={9}
              value={form.id}
              onChange={e => { set('id', e.target.value.replace(/\D/g,'')); clearError('id') }}
              error={errors.id}
            />

            <button className={styles.submitBtn} onClick={goStep3} disabled={loading}>
              {loading
                ? <><Loader2 size={18} className={styles.spinner} /> מעבד...</>
                : <> אישור והשלמת הרשמה <ArrowLeft size={17} /></>
              }
            </button>
            <p className={styles.finePrint}>
              הכרטיס לא יחויב היום · לאחר 30 יום: 50 ₪/חודש
            </p>
          </div>
        )}

        {/* ═══ STEP 3 – Success ═══ */}
        {step === 3 && (
          <div className={`${styles.stepPanel} ${styles.successPanel}`}>
            <div className={styles.successIcon}>
              <Check size={36} strokeWidth={2.5} />
            </div>
            <h2 className={styles.successTitle}>ברוכים הבאים לרגע קידס!</h2>
            <p className={styles.successDesc}>
              ההרשמה הושלמה בהצלחה. חודש הניסיון שלכם התחיל!
            </p>

            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>שם</span>
                <span className={styles.summaryVal}>{form.name}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>מנוי</span>
                <span className={styles.summaryVal}>רגע קידס – כל התכנים</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>חיוב היום</span>
                <span className={`${styles.summaryVal} ${styles.green}`}>חינם</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>לאחר 30 יום</span>
                <span className={styles.summaryVal}>₪50 / חודש</span>
              </div>
            </div>

            <div className={styles.redirectBanner}>
              <Loader2 size={16} className={styles.spinner} />
              <span>מועבר לאתר רגע TV בעוד <strong>{redirect}</strong> שניות...</span>
            </div>

            <button
              className={styles.submitBtnGreen}
              onClick={() => { window.location.href = 'https://rega.org.il/' }}
            >
              עברו לצפייה עכשיו
              <ArrowLeft size={17} />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
