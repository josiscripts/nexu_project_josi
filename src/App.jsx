import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* =====================================================================
 *  NEXU — Onboarding SPA (161 pantallas)
 *  Fondo #FFFFFF · Tarjetas táctiles 44px · Rojo Neón #FF3B3F · Cian Glacial #2BD4DE
 *  Estado global por useReducer; transiciones con Framer Motion.
 * ===================================================================== */

const RED = '#FF3B3F'
const CYAN = '#2BD4DE'
const CYAN_SOFT = '#9DF1F5'

/* ---------- LOGO ---------- */
function NexuLogo({ size = 56 }) {
  return (
    <img
      src="/nexu_icon_app_v2.svg"
      alt="Nexu"
      width={size}
      height={size}
      style={{ width: size, height: size, display: 'block' }}
      draggable={false}
    />
  )
}

/* ---------- ICONOS ---------- */
const Svg = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p} />
const I = {
  check:    (p) => <Svg width={20} height={20} {...p}><polyline points="20 6 9 17 4 12" /></Svg>,
  arrowR:   (p) => <Svg width={20} height={20} {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Svg>,
  chevL:    (p) => <Svg width={20} height={20} {...p}><polyline points="15 18 9 12 15 6" /></Svg>,
  chevR:    (p) => <Svg width={20} height={20} {...p}><polyline points="9 18 15 12 9 6" /></Svg>,
  mic:      (p) => <Svg width={18} height={18} {...p}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></Svg>,
  micOff:   (p) => <Svg width={18} height={18} {...p}><line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /><line x1="12" y1="19" x2="12" y2="23" /></Svg>,
  hand:     (p) => <Svg width={20} height={20} {...p}><path d="M18 11V6a2 2 0 0 0-4 0v5" /><path d="M14 10V4a2 2 0 0 0-4 0v6" /><path d="M10 10.5V6a2 2 0 0 0-4 0v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></Svg>,
  plus:     (p) => <Svg width={22} height={22} strokeWidth="2.4" {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Svg>,
  heart:    (p) => <Svg width={20} height={20} {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></Svg>,
  msg:      (p) => <Svg width={20} height={20} {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Svg>,
  bookmark: (p) => <Svg width={20} height={20} {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></Svg>,
  flag:     (p) => <Svg width={20} height={20} {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></Svg>,
  search:   (p) => <Svg width={20} height={20} {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Svg>,
  x:        (p) => <Svg width={18} height={18} strokeWidth="2.2" {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Svg>,
  camera:   (p) => <Svg width={20} height={20} {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Svg>,
  bell:     (p) => <Svg width={20} height={20} {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></Svg>,
  star:     (p) => <Svg width={18} height={18} fill="currentColor" strokeWidth="0" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Svg>,
  award:    (p) => <Svg width={22} height={22} {...p}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></Svg>,
  eye:      (p) => <Svg width={18} height={18} {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></Svg>,
  eyeOff:   (p) => <Svg width={18} height={18} {...p}><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.45 18.45 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></Svg>,
  upload:   (p) => <Svg width={20} height={20} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></Svg>,
  qr:       (p) => <Svg width={20} height={20} {...p}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><line x1="14" y1="14" x2="14" y2="21" /><line x1="18" y1="14" x2="18" y2="18" /><line x1="21" y1="18" x2="14" y2="18" /></Svg>,
  fire:     (p) => <Svg width={18} height={18} {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></Svg>,
  bolt:     (p) => <Svg width={18} height={18} {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Svg>,
  link:     (p) => <Svg width={18} height={18} {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></Svg>,
  trophy:   (p) => <Svg width={20} height={20} {...p}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></Svg>,
  file:     (p) => <Svg width={18} height={18} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></Svg>,
  users:    (p) => <Svg width={20} height={20} {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Svg>,
  send:     (p) => <Svg width={20} height={20} {...p}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></Svg>,
  paperclip:(p) => <Svg width={18} height={18} {...p}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></Svg>,
}

/* ---------- DATOS ESTÁTICOS ---------- */
const UNESCO_AREAS = [
  { id: 'eng',   label: 'Ingeniería',          emoji: '⚙️' },
  { id: 'salud', label: 'Salud',                emoji: '🩺' },
  { id: 'soc',   label: 'Ciencias Sociales',    emoji: '🏛️' },
  { id: 'art',   label: 'Artes y Humanidades',  emoji: '🎨' },
  { id: 'edu',   label: 'Educación',            emoji: '📚' },
  { id: 'nat',   label: 'Ciencias Naturales',   emoji: '🧪' },
  { id: 'biz',   label: 'Negocios y Derecho',   emoji: '💼' },
  { id: 'agri',  label: 'Agricultura',          emoji: '🌾' },
]
const CAREERS_BY_AREA = {
  eng:   ['Ing. Informática', 'Ing. Industrial', 'Ing. Civil', 'Ing. Eléctrica', 'Ing. Mecánica', 'Ing. Biomédica'],
  salud: ['Medicina', 'Enfermería', 'Odontología', 'Psicología', 'Nutrición', 'Farmacia'],
  soc:   ['Sociología', 'Antropología', 'Ciencia Política', 'Comunicación', 'RR. II.'],
  art:   ['Filología', 'Diseño Gráfico', 'Bellas Artes', 'Música', 'Historia del Arte'],
  edu:   ['Pedagogía', 'Educación Infantil', 'Educación Física'],
  nat:   ['Biología', 'Química', 'Física', 'Matemáticas', 'Geología'],
  biz:   ['Administración', 'Economía', 'Derecho', 'Contabilidad', 'Marketing'],
  agri:  ['Ing. Agronómica', 'Veterinaria', 'Ciencias Forestales'],
}
const UNIVERSITIES = [
  'Univ. Nacional Mayor de San Marcos',
  'Univ. Pontificia Católica',
  'Univ. de Ingeniería',
  'Univ. del Pacífico',
  'Univ. Cayetano Heredia',
  'Univ. de Lima',
  'Univ. San Martín',
  'Univ. Ricardo Palma',
  'Univ. Nacional de Trujillo',
  'Univ. Nacional San Antonio Abad',
  'Univ. Tecnológica del Perú',
  'Univ. Continental',
]
const INTEREST_TAGS = [
  'Cálculo','Programación','React','Python','Estadística','Bases de Datos',
  'Anatomía','Bioquímica','Marketing','Finanzas','Diseño','Inglés',
  'Física','Química','Lectura crítica','Tesis','TFG','Proyectos','Exámenes',
  'Power BI','Excel avanzado','Pitch','Investigación','Liderazgo',
]
const PAINS = ['Exámenes','Proyectos finales','Tesis / TFG','Trabajo grupal','Idiomas','Programación','Tiempo','Concentración']
const HABIT_QS = [
  '¿Prefieres estudiar solo?',
  '¿Usas música mientras estudias?',
  '¿Tomas notas digitales?',
  '¿Repasas el mismo día?',
  '¿Estudias por la noche?',
  '¿Usas mapas mentales?',
  '¿Prefieres explicarle a alguien para entender?',
  '¿Te distrae el móvil con frecuencia?',
  '¿Has hecho un grupo de estudio antes?',
  '¿Te sientes listo para el próximo examen?',
]
const PEERS = [
  { id: 1, name: 'Lucía M.',   career: 'Ing. Informática',  match: 92, online: true,  skill: 'React',     init: 'LM' },
  { id: 2, name: 'Andrés P.',  career: 'Ing. Industrial',   match: 88, online: true,  skill: 'Python',    init: 'AP' },
  { id: 3, name: 'Camila R.',  career: 'Medicina',          match: 81, online: false, skill: 'Anatomía',  init: 'CR' },
  { id: 4, name: 'Diego H.',   career: 'Ing. Informática',  match: 79, online: true,  skill: 'Algoritmos',init: 'DH' },
  { id: 5, name: 'Sofía V.',   career: 'Psicología',        match: 76, online: true,  skill: 'Investig.', init: 'SV' },
  { id: 6, name: 'Mateo G.',   career: 'Economía',          match: 72, online: false, skill: 'Power BI',  init: 'MG' },
  { id: 7, name: 'Valentina T.',career: 'Diseño Gráfico',   match: 70, online: true,  skill: 'Figma',     init: 'VT' },
  { id: 8, name: 'Joaquín B.', career: 'Ing. Mecánica',     match: 68, online: false, skill: 'CAD',       init: 'JB' },
]
const ROOMS = [
  { id: 1, title: 'Repaso Final · Programación II',    listeners: 42, speakers: 5, live: true,  tag: 'Examen' },
  { id: 2, title: 'Dudas TFG: Estado del arte',        listeners: 18, speakers: 3, live: true,  tag: 'Tesis' },
  { id: 3, title: 'Cálculo Integral — paso a paso',    listeners: 31, speakers: 4, live: true,  tag: 'Cálculo' },
  { id: 4, title: 'Anatomía: aparato circulatorio',    listeners: 24, speakers: 6, live: true,  tag: 'Salud' },
  { id: 5, title: 'Pitch de proyecto · Innovación',    listeners: 12, speakers: 2, live: false, tag: 'Negocios' },
]
const MEDALS = [
  { id: 'pioneer',  name: 'Pionero Nexu',   desc: 'Te uniste a la red',         locked: false, color: CYAN },
  { id: 'tutor',    name: 'Tutor Pro',      desc: 'Resolvió 10 dudas',           locked: true,  color: RED  },
  { id: 'night',    name: 'Noctámbulo',     desc: '5 sesiones después de las 23h', locked: true, color: '#7E5BEF' },
  { id: 'webrtc',   name: 'Rey del WebRTC', desc: '20 horas en salas de voz',    locked: true,  color: '#22C55E' },
  { id: 'sharer',   name: 'Compartidor',    desc: 'Subió 5 recursos útiles',     locked: true,  color: '#F59E0B' },
  { id: 'streak',   name: 'Racha 7 días',   desc: 'Estudio diario',              locked: true,  color: '#EC4899' },
]
const ICEBREAKERS = [
  '¡Hola! Vi que sabes de React, ¿tienes 5 min para una duda?',
  'Hey, vamos en la misma carrera. ¿Cómo llevas el ciclo?',
  'Te vi en la sala de Cálculo. Buen aporte 🙌',
  '¿Tienes apuntes del último parcial?',
]
const LEADERBOARD = [
  { rank: 1, name: 'Andrés P.', karma: 1820, init: 'AP' },
  { rank: 2, name: 'Lucía M.',  karma: 1640, init: 'LM' },
  { rank: 3, name: 'Camila R.', karma: 1455, init: 'CR' },
  { rank: 4, name: 'Diego H.',  karma: 1322, init: 'DH' },
  { rank: 5, name: 'Tú',        karma: 1218, init: 'YO', me: true },
  { rank: 6, name: 'Sofía V.',  karma: 1180, init: 'SV' },
]

/* ---------- UTILIDADES ---------- */
const cn = (...c) => c.filter(Boolean).join(' ')
const calcAge = (iso) => {
  if (!iso) return 0
  const d = new Date(iso); if (isNaN(d)) return 0
  const t = new Date(); let a = t.getFullYear() - d.getFullYear()
  const m = t.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && t.getDate() < d.getDate())) a--
  return a
}
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const passwordStrength = (p) => {
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return Math.min(s, 4)
}

/* ---------- ESTADO ---------- */
const initialState = {
  index: 0,
  data: {
    difficulty: '', hours: 0, area: '', career: '', university: '',
    name: '', lastname: '', dob: '', gender: '',
    email: '', password: '', otp: '',
    semester: 5, avatar: '', interests: [], pains: [],
    notifPush: false, micGranted: false,
    habits: {}, evolution: 7, ratingNps: 0, expRating: 0, complaint: '',
    iceMessage: '', groupName: '', groupPurpose: '',
  },
  karma: 0,
  acceptedHonor: false,
  joinedRooms: [],
  socketLog: [],
}
function reducer(s, a) {
  switch (a.type) {
    case 'NEXT':       return { ...s, index: Math.min(s.index + 1, a.max) }
    case 'BACK':       return { ...s, index: Math.max(s.index - 1, 0) }
    case 'JUMP':       return { ...s, index: a.index }
    case 'SET':        return { ...s, data: { ...s.data, ...a.payload } }
    case 'KARMA':      return { ...s, karma: s.karma + a.amount }
    case 'HONOR':      return { ...s, acceptedHonor: true }
    case 'JOIN_ROOM':  return { ...s, joinedRooms: [...s.joinedRooms, a.id] }
    default:           return s
  }
}

/* ---------- PRIMITIVAS UI ---------- */
function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[440px] min-h-screen flex flex-col bg-white relative overflow-hidden">
        {children}
      </div>
    </div>
  )
}
function TopBar({ onBack, canBack, phaseIdx, phaseLabel, screenN, screenTotal, karma }) {
  return (
    <div className="px-5 pt-4 pb-2 flex items-center gap-3">
      <button
        onClick={onBack}
        disabled={!canBack}
        className={cn('tap-44 w-10 h-10 rounded-full flex items-center justify-center text-nexuInk transition',
          canBack ? 'hover:bg-nexuMist' : 'opacity-30 cursor-not-allowed')}
        aria-label="Atrás"
      ><I.chevL /></button>
      <div className="flex-1 flex items-center gap-2">
        <NexuLogo size={28} />
        <div className="leading-tight">
          <div className="text-[10px] font-semibold tracking-wider text-nexuInkSoft uppercase">Fase {phaseIdx} · {phaseLabel}</div>
          <div className="text-[11px] text-nexuInkSoft/80">Pantalla {screenN}/{screenTotal}</div>
        </div>
      </div>
      {karma > 0 && (
        <div className="px-2.5 h-8 rounded-full bg-nexuMist border border-nexuLine flex items-center gap-1 text-[12px] font-semibold text-nexuInk">
          <span className="text-nexuRed">●</span>{karma}
        </div>
      )}
    </div>
  )
}
function ProgressBar({ pct }) {
  return (
    <div className="px-5">
      <div className="h-1.5 w-full rounded-full bg-nexuLine overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 130, damping: 22 }}
          style={{ background: `linear-gradient(90deg, ${RED}, ${CYAN})` }}
        />
      </div>
    </div>
  )
}
function PrimaryButton({ children, onClick, disabled, pulse, full = true, tone = 'red' }) {
  const bg = tone === 'cyan' ? CYAN : RED
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'tap-44 inline-flex items-center justify-center gap-2 rounded-2xl px-5 h-14 font-semibold text-white shadow-tactile transition active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed',
        full ? 'w-full' : '',
        pulse ? 'animate-livePulse' : ''
      )}
      style={{ background: bg, boxShadow: disabled ? undefined : `0 10px 24px -10px ${bg}AA` }}
    >
      {children}
    </button>
  )
}
function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="tap-44 inline-flex items-center justify-center gap-2 rounded-2xl px-5 h-12 text-nexuInk/70 hover:text-nexuInk hover:bg-nexuMist font-medium transition"
    >{children}</button>
  )
}
function TactileCard({ selected, onClick, children, accent = false, dense }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'tap-44 w-full text-left rounded-2xl border bg-white px-4 transition',
        dense ? 'min-h-[52px] py-2.5' : 'min-h-[56px] py-3',
        selected ? 'border-transparent ring-2 shadow-tactile' : 'border-nexuLine hover:border-nexuInk/30 shadow-sm'
      )}
      style={{
        boxShadow: selected ? `0 0 0 3px ${accent ? CYAN : RED}33, 0 8px 22px -12px rgba(15,18,38,0.18)` : undefined,
        ['--ring-color']: accent ? CYAN : RED,
      }}
    >{children}</button>
  )
}
function TextField({ value, onChange, placeholder, type = 'text', rightAdornment, autoFocus, error, onEnter }) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white px-4 h-14 flex items-center gap-2 transition',
        error ? 'border-nexuRed' : 'border-nexuLine focus-within:border-nexuInk'
      )}
    >
      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) onEnter() }}
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent text-[16px] text-nexuInk placeholder:text-nexuInkSoft/60"
      />
      {rightAdornment}
    </div>
  )
}
function SectionTitle({ children, kicker }) {
  return (
    <div className="mb-4">
      {kicker && <div className="text-[11px] font-semibold tracking-wider text-nexuRed uppercase mb-1">{kicker}</div>}
      <h1 className="text-[26px] leading-[1.15] font-semibold text-nexuInk">{children}</h1>
    </div>
  )
}
function Body({ children }) {
  return <p className="text-[15px] leading-relaxed text-nexuInkSoft mb-6">{children}</p>
}
function ScreenWrap({ kicker, title, copy, children, footer }) {
  return (
    <motion.div
      className="flex-1 flex flex-col px-5 pt-4 pb-6"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex-1">
        {(kicker || title) && <SectionTitle kicker={kicker}>{title}</SectionTitle>}
        {copy && <Body>{copy}</Body>}
        {children}
      </div>
      {footer && <div className="pt-4 sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent">{footer}</div>}
    </motion.div>
  )
}
function Avatar({ init, size = 44, accent = false }) {
  return (
    <div
      className={cn('rounded-full flex items-center justify-center font-semibold select-none')}
      style={{
        width: size, height: size,
        background: accent ? `${CYAN}22` : '#F1F2F7',
        color: accent ? '#0D7B83' : '#3A3F5C',
        fontSize: size * 0.36,
      }}
    >{init}</div>
  )
}
function Pill({ children, tone = 'mist' }) {
  const map = {
    mist: 'bg-nexuMist text-nexuInkSoft border-nexuLine',
    red:  'bg-nexuRed/10 text-nexuRed border-nexuRed/20',
    cyan: 'bg-nexuCyanDeep/10 text-nexuCyanDeep border-nexuCyanDeep/20',
  }
  return <span className={cn('inline-flex items-center gap-1 px-2.5 h-7 rounded-full text-[12px] font-medium border', map[tone])}>{children}</span>
}

/* ===================== RENDERERS — A: básicos ===================== */

function MessageScreen({ screen, next }) {
  return (
    <ScreenWrap
      kicker={screen.kicker}
      title={screen.title}
      copy={screen.copy}
      footer={<PrimaryButton onClick={() => next()}>{screen.cta || 'Continuar'} <I.arrowR /></PrimaryButton>}
    >
      {screen.illustration && <Illustration kind={screen.illustration} />}
    </ScreenWrap>
  )
}

function Illustration({ kind }) {
  switch (kind) {
    case 'welcome':
      return (
        <motion.div className="flex flex-col items-center justify-center mt-2 mb-8" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 130, damping: 16 }}>
          <div className="relative">
            <motion.div className="absolute inset-0 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.45, 0, 0.45] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ background: `${RED}33` }} />
            <NexuLogo size={140} />
          </div>
          <div className="mt-6 flex -space-x-3">
            {['LM','AP','CR','DH'].map((i, k) => <Avatar key={k} init={i} size={40} accent={k % 2 === 0} />)}
          </div>
        </motion.div>
      )
    case 'isolation':
      return (
        <div className="rounded-3xl border border-nexuLine p-5 mb-6 bg-nexuMist/40">
          <div className="flex items-end gap-3 h-32">
            <div className="flex-1 rounded-xl bg-nexuInk/10 relative overflow-hidden" style={{ height: '30%' }}>
              <div className="absolute -top-5 left-2 text-[11px] text-nexuInkSoft">Sin red</div>
            </div>
            <div className="flex-1 rounded-xl relative overflow-hidden" style={{ height: '95%', background: `linear-gradient(180deg, ${RED}, ${CYAN})` }}>
              <div className="absolute -top-5 right-2 text-[11px] text-nexuRed font-semibold">Con Nexu</div>
            </div>
          </div>
          <div className="text-[12px] text-nexuInkSoft mt-3">Soledad académica vs. poder de la red Nexu.</div>
        </div>
      )
    case 'aha':
      return (
        <div className="rounded-3xl border border-nexuLine p-6 mb-6 bg-white">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div key={i} className="aspect-square rounded-xl"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06, type: 'spring' }}
                style={{ background: i === 4 ? RED : i % 2 === 0 ? `${CYAN}33` : '#F1F2F7' }} />
            ))}
          </div>
          <div className="mt-4 text-center text-[12px] text-nexuInkSoft">Nodos conectándose en tu área UNESCO</div>
        </div>
      )
    case 'communityProof':
      return (
        <div className="rounded-3xl border border-nexuLine p-6 mb-6 bg-white text-center">
          <div className="text-[40px] font-semibold text-nexuInk leading-none">124</div>
          <div className="text-[12px] text-nexuInkSoft mt-1">estudiantes de tu facultad en línea</div>
          <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div key={i} className="w-7 h-7 rounded-full"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                style={{ background: i % 3 === 0 ? RED : i % 3 === 1 ? CYAN : '#3A3F5C' }} />
            ))}
          </div>
        </div>
      )
    case 'beating':
      return (
        <div className="flex items-center justify-center my-8">
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <NexuLogo size={120} />
          </motion.div>
        </div>
      )
    case 'pulseHomeNetwork':
      return (
        <div className="rounded-3xl bg-nexuInk text-white p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 30% 30%, ${RED}, transparent 60%), radial-gradient(circle at 80% 70%, ${CYAN}, transparent 55%)` }} />
          <div className="relative">
            <div className="text-[11px] uppercase tracking-wider opacity-70">Conectando con el nodo</div>
            <div className="text-[18px] font-semibold mt-1">Tu Carrera UNESCO</div>
            <div className="mt-4 flex gap-1.5">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div key={i} className="w-1.5 rounded-full bg-white/80"
                  animate={{ height: ['8px','22px','8px'] }}
                  transition={{ duration: 1.2, delay: i * 0.05, repeat: Infinity }} />
              ))}
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

function ChoiceScreen({ screen, state, dispatch, next }) {
  const v = state.data[screen.field]
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!v} onClick={() => next()}>{screen.cta || 'Continuar'} <I.arrowR /></PrimaryButton>}>
      <div className="space-y-2.5">
        {screen.options.map((op) => {
          const value = typeof op === 'string' ? op : op.value
          const label = typeof op === 'string' ? op : op.label
          const desc = typeof op === 'string' ? null : op.desc
          return (
            <TactileCard key={value} selected={v === value}
              onClick={() => dispatch({ type: 'SET', payload: { [screen.field]: value } })}>
              <div className="flex items-center gap-3">
                {op.emoji && <div className="text-2xl">{op.emoji}</div>}
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-nexuInk">{label}</div>
                  {desc && <div className="text-[12px] text-nexuInkSoft">{desc}</div>}
                </div>
                {v === value && <I.check style={{ color: RED }} />}
              </div>
            </TactileCard>
          )
        })}
      </div>
    </ScreenWrap>
  )
}

function MultiChoiceScreen({ screen, state, dispatch, next }) {
  const cur = state.data[screen.field] || []
  const min = screen.min || 1
  const toggle = (v) => {
    const set = new Set(cur)
    set.has(v) ? set.delete(v) : set.add(v)
    dispatch({ type: 'SET', payload: { [screen.field]: [...set] } })
  }
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={cur.length < min} onClick={() => next()}>
        {cur.length < min ? `Selecciona ${min - cur.length} más` : `Continuar (${cur.length})`} <I.arrowR />
      </PrimaryButton>}>
      <div className="flex flex-wrap gap-2">
        {screen.options.map((op) => {
          const sel = cur.includes(op)
          return (
            <button key={op} onClick={() => toggle(op)}
              className={cn('tap-44 px-4 h-11 rounded-full border text-[13.5px] font-medium transition',
                sel ? 'bg-nexuInk text-white border-nexuInk' : 'bg-white text-nexuInk border-nexuLine hover:border-nexuInk/30')}
              style={sel ? { background: RED, borderColor: RED } : undefined}
            >{op}{sel && <span className="ml-1.5">✓</span>}</button>
          )
        })}
      </div>
    </ScreenWrap>
  )
}

function SliderScreen({ screen, state, dispatch, next }) {
  const v = state.data[screen.field] ?? screen.min
  const min = screen.min, max = screen.max
  const pct = ((v - min) / (max - min)) * 100
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <div className="rounded-3xl border border-nexuLine p-6 bg-white">
        <div className="text-center mb-2">
          <div className="text-[64px] font-semibold leading-none text-nexuInk">{v}</div>
          <div className="text-[12px] uppercase tracking-wider text-nexuInkSoft mt-1">{screen.unit}</div>
        </div>
        <input type="range" className="nexu-range" min={min} max={max} value={v}
          style={{ ['--p']: `${pct}%` }}
          onChange={(e) => dispatch({ type: 'SET', payload: { [screen.field]: Number(e.target.value) } })} />
        <div className="flex justify-between text-[11px] text-nexuInkSoft mt-2"><span>{screen.minLabel || min}</span><span>{screen.maxLabel || max}</span></div>
      </div>
    </ScreenWrap>
  )
}

function NumericInputScreen({ screen, state, dispatch, next }) {
  const v = state.data[screen.field] ?? 0
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!v} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <div className="rounded-3xl border border-nexuLine p-6 bg-white">
        <div className="text-center text-[64px] font-semibold leading-none text-nexuInk">{v || '–'}</div>
        <div className="text-center text-[12px] uppercase tracking-wider text-nexuInkSoft mt-2 mb-5">{screen.unit}</div>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} className="tap-44 h-12 rounded-xl bg-nexuMist text-nexuInk text-[18px] font-semibold hover:bg-nexuLine"
              onClick={() => dispatch({ type: 'SET', payload: { [screen.field]: Number(String(v) + n) } })}>{n}</button>
          ))}
          <button className="tap-44 h-12 rounded-xl bg-nexuMist text-nexuInk hover:bg-nexuLine"
            onClick={() => dispatch({ type: 'SET', payload: { [screen.field]: 0 } })}>C</button>
          <button className="tap-44 h-12 rounded-xl bg-nexuMist text-nexuInk text-[18px] font-semibold hover:bg-nexuLine"
            onClick={() => dispatch({ type: 'SET', payload: { [screen.field]: Number(String(v) + '0') } })}>0</button>
          <button className="tap-44 h-12 rounded-xl bg-nexuMist text-nexuInk hover:bg-nexuLine"
            onClick={() => dispatch({ type: 'SET', payload: { [screen.field]: Math.floor(v / 10) } })}>⌫</button>
        </div>
      </div>
    </ScreenWrap>
  )
}

function TextInputScreen({ screen, state, dispatch, next }) {
  const v = state.data[screen.field] || ''
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!v.trim()} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <TextField value={v} autoFocus placeholder={screen.placeholder}
        onChange={(t) => dispatch({ type: 'SET', payload: { [screen.field]: t } })}
        onEnter={() => v.trim() && next()} />
    </ScreenWrap>
  )
}

function DateScreen({ screen, state, dispatch, next }) {
  const v = state.data.dob || ''
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!v} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <div className="rounded-2xl border border-nexuLine bg-white p-4">
        <input type="date" value={v}
          onChange={(e) => dispatch({ type: 'SET', payload: { dob: e.target.value } })}
          className="w-full text-[20px] font-medium text-nexuInk bg-transparent outline-none" />
      </div>
    </ScreenWrap>
  )
}

function GenderScreen({ screen, state, dispatch, next }) {
  const v = state.data.gender
  const opts = [
    { id: 'h', label: 'Hombre',     emoji: '👨' },
    { id: 'm', label: 'Mujer',      emoji: '👩' },
    { id: 'nb', label: 'No binario', emoji: '🧑' },
    { id: 'na', label: 'Prefiero no decirlo', emoji: '🌱' },
  ]
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!v} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <div className="grid grid-cols-2 gap-3">
        {opts.map(o => (
          <button key={o.id} onClick={() => dispatch({ type: 'SET', payload: { gender: o.id } })}
            className={cn('tap-44 rounded-2xl border p-4 flex flex-col items-center gap-2 transition',
              v === o.id ? 'shadow-tactile' : 'border-nexuLine hover:border-nexuInk/30')}
            style={v === o.id ? { borderColor: 'transparent', boxShadow: `0 0 0 3px ${RED}33, 0 8px 22px -12px rgba(15,18,38,0.18)` } : undefined}>
            <div className="text-3xl">{o.emoji}</div>
            <div className="text-[13px] font-semibold text-nexuInk">{o.label}</div>
          </button>
        ))}
      </div>
    </ScreenWrap>
  )
}

function EmailScreen({ screen, state, dispatch, next }) {
  const v = state.data.email || ''
  const valid = isEmail(v)
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!valid} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <TextField type="email" value={v} autoFocus placeholder="tucorreo@universidad.edu"
        onChange={(t) => dispatch({ type: 'SET', payload: { email: t } })}
        rightAdornment={v ? (valid
          ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-nexuCyanDeep"><I.check /></motion.div>
          : <span className="text-nexuRed text-[12px]">Revisa</span>) : null} />
      <div className="text-[12px] text-nexuInkSoft mt-3">{valid ? 'Formato válido. Te enviaremos un código de 6 dígitos al continuar.' : 'Preferiblemente institucional.'}</div>
    </ScreenWrap>
  )
}

function PasswordScreen({ screen, state, dispatch, next }) {
  const v = state.data.password || ''
  const [show, setShow] = useState(false)
  const s = passwordStrength(v)
  const labels = ['Vacía', 'Débil', 'Media', 'Buena', 'Fuerte']
  const colors = [`${RED}66`, RED, '#F59E0B', `${CYAN_SOFT}`, CYAN]
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={s < 2} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <TextField type={show ? 'text' : 'password'} value={v} autoFocus placeholder="Mínimo 8 caracteres"
        onChange={(t) => dispatch({ type: 'SET', payload: { password: t } })}
        rightAdornment={<button onClick={() => setShow(!show)} className="text-nexuInkSoft">{show ? <I.eyeOff /> : <I.eye />}</button>} />
      <div className="mt-4">
        <div className="flex gap-1.5">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= s ? colors[s] : '#E7E9F0' }} />
          ))}
        </div>
        <div className="text-[12px] mt-2" style={{ color: s >= 3 ? colors[4] : s === 0 ? '#5B6076' : colors[s] }}>{labels[s]}</div>
      </div>
    </ScreenWrap>
  )
}

function PasswordConfirmScreen({ screen, state, next }) {
  const [v, setV] = useState('')
  const ok = v === state.data.password && v.length > 0
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!ok} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <TextField type="password" value={v} autoFocus placeholder="Repite tu contraseña" onChange={setV}
        rightAdornment={ok && <I.check style={{ color: CYAN }} />} />
      {!ok && v.length > 0 && <div className="text-[12px] text-nexuRed mt-2">No coinciden todavía…</div>}
    </ScreenWrap>
  )
}

function OTPScreen({ screen, state, dispatch, next }) {
  const v = (state.data.otp || '').padEnd(6, ' ')
  const refs = useRef([])
  const set = (i, ch) => {
    if (!/^\d?$/.test(ch)) return
    const arr = (state.data.otp || '').split('')
    while (arr.length < 6) arr.push(' ')
    arr[i] = ch || ' '
    const next = arr.join('').replace(/\s+$/, '')
    dispatch({ type: 'SET', payload: { otp: next } })
    if (ch && i < 5) refs.current[i + 1]?.focus()
  }
  const filled = (state.data.otp || '').length === 6
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!filled} onClick={() => next()}>Verificar <I.arrowR /></PrimaryButton>}>
      <div className="flex gap-2 justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <input key={i} ref={(el) => (refs.current[i] = el)}
            value={v[i].trim()} onChange={(e) => set(i, e.target.value.slice(-1))}
            onKeyDown={(e) => { if (e.key === 'Backspace' && !v[i].trim() && i > 0) refs.current[i - 1]?.focus() }}
            inputMode="numeric" maxLength={1} autoFocus={i === 0}
            className="w-12 h-14 rounded-xl border-2 border-nexuLine text-center text-[22px] font-semibold text-nexuInk outline-none focus:border-nexuRed" />
        ))}
      </div>
      <div className="text-center text-[12px] text-nexuInkSoft mt-4">
        Código enviado a <span className="text-nexuInk font-medium">{state.data.email || 'tu correo'}</span>
      </div>
      <div className="text-center text-[12px] text-nexuInkSoft mt-2">¿No llegó? <span className="text-nexuRed font-semibold">Reenviar</span></div>
    </ScreenWrap>
  )
}

function AvatarUploadScreen({ screen, state, dispatch, next }) {
  const v = state.data.avatar
  const onPick = () => dispatch({ type: 'SET', payload: { avatar: 'YO' } })
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!v} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <div className="flex flex-col items-center my-2">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-nexuMist border-4 border-white shadow-tactile flex items-center justify-center"
            style={{ background: v ? `linear-gradient(135deg, ${RED}, ${CYAN})` : undefined }}>
            <div className="text-white text-[40px] font-semibold">{v || ''}</div>
            {!v && <I.camera style={{ color: '#5B6076' }} />}
          </div>
          <button onClick={onPick} className="tap-44 absolute -bottom-1 -right-1 w-11 h-11 rounded-full text-white shadow-tactile flex items-center justify-center" style={{ background: RED }}>
            <I.upload />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 w-full">
          <GhostButton onClick={onPick}><I.camera /> Cámara</GhostButton>
          <GhostButton onClick={onPick}><I.upload /> Galería</GhostButton>
        </div>
        <div className="text-[12px] text-nexuInkSoft mt-3">Optimizado por Cloudinary.</div>
      </div>
    </ScreenWrap>
  )
}

function TagPickerScreen({ screen, state, dispatch, next }) {
  const cur = state.data.interests || []
  const min = 5
  const toggle = (t) => {
    const set = new Set(cur); set.has(t) ? set.delete(t) : set.add(t)
    dispatch({ type: 'SET', payload: { interests: [...set] } })
  }
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={cur.length < min} onClick={() => next()}>
        {cur.length < min ? `Faltan ${min - cur.length}` : `Continuar (${cur.length})`} <I.arrowR />
      </PrimaryButton>}>
      <div className="flex flex-wrap gap-2">
        {INTEREST_TAGS.map(t => {
          const sel = cur.includes(t)
          return (
            <motion.button key={t} onClick={() => toggle(t)}
              whileTap={{ scale: 0.95 }}
              className={cn('tap-44 px-3.5 h-10 rounded-full border text-[13px] font-medium transition',
                sel ? 'text-white' : 'bg-white text-nexuInk border-nexuLine hover:border-nexuInk/30')}
              style={sel ? { background: RED, borderColor: RED } : undefined}
            >{t}</motion.button>
          )
        })}
      </div>
    </ScreenWrap>
  )
}
/* ===================== RENDERERS — fin parte A ===================== */

/* ===================== RENDERERS — B: identidad / sistema / fase 1 ===================== */

function UnescoAreaScreen({ screen, state, dispatch, next }) {
  const v = state.data.area
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!v} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <div className="grid grid-cols-2 gap-3">
        {UNESCO_AREAS.map(a => (
          <button key={a.id} onClick={() => dispatch({ type: 'SET', payload: { area: a.id, career: '' } })}
            className={cn('tap-44 rounded-2xl border p-4 flex flex-col items-start gap-1 transition',
              v === a.id ? 'shadow-tactile' : 'border-nexuLine hover:border-nexuInk/30')}
            style={v === a.id ? { borderColor: 'transparent', boxShadow: `0 0 0 3px ${RED}33, 0 8px 22px -12px rgba(15,18,38,0.18)` } : undefined}>
            <div className="text-2xl">{a.emoji}</div>
            <div className="text-[13.5px] font-semibold text-nexuInk leading-tight">{a.label}</div>
          </button>
        ))}
      </div>
    </ScreenWrap>
  )
}

function SearchPickerScreen({ screen, state, dispatch, next }) {
  const [q, setQ] = useState('')
  const list = screen.source === 'career'
    ? (state.data.area && CAREERS_BY_AREA[state.data.area]) || Object.values(CAREERS_BY_AREA).flat()
    : UNIVERSITIES
  const filtered = list.filter(x => x.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
  const v = state.data[screen.field]
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}
      footer={<PrimaryButton disabled={!v} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton>}>
      <TextField value={q} onChange={setQ} placeholder={screen.placeholder || 'Buscar…'} rightAdornment={<I.search style={{ color: '#5B6076' }} />} />
      <div className="mt-3 space-y-1.5 max-h-[280px] overflow-auto">
        {filtered.map(item => (
          <TactileCard dense key={item} selected={v === item}
            onClick={() => dispatch({ type: 'SET', payload: { [screen.field]: item } })}>
            <div className="text-[14px] font-medium text-nexuInk">{item}</div>
          </TactileCard>
        ))}
        {filtered.length === 0 && <div className="text-center text-[12px] text-nexuInkSoft py-6">Sin resultados</div>}
      </div>
    </ScreenWrap>
  )
}

function MirrorScreen({ screen, state, next }) {
  const name = state.data.name || 'Estudiante'
  return (
    <ScreenWrap kicker="Mirroring">
      <div className="flex flex-col items-center text-center my-6">
        <NexuLogo size={72} />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-6 text-[28px] font-semibold text-nexuInk leading-tight">¡Mucho gusto, <span style={{ color: RED }}>{name}</span>!</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-2 text-[15px] text-nexuInkSoft max-w-xs">Vamos a configurar tu espacio académico.</motion.div>
      </div>
      <div className="mt-auto"><PrimaryButton onClick={() => next()}>Vamos <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function AgeRevealScreen({ screen, state, next }) {
  const age = calcAge(state.data.dob) || 21
  return (
    <ScreenWrap kicker="Edad y relevancia">
      <div className="rounded-3xl border border-nexuLine p-8 text-center bg-white">
        <div className="text-[14px] text-nexuInkSoft">Tienes</div>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}
          className="text-[80px] font-semibold text-nexuInk leading-none my-2">{age}</motion.div>
        <div className="text-[14px] text-nexuInkSoft">años — la edad perfecta para expandir tu red.</div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function ImpactStatScreen({ screen, state, next }) {
  const hours = state.data.hours || 8
  const monthsLost = Math.max(1, Math.round((hours * 4 * 9) / (24 * 30)))
  return (
    <ScreenWrap kicker="La realidad en datos" title="Estás perdiendo meses de tu vida.">
      <div className="rounded-3xl p-6 text-white relative overflow-hidden mb-3" style={{ background: `linear-gradient(135deg, ${RED}, #7B0F12)` }}>
        <div className="text-[12px] opacity-80 uppercase tracking-wider">Tiempo perdido / año</div>
        <div className="text-[64px] font-semibold leading-none mt-1">~{monthsLost} <span className="text-[20px] opacity-80">meses</span></div>
        <div className="text-[13px] opacity-90 mt-2">Buscando dudas en internet.</div>
      </div>
      <div className="rounded-3xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${CYAN}, #0E5A60)` }}>
        <div className="text-[12px] opacity-80 uppercase tracking-wider">Con Nexu</div>
        <div className="text-[40px] font-semibold leading-none mt-1">~{Math.max(1, Math.round(monthsLost * 30 / 6))} <span className="text-[18px] opacity-80">días</span></div>
        <div className="text-[13px] opacity-90 mt-2">Reducción gracias a la red.</div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Quiero recuperar mi tiempo <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function AuthChoiceScreen({ screen, next }) {
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}>
      <div className="space-y-3">
        <PrimaryButton onClick={() => next()}>Crear cuenta con email <I.arrowR /></PrimaryButton>
        <PrimaryButton tone="cyan" onClick={() => next()}>Continuar con Google</PrimaryButton>
        <GhostButton onClick={() => next()}>Ya tengo cuenta · Iniciar sesión</GhostButton>
      </div>
    </ScreenWrap>
  )
}

function SuccessScreen({ screen, next }) {
  return (
    <ScreenWrap kicker={screen.kicker}>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="w-32 h-32 rounded-full flex items-center justify-center mb-6"
          style={{ background: `${RED}1A` }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25, type: 'spring' }}
            className="w-20 h-20 rounded-full flex items-center justify-center text-white"
            style={{ background: RED }}>
            <I.check style={{ width: 40, height: 40 }} />
          </motion.div>
        </motion.div>
        <h1 className="text-[26px] font-semibold text-nexuInk">{screen.title}</h1>
        <p className="text-[15px] text-nexuInkSoft mt-2">{screen.copy}</p>
      </div>
      <PrimaryButton onClick={() => next()}>{screen.cta || 'Continuar'} <I.arrowR /></PrimaryButton>
    </ScreenWrap>
  )
}

function PermissionScreen({ screen, dispatch, next }) {
  const [granted, setGranted] = useState(false)
  const accept = () => {
    setGranted(true)
    dispatch({ type: 'SET', payload: { [screen.field]: true } })
    setTimeout(() => next(), 600)
  }
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}>
      <div className="rounded-3xl border border-nexuLine p-8 flex flex-col items-center text-center bg-white">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: `${CYAN}22`, color: '#0D7B83' }}>
          {screen.icon === 'mic' ? <I.mic style={{ width: 36, height: 36 }} /> : <I.bell style={{ width: 36, height: 36 }} />}
        </div>
        <div className="text-[16px] font-semibold text-nexuInk mb-1">{screen.permTitle}</div>
        <div className="text-[13px] text-nexuInkSoft">{screen.permBody}</div>
      </div>
      <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
        <GhostButton onClick={() => next()}>Ahora no</GhostButton>
        <PrimaryButton onClick={accept} pulse={granted}>{granted ? '¡Activado!' : 'Permitir'}</PrimaryButton>
      </div>
    </ScreenWrap>
  )
}

function MedalClaimScreen({ screen, dispatch, next }) {
  const [claimed, setClaimed] = useState(false)
  const claim = () => { setClaimed(true); dispatch({ type: 'KARMA', amount: 10 }); setTimeout(() => next(), 900) }
  return (
    <ScreenWrap kicker="Tu primer logro" title={screen.title} copy={screen.copy}>
      <div className="flex flex-col items-center justify-center my-4">
        <motion.div animate={claimed ? { scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] } : { y: [0, -6, 0] }}
          transition={{ duration: claimed ? 0.6 : 2.2, repeat: claimed ? 0 : Infinity }}
          className="w-44 h-44 rounded-full flex items-center justify-center text-white relative"
          style={{ background: `radial-gradient(circle, ${CYAN}, #0E5A60)`, boxShadow: `0 0 0 8px ${CYAN}33, 0 22px 50px -10px ${CYAN}99` }}>
          <I.award style={{ width: 56, height: 56 }} />
          <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-white text-[11px] font-semibold text-nexuInk border border-nexuLine">PIONERO NEXU</div>
        </motion.div>
        {claimed && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-[14px] font-medium" style={{ color: CYAN }}>+10 Karma · ¡Reclamado!</motion.div>
        )}
      </div>
      <div className="mt-auto"><PrimaryButton tone="cyan" onClick={claim} disabled={claimed}>{claimed ? '¡Reclamado!' : 'Reclamar medalla'}</PrimaryButton></div>
    </ScreenWrap>
  )
}

function IdentitySummaryScreen({ screen, state, next }) {
  const d = state.data
  const area = UNESCO_AREAS.find(a => a.id === d.area)
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}>
      <div className="rounded-3xl border border-nexuLine p-5 bg-white">
        <div className="flex items-center gap-3">
          <Avatar init={d.avatar || (d.name?.[0] || 'Y') + (d.lastname?.[0] || 'O')} size={56} accent />
          <div>
            <div className="text-[16px] font-semibold text-nexuInk">{d.name || 'Estudiante'} {d.lastname || ''}</div>
            <div className="text-[12px] text-nexuInkSoft">{d.career || 'Carrera'} · Sem. {d.semester}</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {area && <Pill tone="red">{area.emoji} {area.label}</Pill>}
          {d.university && <Pill>{d.university}</Pill>}
          {(d.interests || []).slice(0, 4).map(t => <Pill key={t} tone="cyan">{t}</Pill>)}
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Se ve genial <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function HonorScreen({ screen, dispatch, next }) {
  const [agree, setAgree] = useState(false)
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}>
      <div className="rounded-3xl border border-nexuLine p-5 bg-nexuMist/40 text-[13.5px] text-nexuInkSoft leading-relaxed">
        En Nexu nos comprometemos al respeto académico, al apoyo mutuo y a un trato profesional. Nos cuidamos entre estudiantes:
        <ul className="mt-3 space-y-1.5 list-disc pl-5">
          <li>No promovemos plagio ni soluciones “al copiar/pegar”.</li>
          <li>Respetamos turnos en salas de voz.</li>
          <li>Reportamos comportamiento abusivo.</li>
        </ul>
      </div>
      <label className="mt-5 flex items-center gap-3">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
          className="w-5 h-5 rounded accent-[#FF3B3F]" />
        <span className="text-[14px] text-nexuInk">Acepto los términos de colaboración.</span>
      </label>
      <div className="mt-auto pt-6"><PrimaryButton disabled={!agree} onClick={() => { dispatch({ type: 'HONOR' }); next() }}>Acepto y continúo <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function ProgressLoadScreen({ screen, next }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const dur = screen.duration || 2600
    const start = Date.now()
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(100, Math.round((elapsed / dur) * 100))
      setPct(p)
      if (p >= 100) { clearInterval(id); setTimeout(() => next(), 280) }
    }, 60)
    return () => clearInterval(id)
  }, [])
  return (
    <ScreenWrap kicker={screen.kicker}>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <div className="relative w-40 h-40 mb-6">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#E7E9F0" strokeWidth="6" />
            <circle cx="50" cy="50" r="44" fill="none" stroke={RED} strokeWidth="6" strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 276.46} 276.46`} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[28px] font-semibold text-nexuInk">{pct}%</div>
        </div>
        <div className="text-[18px] font-semibold text-nexuInk">{screen.title}</div>
        <div className="text-[13.5px] text-nexuInkSoft mt-2 max-w-xs">{screen.copy}</div>
      </div>
    </ScreenWrap>
  )
}

function TutorialScreen({ screen, next }) {
  const targets = {
    wall:    { title: 'El Muro', icon: <I.msg />, desc: '“Aquí verás las dudas de tu facultad.”' },
    rooms:   { title: 'Salas Live', icon: <I.mic />, desc: '“Entra aquí para hablar con tus pares en vivo.”' },
    messages:{ title: 'Mensajería', icon: <I.send />, desc: '“Tus conexiones directas se guardan aquí.”' },
    profile: { title: 'Tu Perfil', icon: <I.users />, desc: '“Aquí controlas tu estatus académico.”' },
    roomBtn: { title: 'Sala Live', icon: <I.mic />, desc: 'Pulsa este botón para entrar a una sala.' },
    plus:    { title: 'Publicar', icon: <I.plus />, desc: 'Pulsa “+” para preguntar al instante.' },
  }
  const t = targets[screen.target] || targets.wall
  return (
    <ScreenWrap kicker="Tutorial">
      <div className="rounded-3xl border border-nexuLine p-6 bg-white relative overflow-hidden">
        <div className="absolute right-4 top-4 w-2 h-2 rounded-full" style={{ background: CYAN, boxShadow: `0 0 0 6px ${CYAN}33` }} />
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ background: RED }}>{t.icon}</div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-nexuInkSoft">Pantalla</div>
            <div className="text-[18px] font-semibold text-nexuInk">{t.title}</div>
          </div>
        </div>
        <div className="mt-4 text-[14px] text-nexuInk">{t.desc}</div>
        <div className="mt-5 grid grid-cols-4 gap-1">
          {['wall','rooms','messages','profile'].map(k => (
            <div key={k} className={cn('h-12 rounded-xl flex items-center justify-center',
              k === screen.target ? 'text-white' : 'bg-nexuMist text-nexuInkSoft')}
              style={k === screen.target ? { background: RED } : undefined}>
              {targets[k].icon}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Entendido <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function YesNoScreen({ screen, state, dispatch, next }) {
  const v = state.data.habits?.[screen.qid]
  const set = (val) => {
    dispatch({ type: 'SET', payload: { habits: { ...(state.data.habits || {}), [screen.qid]: val } } })
    setTimeout(() => next(), 220)
  }
  return (
    <ScreenWrap kicker={`Hábito ${screen.qid + 1}/10`} title={screen.title}>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <button onClick={() => set(true)}
          className={cn('tap-44 h-32 rounded-2xl border flex flex-col items-center justify-center text-[18px] font-semibold transition',
            v === true ? 'text-white' : 'bg-white text-nexuInk border-nexuLine')}
          style={v === true ? { background: RED, borderColor: RED } : undefined}>
          <span className="text-3xl mb-1">👍</span> Sí
        </button>
        <button onClick={() => set(false)}
          className={cn('tap-44 h-32 rounded-2xl border flex flex-col items-center justify-center text-[18px] font-semibold transition',
            v === false ? 'text-white' : 'bg-white text-nexuInk border-nexuLine')}
          style={v === false ? { background: '#0F1226', borderColor: '#0F1226' } : undefined}>
          <span className="text-3xl mb-1">👎</span> No
        </button>
      </div>
    </ScreenWrap>
  )
}

function PeerCarouselScreen({ screen, next }) {
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}>
      <div className="-mx-5 px-5 overflow-x-auto no-scrollbar">
        <div className="flex gap-3 pb-2">
          {PEERS.map(p => (
            <motion.div key={p.id} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: p.id * 0.05 }}
              className="min-w-[200px] rounded-3xl border border-nexuLine p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2">
                <Avatar init={p.init} accent />
                <div>
                  <div className="text-[14px] font-semibold text-nexuInk">{p.name}</div>
                  <div className="text-[11px] text-nexuInkSoft">{p.career}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Pill tone="red">{p.match}% match</Pill>
                {p.online && <span className="text-[10px] font-semibold text-nexuCyanDeep flex items-center gap-1">● EN VIVO</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-[12px] text-nexuInkSoft mt-3">45 estudiantes de tu carrera te están esperando.</div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Ya quiero conocerlos <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function KarmaGiftScreen({ screen, dispatch, next }) {
  const [claimed, setClaimed] = useState(false)
  const claim = () => { setClaimed(true); dispatch({ type: 'KARMA', amount: screen.amount || 50 }); setTimeout(() => next(), 700) }
  return (
    <ScreenWrap kicker="Regalo de bienvenida" title={screen.title} copy={screen.copy}>
      <div className="rounded-3xl p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${RED}, #2BD4DE)` }}>
        <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="text-[60px] mb-2">🎁</motion.div>
        <div className="text-[14px] opacity-90">+{screen.amount || 50} Karma para ti</div>
        <div className="text-[28px] font-semibold mt-1">¡Bienvenido a la red!</div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton tone="cyan" onClick={claim} disabled={claimed}>{claimed ? '¡Reclamado!' : `Reclamar +${screen.amount || 50} Karma`}</PrimaryButton></div>
    </ScreenWrap>
  )
}

function FeedHomeScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Estás en casa" title={screen.title}>
      <div className="space-y-3">
        <div className="rounded-2xl border border-nexuLine p-4 bg-white">
          <div className="flex items-center gap-2">
            <Avatar init="LM" />
            <div>
              <div className="text-[13px] font-semibold text-nexuInk">Lucía M. <span className="text-nexuInkSoft font-normal">· hace 3 min</span></div>
              <div className="text-[11px] text-nexuInkSoft">Ing. Informática · 5° sem.</div>
            </div>
          </div>
          <div className="text-[14px] text-nexuInk mt-3">¿Alguien entiende el Teorema de Bayes? Abriendo sala en 5 min 👋</div>
          <div className="mt-3 flex gap-2">
            <Pill tone="red"><I.heart /> 18</Pill>
            <Pill><I.msg /> 6</Pill>
            <Pill tone="cyan">EN VIVO pronto</Pill>
          </div>
        </div>
        <div className="rounded-2xl border border-nexuLine p-4 bg-white">
          <div className="text-[12px] text-nexuInkSoft uppercase tracking-wider">Sala live · Tu carrera</div>
          <div className="text-[15px] font-semibold text-nexuInk mt-1">Repaso Final Programación II</div>
          <div className="text-[12px] text-nexuInkSoft">42 escuchando · 5 hablando</div>
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Explorar mi feed <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}
/* ===================== fin parte B ===================== */

/* ===================== RENDERERS — C: Fase 2 (salas WebRTC, feed) ===================== */

function FeedFirstLookScreen({ screen, next }) {
  const posts = [
    { name: 'Andrés P.', init: 'AP', text: '¿Alguien entiende el Teorema de X? Sala abierta ahora.', tag: 'EN VIVO', tone: 'cyan' },
    { name: 'Camila R.', init: 'CR', text: 'Resumen de Anatomía aparato circulatorio (PDF)', tag: 'Salud' },
    { name: 'Diego H.',  init: 'DH', text: 'Repasando algoritmos de grafos esta noche, súmense.', tag: 'Programación' },
  ]
  return (
    <ScreenWrap title={screen.title} copy={screen.copy}>
      <div className="space-y-3 relative">
        {posts.map((p, i) => (
          <motion.div key={i} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 * i }}
            className="rounded-2xl border border-nexuLine p-4 bg-white">
            <div className="flex items-center gap-2">
              <Avatar init={p.init} />
              <div className="text-[13px] font-semibold text-nexuInk">{p.name}</div>
              <div className="ml-auto"><Pill tone={p.tone || 'mist'}>{p.tag}</Pill></div>
            </div>
            <div className="text-[14px] text-nexuInk mt-2">{p.text}</div>
          </motion.div>
        ))}
        <div className="absolute inset-x-0 -bottom-2 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Ver más <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function TooltipScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Tooltip">
      <div className="relative my-6 mx-auto">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-tactile" style={{ background: RED, boxShadow: `0 0 0 8px ${RED}33` }}>
          <I.mic />
        </div>
        <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto mt-4 max-w-[280px] rounded-2xl bg-nexuInk text-white text-[13.5px] p-4 shadow-tactile relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-nexuInk" />
          {screen.copy}
        </motion.div>
      </div>
      <div className="mt-auto"><PrimaryButton onClick={() => next()}>Entendido <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function TourCardScreen({ screen, next }) {
  return (
    <ScreenWrap kicker={`Beneficio · ${screen.tourIdx}/6`}>
      <div className="rounded-3xl p-6 text-white relative overflow-hidden mb-4" style={{ background: `linear-gradient(135deg, ${RED}, ${CYAN})` }}>
        <div className="text-[60px]">{screen.emoji}</div>
        <div className="text-[22px] font-semibold mt-1">{screen.title}</div>
        <div className="text-[14px] opacity-90 mt-2">{screen.copy}</div>
      </div>
      <div className="flex gap-1.5 justify-center">
        {[1,2,3,4,5,6].map(n => <div key={n} className={cn('h-1.5 rounded-full transition-all', n === screen.tourIdx ? 'w-6' : 'w-1.5')}
          style={{ background: n === screen.tourIdx ? RED : '#E7E9F0' }} />)}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Siguiente <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function LobbyScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Lobby de salas" title="Salas en vivo ahora">
      <div className="space-y-2.5">
        {ROOMS.map(r => (
          <button key={r.id} onClick={() => next()} className="tap-44 w-full text-left rounded-2xl border border-nexuLine bg-white p-4 hover:border-nexuInk/30 transition">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {r.live && <span className="w-2 h-2 rounded-full" style={{ background: CYAN, boxShadow: `0 0 0 4px ${CYAN}33` }} />}
                  <Pill tone={r.live ? 'cyan' : 'mist'}>{r.live ? 'EN VIVO' : 'Programada'}</Pill>
                  <Pill>{r.tag}</Pill>
                </div>
                <div className="text-[15px] font-semibold text-nexuInk mt-2">{r.title}</div>
                <div className="text-[12px] text-nexuInkSoft mt-1">{r.listeners} escuchando · {r.speakers} hablando</div>
              </div>
              <I.chevR style={{ color: '#5B6076' }} />
            </div>
          </button>
        ))}
      </div>
    </ScreenWrap>
  )
}

function AudioTestScreen({ screen, next }) {
  const [bars, setBars] = useState(Array.from({ length: 20 }, () => 6))
  useEffect(() => {
    const id = setInterval(() => setBars(b => b.map(() => 6 + Math.random() * 30)), 140)
    return () => clearInterval(id)
  }, [])
  return (
    <ScreenWrap kicker="Pre-vuelo" title={screen.title} copy={screen.copy}>
      <div className="rounded-3xl border border-nexuLine bg-white p-6">
        <div className="flex items-end gap-1 h-24 justify-center">
          {bars.map((h, i) => <div key={i} className="w-2 rounded-full" style={{ height: h, background: i % 3 === 0 ? RED : CYAN }} />)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-nexuMist p-3 flex items-center gap-2"><I.mic style={{ color: CYAN }} /><div className="text-[12px] font-medium text-nexuInk">Micrófono OK</div></div>
          <div className="rounded-xl bg-nexuMist p-3 flex items-center gap-2"><I.bell style={{ color: CYAN }} /><div className="text-[12px] font-medium text-nexuInk">Altavoz OK</div></div>
        </div>
        <div className="text-[12px] text-nexuInkSoft mt-3 text-center">Tu micro está silenciado por defecto.</div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton tone="cyan" pulse onClick={() => next()}>Entrar a la sala</PrimaryButton></div>
    </ScreenWrap>
  )
}

function LiveRoomScreen({ screen, next }) {
  const speakers = PEERS.slice(0, 6)
  const speakingIdx = screen.speakingIdx ?? 0
  const handRaised = !!screen.handRaised
  const reactions = screen.reactions
  return (
    <motion.div className="flex-1 flex flex-col px-5 pt-4 pb-6 relative" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
      <div className="rounded-3xl bg-nexuInk text-white p-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-livePulse" style={{ background: CYAN }} />
          <div className="text-[11px] uppercase tracking-wider opacity-80">EN VIVO</div>
          <div className="ml-auto text-[12px] opacity-80">42 escuchando</div>
        </div>
        <div className="text-[16px] font-semibold mt-1">Repaso Final · Programación II</div>
      </div>
      <div className="text-[11px] uppercase tracking-wider text-nexuInkSoft mb-2">Hablando ahora</div>
      <div className="grid grid-cols-3 gap-3 mb-4 relative">
        {speakers.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center">
            <div className={cn('relative')}>
              <div className={cn('w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold')}
                style={{ background: `linear-gradient(135deg, ${i === speakingIdx ? CYAN : '#3A3F5C'}, ${i === speakingIdx ? '#0E5A60' : '#5B6076'})` }}>{s.init}</div>
              {i === speakingIdx && (
                <motion.div className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{ boxShadow: [`0 0 0 0px ${CYAN}99`, `0 0 0 14px ${CYAN}00`] }}
                  transition={{ duration: 1.4, repeat: Infinity }} />
              )}
              {handRaised && i === 5 && (
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: `0 4px 10px rgba(0,0,0,0.12)` }}>
                  <I.hand style={{ color: RED }} />
                </div>
              )}
            </div>
            <div className="text-[11px] mt-1.5 font-medium text-nexuInk truncate max-w-[80px] text-center">{s.name}</div>
            {i === speakingIdx && <div className="text-[9px] text-nexuCyanDeep font-semibold">HABLANDO</div>}
          </div>
        ))}
      </div>
      {reactions && (
        <div className="flex gap-3 justify-center my-2">
          {['🔥','👏','💡'].map((e, i) => (
            <motion.div key={i} initial={{ y: 0, opacity: 0 }} animate={{ y: -40, opacity: [0, 1, 0] }} transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity }} className="text-3xl">{e}</motion.div>
          ))}
        </div>
      )}
      <div className="text-[11px] uppercase tracking-wider text-nexuInkSoft mb-2 mt-2">Oyentes (36)</div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {Array.from({ length: 14 }).map((_, i) => <Avatar key={i} init={['JL','RC','MA','TP','SE','AB','OM','VB','CD','XY','ZW','LK','OP','QU'][i]} size={32} />)}
      </div>
      {screen.notif && (
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-xl bg-nexuMist p-3 text-[12.5px] text-nexuInk border border-nexuLine">{screen.notif}</motion.div>
      )}
      <div className="mt-auto pt-3 grid grid-cols-4 gap-2">
        <button className="tap-44 h-12 rounded-2xl bg-nexuMist text-nexuInk flex items-center justify-center"><I.micOff /></button>
        <button className="tap-44 h-12 rounded-2xl bg-white border border-nexuLine flex items-center justify-center"><I.hand style={{ color: handRaised ? RED : '#5B6076' }} /></button>
        <button className="tap-44 h-12 rounded-2xl bg-white border border-nexuLine flex items-center justify-center"><span>😊</span></button>
        <button onClick={() => next()} className="tap-44 h-12 rounded-2xl text-white flex items-center justify-center font-semibold" style={{ background: RED }}>Salir</button>
      </div>
    </motion.div>
  )
}

function RoomUploadScreen({ screen, next }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPct(p => Math.min(100, p + 7)), 90)
    return () => clearInterval(id)
  }, [])
  useEffect(() => { if (pct >= 100) setTimeout(() => next(), 600) }, [pct])
  return (
    <ScreenWrap kicker="Compartir recurso" title={screen.title} copy={screen.copy}>
      <div className="rounded-3xl border border-nexuLine bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: RED }}><I.file /></div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-nexuInk">esquema_estudio.pdf</div>
            <div className="text-[11px] text-nexuInkSoft">Cloudinary · 1.2 MB</div>
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-nexuLine overflow-hidden">
          <div className="h-full" style={{ width: `${pct}%`, background: RED }} />
        </div>
        <div className="text-[12px] text-nexuInkSoft mt-2">{pct < 100 ? `Subiendo… ${pct}%` : 'Compartido en sala ✓'}</div>
      </div>
    </ScreenWrap>
  )
}

function Rating5Screen({ screen, state, dispatch, next }) {
  const opts = [
    { v: 1, e: '😞', l: 'Mala' }, { v: 2, e: '😕', l: 'Floja' }, { v: 3, e: '😐', l: 'Neutra' },
    { v: 4, e: '😊', l: 'Buena' }, { v: 5, e: '😍', l: 'Increíble' },
  ]
  return (
    <ScreenWrap kicker="Termómetro de satisfacción" title={screen.title} copy={screen.copy}>
      <div className="grid grid-cols-5 gap-2">
        {opts.map(o => {
          const sel = state.data.expRating === o.v
          return (
            <button key={o.v} onClick={() => dispatch({ type: 'SET', payload: { expRating: o.v } })}
              className={cn('tap-44 rounded-2xl border p-2 flex flex-col items-center gap-1 transition',
                sel ? 'shadow-tactile' : 'border-nexuLine')}
              style={sel ? { borderColor: 'transparent', boxShadow: `0 0 0 3px ${o.v >= 4 ? CYAN : RED}33, 0 8px 22px -12px rgba(15,18,38,0.18)` } : undefined}>
              <div className="text-3xl">{o.e}</div>
              <div className="text-[10px] text-nexuInkSoft">{o.l}</div>
            </button>
          )
        })}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton disabled={!state.data.expRating} onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function StoreJumpScreen({ screen, next }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { const id = setTimeout(() => setOpen(true), 500); return () => clearTimeout(id) }, [])
  return (
    <ScreenWrap kicker="Calificación" title={screen.title} copy={screen.copy}>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            className="rounded-2xl border border-nexuLine bg-white p-5 shadow-tactile">
            <div className="text-[14px] font-semibold text-nexuInk text-center">¿Te gusta Nexu?</div>
            <div className="text-[12px] text-nexuInkSoft text-center mt-1">Califica esta aplicación</div>
            <div className="flex gap-1.5 justify-center my-4">
              {[1,2,3,4,5].map(n => <I.star key={n} style={{ color: '#F59E0B', width: 28, height: 28 }} />)}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <GhostButton onClick={() => next()}>Ahora no</GhostButton>
              <PrimaryButton tone="cyan" onClick={() => next()}>Calificar</PrimaryButton>
            </div>
            <div className="text-[10px] text-nexuInkSoft text-center mt-3">Ventana nativa de la Store · iOS / Android</div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrap>
  )
}

function PararrayosScreen({ screen, state, dispatch, next }) {
  const v = state.data.complaint || ''
  return (
    <ScreenWrap kicker="Pararrayos" title={screen.title} copy={screen.copy}>
      <textarea value={v} onChange={(e) => dispatch({ type: 'SET', payload: { complaint: e.target.value } })}
        rows={5} placeholder="¿Qué te falta o qué encontraste?"
        className="w-full rounded-2xl border border-nexuLine bg-white p-4 text-[14px] text-nexuInk outline-none focus:border-nexuInk resize-none" />
      <div className="text-[11px] text-nexuInkSoft mt-2">Tu opinión va directo al equipo de desarrollo. Privado.</div>
      <div className="mt-auto pt-6"><PrimaryButton disabled={!v.trim()} onClick={() => next()}>Enviar feedback <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function ComposerScreen({ screen, next }) {
  const [text, setText] = useState('')
  return (
    <ScreenWrap kicker="Crear publicación" title="¿Qué duda tienes hoy?">
      <div className="rounded-2xl border border-nexuLine bg-white p-4">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Pregunta a tu facultad…" rows={5}
          className="w-full bg-transparent text-[15px] outline-none resize-none text-nexuInk" />
        <div className="flex gap-2 mt-2 flex-wrap">
          {['Cálculo','Programación','Tesis'].map(t => <Pill key={t} tone="red">#{t}</Pill>)}
        </div>
        <div className="mt-3 flex gap-2 justify-end">
          <button className="tap-44 w-10 h-10 rounded-xl bg-nexuMist flex items-center justify-center"><I.paperclip /></button>
          <button className="tap-44 w-10 h-10 rounded-xl bg-nexuMist flex items-center justify-center"><I.camera /></button>
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton disabled={text.length < 5} onClick={() => next()}>Publicar duda <I.send /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function TagSuggestScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Etiquetado inteligente" title="La IA sugiere etiquetas" copy={`"Parece que hablas de Cálculo Integral, ¿quieres etiquetar esta área?"`}>
      <div className="rounded-2xl border-2 p-4 bg-white" style={{ borderColor: CYAN, boxShadow: `0 0 0 4px ${CYAN}22` }}>
        <div className="text-[12px] uppercase tracking-wider text-nexuCyanDeep font-semibold mb-2">Sugerido</div>
        <div className="flex flex-wrap gap-2">
          {['#CálculoIntegral','#Matemáticas','#Análisis'].map(t => <Pill key={t} tone="cyan">{t}</Pill>)}
        </div>
      </div>
      <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
        <GhostButton onClick={() => next()}>Mejor no</GhostButton>
        <PrimaryButton tone="cyan" onClick={() => next()}>Sí, etiquetar</PrimaryButton>
      </div>
    </ScreenWrap>
  )
}

function WallActionScreen({ screen, next }) {
  const map = {
    like:    { icon: <I.heart />,    color: RED,  label: 'Me gusta',  copy: 'Tu “like” les dice a tus pares qué contenido vale la pena.' },
    comment: { icon: <I.msg />,      color: RED,  label: 'Comentar',  copy: 'Comenta para sumar al hilo de la duda y crecer juntos.' },
    save:    { icon: <I.bookmark />, color: CYAN, label: 'Guardar',   copy: 'Guarda recursos en tu biblioteca académica para repasar luego.' },
    share:   { icon: <I.send />,     color: CYAN, label: 'Compartir', copy: 'Comparte con tu grupo para resolver entre todos.' },
    report:  { icon: <I.flag />,     color: RED,  label: 'Reportar',  copy: 'Mantén Nexu sano. Reporta contenido fuera de lugar.' },
    follow:  { icon: <I.users />,    color: RED,  label: 'Seguir',    copy: 'Sigue a quien aporta valor a tu carrera.' },
    award:   { icon: <I.award />,    color: CYAN, label: 'Premiar',   copy: 'Da Karma a quien resolvió tu duda.' },
  }
  const a = map[screen.action] || map.like
  return (
    <ScreenWrap kicker="Acción de muro" title={a.label} copy={a.copy}>
      <div className="rounded-2xl border border-nexuLine bg-white p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ background: a.color }}>{a.icon}</div>
        <div className="flex-1 text-[14px] text-nexuInk">Estado <span className="font-semibold">activo</span> en Rojo Neón al pasar el cursor o tocar.</div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Probado <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function SocketNotifScreen({ screen, next }) {
  return (
    <ScreenWrap>
      <div className="flex-1 flex items-start justify-center">
        <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className="rounded-2xl border border-nexuLine bg-white p-4 shadow-tactile w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white" style={{ background: CYAN }}><I.bell /></div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-nexuInk">¡Alguien respondió a tu duda en tiempo real!</div>
              <div className="text-[11px] text-nexuInkSoft mt-0.5">Socket.io · hace 1 segundo</div>
            </div>
          </div>
        </motion.div>
      </div>
      <PrimaryButton onClick={() => next()}>Ver respuesta <I.arrowR /></PrimaryButton>
    </ScreenWrap>
  )
}

function DaySummaryScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Resumen del día" title="Hoy aprendiste 3 cosas nuevas y conectaste con 5 pares.">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4 text-white" style={{ background: RED }}>
          <div className="text-[12px] opacity-90 uppercase tracking-wider">Aprendizajes</div>
          <div className="text-[40px] font-semibold mt-1 leading-none">3</div>
        </div>
        <div className="rounded-2xl p-4 text-white" style={{ background: CYAN }}>
          <div className="text-[12px] opacity-90 uppercase tracking-wider">Conexiones</div>
          <div className="text-[40px] font-semibold mt-1 leading-none">5</div>
        </div>
        <div className="rounded-2xl p-4 col-span-2 border border-nexuLine bg-white">
          <div className="text-[12px] uppercase tracking-wider text-nexuInkSoft">Karma ganado hoy</div>
          <div className="text-[28px] font-semibold text-nexuInk leading-none mt-1">+25</div>
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Cerrar resumen <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

/* ===================== fin parte C ===================== */

/* ===================== RENDERERS — D: Fase 3 (chat / grupos / networking) ===================== */

function MatchNotifScreen({ screen, next }) {
  return (
    <ScreenWrap>
      <div className="flex-1 flex items-center justify-center">
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className="rounded-3xl border border-nexuLine bg-white p-5 shadow-tactile w-full">
          <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: RED }}>Match académico</div>
          <div className="flex items-center gap-3 mt-2">
            <Avatar init="LM" size={56} accent />
            <div>
              <div className="text-[16px] font-semibold text-nexuInk">A Lucía M. le interesó tu duda</div>
              <div className="text-[12px] text-nexuInkSoft">Ing. Informática · 92% match</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <GhostButton onClick={() => next()}>Más tarde</GhostButton>
            <PrimaryButton onClick={() => next()}>Saludar <I.send /></PrimaryButton>
          </div>
        </motion.div>
      </div>
    </ScreenWrap>
  )
}

function InboxEmptyScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Inbox de Nexu" title="Tus futuras colaboraciones empiezan aquí.">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="relative">
          <Avatar init="A" size={64} accent />
          <I.link style={{ color: CYAN, position: 'absolute', top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }} />
          <Avatar init="B" size={64} accent />
        </div>
        <div className="mt-6 text-[14px] text-nexuInkSoft max-w-xs">Cuando inicies una conversación o recibas un mensaje, aparecerá aquí.</div>
      </div>
      <PrimaryButton onClick={() => next()}>Buscar a alguien <I.search /></PrimaryButton>
    </ScreenWrap>
  )
}

function PeerProfileScreen({ screen, next }) {
  const p = PEERS[0]
  return (
    <ScreenWrap kicker="Perfil del par">
      <div className="rounded-3xl border border-nexuLine bg-white p-5">
        <div className="flex items-center gap-3">
          <Avatar init={p.init} size={56} accent />
          <div>
            <div className="text-[16px] font-semibold text-nexuInk">{p.name}</div>
            <div className="text-[12px] text-nexuInkSoft">{p.career} · 6° sem.</div>
          </div>
          <div className="ml-auto"><Pill tone="red">{p.match}% match</Pill></div>
        </div>
        <div className="mt-4 text-[13.5px] text-nexuInk">Bio: “Apasionada por React y la enseñanza entre pares. Pregunta sin miedo.”</div>
        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-wider text-nexuInkSoft mb-2">Top habilidades</div>
          <div className="flex flex-wrap gap-1.5">
            {['React','TypeScript','Algoritmos','Cálculo','Inglés C1'].map(t => <Pill key={t} tone="cyan">{t}</Pill>)}
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
        <GhostButton onClick={() => next()}>Ver más</GhostButton>
        <PrimaryButton onClick={() => next()}>Enviar mensaje <I.send /></PrimaryButton>
      </div>
    </ScreenWrap>
  )
}

function IceBreakerScreen({ screen, dispatch, next }) {
  const [sel, setSel] = useState(null)
  const send = () => {
    dispatch({ type: 'SET', payload: { iceMessage: ICEBREAKERS[sel] } })
    next()
  }
  return (
    <ScreenWrap kicker="Primer mensaje" title="Rompe el hielo" copy="Elige una frase pre-hecha o crea la tuya.">
      <div className="space-y-2">
        {ICEBREAKERS.map((t, i) => (
          <TactileCard key={i} dense selected={sel === i} onClick={() => setSel(i)}>
            <div className="text-[13.5px] text-nexuInk">{t}</div>
          </TactileCard>
        ))}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton disabled={sel === null} onClick={send}>Enviar saludo <I.send /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function ChatScreen({ screen, state, next }) {
  const [msgs, setMsgs] = useState([
    { from: 'me', text: state.data.iceMessage || '¡Hola! ¿Tienes 5 min para una duda?' },
  ])
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(true)
  useEffect(() => {
    const t1 = setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { from: 'them', text: '¡Hola! Claro, dime 👋' }])
    }, 1600)
    return () => clearTimeout(t1)
  }, [])
  const send = () => {
    if (!text.trim()) return
    setMsgs(m => [...m, { from: 'me', text }])
    setText('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { from: 'them', text: 'Va, te lo paso ahora 🔥' }])
    }, 1300)
  }
  return (
    <motion.div className="flex-1 flex flex-col px-5 pt-4 pb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center gap-2 pb-3 border-b border-nexuLine">
        <Avatar init="LM" accent />
        <div>
          <div className="text-[14px] font-semibold text-nexuInk">Lucía M.</div>
          <div className="text-[11px] text-nexuCyanDeep flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-nexuCyanDeep" /> en línea · Socket.io</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-3 space-y-2">
        {msgs.map((m, i) => (
          <motion.div key={i} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className={cn('max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug',
              m.from === 'me' ? 'ml-auto text-white' : 'bg-nexuMist text-nexuInk')}
            style={m.from === 'me' ? { background: RED } : undefined}>
            {m.text}
            {m.from === 'me' && <span className="ml-2 text-[10px] opacity-90">✓✓</span>}
          </motion.div>
        ))}
        {typing && (
          <motion.div className="bg-nexuMist text-nexuInk rounded-2xl px-3.5 py-2.5 max-w-[60px] flex items-center gap-1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[0,1,2].map(i => (
              <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-nexuInkSoft"
                animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
            ))}
          </motion.div>
        )}
      </div>
      <div className="rounded-2xl border border-nexuLine bg-white px-2 h-12 flex items-center gap-2">
        <button className="tap-44 w-10 h-10 rounded-xl flex items-center justify-center text-nexuInkSoft"><I.paperclip /></button>
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Escribe…" className="flex-1 bg-transparent outline-none text-[14px] text-nexuInk" />
        <button onClick={send} className="tap-44 w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: RED }}><I.send /></button>
      </div>
      <div className="mt-3"><GhostButton onClick={() => next()}>Continuar onboarding →</GhostButton></div>
    </motion.div>
  )
}

function ChatMultimediaScreen({ screen, next }) {
  const items = {
    photo: { icon: <I.camera />, label: 'Foto del ejercicio', body: 'Adjunta la imagen del problema directamente desde la cámara.' },
    voice: { icon: <I.mic />,    label: 'Nota de voz',         body: 'Explica con tu voz lo que un texto no alcanza.' },
    pdf:   { icon: <I.file />,   label: 'Documento PDF',       body: 'Comparte apuntes o resumen vía Cloudinary.' },
    link:  { icon: <I.link />,   label: 'Enlace',              body: 'Manda un recurso externo con previsualización.' },
    code:  { icon: <I.bolt />,   label: 'Snippet de código',   body: 'Resaltado de sintaxis automático.' },
  }
  const it = items[screen.kindMM] || items.photo
  return (
    <ScreenWrap kicker="Multimedia en chat" title={it.label} copy={it.body}>
      <div className="rounded-2xl bg-nexuMist p-4 border border-nexuLine flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: RED }}>{it.icon}</div>
        <div className="flex-1 text-[12.5px] text-nexuInk">Vista previa Cloudinary lista para enviar.</div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Compartir <I.send /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function MsgReactionsScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Reacciones" title="Long-press en un mensaje">
      <div className="rounded-2xl bg-nexuMist p-3 max-w-[80%] mb-4 text-[14px] text-nexuInk">Esa fórmula la entendí leyendo tu nota. ¡Genio!</div>
      <div className="flex gap-2">
        {['💡','🙏','🔥'].map((e, i) => (
          <motion.button key={i} whileTap={{ scale: 0.9 }} className="tap-44 px-3 h-12 rounded-2xl bg-white border border-nexuLine flex items-center gap-1.5 text-[14px] font-medium"
            onClick={() => next()}>
            <span className="text-xl">{e}</span>
            <span className="text-nexuInk">{['Genio','Gracias','Crack'][i]}</span>
          </motion.button>
        ))}
      </div>
      <div className="mt-auto pt-6"><GhostButton onClick={() => next()}>Continuar →</GhostButton></div>
    </ScreenWrap>
  )
}

function BlockReportScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Seguridad" title={screen.title} copy={screen.copy}>
      <div className="space-y-2">
        {[
          { i: <I.flag />, t: 'Reportar comportamiento' },
          { i: <I.x />,    t: 'Bloquear estudiante' },
          { i: <I.bell />, t: 'Silenciar conversación' },
        ].map((o, k) => (
          <TactileCard key={k} onClick={() => next()}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nexuMist flex items-center justify-center text-nexuInk">{o.i}</div>
              <div className="text-[14px] font-medium text-nexuInk">{o.t}</div>
              <I.chevR style={{ marginLeft: 'auto', color: '#5B6076' }} />
            </div>
          </TactileCard>
        ))}
      </div>
      <div className="mt-auto pt-6"><GhostButton onClick={() => next()}>Cerrar</GhostButton></div>
    </ScreenWrap>
  )
}

function GroupInviteScreen({ screen, next }) {
  return (
    <ScreenWrap>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl bg-white border border-nexuLine p-5 shadow-tactile">
        <div className="text-[11px] uppercase tracking-wider text-nexuRed font-semibold">Invitación · Tu carrera</div>
        <div className="text-[20px] font-semibold text-nexuInk mt-1">Únete al grupo de Ing. Informática</div>
        <div className="text-[13px] text-nexuInkSoft mt-1">87 estudiantes ya están dentro.</div>
        <div className="mt-4 flex -space-x-2">
          {['LM','AP','CR','DH','SV'].map((i, k) => <Avatar key={k} init={i} size={36} accent={k % 2 === 0} />)}
          <div className="w-9 h-9 rounded-full bg-nexuMist border border-white flex items-center justify-center text-[11px] font-semibold text-nexuInk">+82</div>
        </div>
      </motion.div>
      <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
        <GhostButton onClick={() => next()}>Más tarde</GhostButton>
        <PrimaryButton onClick={() => next()}>Unirme <I.users /></PrimaryButton>
      </div>
    </ScreenWrap>
  )
}

function GroupCreateScreen({ screen, state, dispatch, next }) {
  const n = state.data.groupName, p = state.data.groupPurpose
  return (
    <ScreenWrap kicker="Crear grupo" title={screen.title}>
      <div className="space-y-3">
        <TextField value={n || ''} placeholder="Ej. Repaso Final · Programación II"
          onChange={(t) => dispatch({ type: 'SET', payload: { groupName: t } })} />
        <textarea value={p || ''} onChange={(e) => dispatch({ type: 'SET', payload: { groupPurpose: e.target.value } })}
          rows={3} placeholder="Propósito breve…"
          className="w-full rounded-2xl border border-nexuLine bg-white p-4 text-[14px] text-nexuInk outline-none focus:border-nexuInk resize-none" />
      </div>
      <div className="mt-auto pt-6"><PrimaryButton disabled={!(n && p)} onClick={() => next()}>Crear grupo <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function MemberSelectScreen({ screen, next }) {
  const [picks, setPicks] = useState([])
  const toggle = (id) => setPicks(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  return (
    <ScreenWrap kicker="Selector inteligente" title="Invita a expertos en tu área" copy="La IA sugiere por afinidad académica.">
      <div className="space-y-2">
        {PEERS.slice(0, 6).map(p => {
          const sel = picks.includes(p.id)
          return (
            <button key={p.id} onClick={() => toggle(p.id)}
              className={cn('tap-44 w-full rounded-2xl border bg-white p-3 flex items-center gap-3 transition',
                sel ? 'border-transparent shadow-tactile' : 'border-nexuLine hover:border-nexuInk/30')}
              style={sel ? { boxShadow: `0 0 0 3px ${RED}33, 0 8px 22px -12px rgba(15,18,38,0.18)` } : undefined}>
              <Avatar init={p.init} accent />
              <div className="flex-1 text-left">
                <div className="text-[14px] font-semibold text-nexuInk">{p.name}</div>
                <div className="text-[11px] text-nexuInkSoft">Experto en {p.skill}</div>
              </div>
              <Pill tone="red">{p.match}%</Pill>
            </button>
          )
        })}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton disabled={picks.length === 0} onClick={() => next()}>Invitar {picks.length} <I.send /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function GroupWallScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Muro del grupo" title={screen.title || 'Grupo: Repaso Final · Programación II'}>
      <div className="rounded-2xl border-2 p-3 bg-white mb-3 flex items-start gap-3" style={{ borderColor: RED }}>
        <div className="text-2xl">📌</div>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-wider text-nexuRed font-semibold">Anclado</div>
          <div className="text-[14px] font-semibold text-nexuInk">Examen final: 28 de mayo · 9:00 AM · Aula 302</div>
        </div>
      </div>
      <div className="space-y-3">
        {[
          { name: 'Andrés P.', text: 'Subí el resumen del cap. 7 a la biblioteca del grupo.', time: 'hace 12 min' },
          { name: 'Lucía M.',  text: 'Sala de voz hoy 21:00 — repaso de ejercicios 4-9.',     time: 'hace 1 h' },
        ].map((m, i) => (
          <div key={i} className="rounded-2xl border border-nexuLine bg-white p-4">
            <div className="flex items-center gap-2"><Avatar init={m.name.split(' ').map(x => x[0]).join('')} size={36} /><div className="text-[13px] font-semibold text-nexuInk">{m.name}</div><div className="ml-auto text-[11px] text-nexuInkSoft">{m.time}</div></div>
            <div className="text-[14px] text-nexuInk mt-2">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Publicar aviso <I.plus /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function GroupTaskScreen({ screen, next }) {
  const [tasks, setTasks] = useState([
    { t: 'Repasar tema 1', d: false },
    { t: 'Hacer esquema',  d: true },
    { t: 'Subir PDF al grupo', d: false },
    { t: 'Probar ejercicios 4–9', d: false },
  ])
  return (
    <ScreenWrap kicker="Mini-tareas del grupo" title={screen.title || 'Tareas colaborativas'}>
      <div className="rounded-2xl border border-nexuLine bg-white divide-y divide-nexuLine">
        {tasks.map((t, i) => (
          <button key={i} onClick={() => setTasks(arr => arr.map((x, k) => k === i ? { ...x, d: !x.d } : x))}
            className="tap-44 w-full px-4 py-3 flex items-center gap-3 text-left">
            <div className={cn('w-6 h-6 rounded-md border-2 flex items-center justify-center', t.d ? 'border-transparent text-white' : 'border-nexuLine')}
              style={t.d ? { background: CYAN } : undefined}>{t.d && <I.check />}</div>
            <div className={cn('text-[14px] flex-1', t.d ? 'line-through text-nexuInkSoft' : 'text-nexuInk')}>{t.t}</div>
            <Avatar init={['LM','AP','DH','CR'][i]} size={26} />
          </button>
        ))}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function FomoNotifScreen({ screen, next }) {
  return (
    <ScreenWrap>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-2xl bg-nexuInk text-white p-4 shadow-tactile">
        <div className="text-[11px] uppercase tracking-wider opacity-80" style={{ color: CYAN }}>Push · Hace un momento</div>
        <div className="text-[14px] font-semibold mt-1">3 miembros de tu grupo están en una sala de voz ahora.</div>
        <PrimaryButton tone="cyan" onClick={() => next()}>Unirme a ellos</PrimaryButton>
      </motion.div>
      <div className="mt-auto pt-6"><GhostButton onClick={() => next()}>Ignorar →</GhostButton></div>
    </ScreenWrap>
  )
}

function SharedFilesScreen({ screen, next }) {
  const files = [
    { name: 'esquema_estudio.pdf', size: '1.2 MB', date: 'Hoy', icon: <I.file /> },
    { name: 'apuntes_cap7.pdf',    size: '2.4 MB', date: 'Ayer', icon: <I.file /> },
    { name: 'ejercicios_resueltos.png', size: '800 KB', date: '13 may', icon: <I.camera /> },
  ]
  return (
    <ScreenWrap kicker="Biblioteca del grupo" title={screen.title || 'Archivos compartidos'}>
      <div className="space-y-2">
        {files.map((f, i) => (
          <TactileCard key={i} dense onClick={() => next()}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nexuMist flex items-center justify-center text-nexuInk">{f.icon}</div>
              <div className="flex-1">
                <div className="text-[13.5px] font-medium text-nexuInk">{f.name}</div>
                <div className="text-[11px] text-nexuInkSoft">{f.size} · {f.date}</div>
              </div>
            </div>
          </TactileCard>
        ))}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Subir archivo <I.upload /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function SearchInputScreen({ screen, next }) {
  const [q, setQ] = useState('')
  return (
    <ScreenWrap kicker="Buscador global" title="Encuentra estudiantes" copy="Busca por habilidad, carrera o universidad.">
      <TextField value={q} onChange={setQ} placeholder='Ej. "Python" o "Medicina"' rightAdornment={<I.search style={{ color: '#5B6076' }} />} autoFocus />
      <div className="mt-4 flex flex-wrap gap-2">
        {['Universidad','Carrera','Habilidad','Semestre'].map(f => <Pill key={f}>{f}</Pill>)}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Buscar <I.search /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function SearchResultsScreen({ screen, next }) {
  const showcase = PEERS.slice(0, 5)
  return (
    <ScreenWrap kicker="Resultados" title={`${showcase.length} estudiantes encontrados`}>
      <div className="space-y-2">
        {showcase.map(p => (
          <TactileCard dense key={p.id} onClick={() => next()}>
            <div className="flex items-center gap-3">
              <Avatar init={p.init} />
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold text-nexuInk">{p.name}</div>
                <div className="text-[11px] text-nexuInkSoft">{p.career}</div>
                <div className="flex gap-1 mt-1.5"><Pill tone="red">{p.skill}</Pill>{p.online && <Pill tone="cyan">EN VIVO</Pill>}</div>
              </div>
              <I.chevR style={{ color: '#5B6076' }} />
            </div>
          </TactileCard>
        ))}
      </div>
      <div className="mt-auto pt-6"><GhostButton onClick={() => next()}>Continuar →</GhostButton></div>
    </ScreenWrap>
  )
}

function WeeklyHighlightScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Estudiante destacado" title="Sugerencia de la semana">
      <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${CYAN}, #0E5A60)` }}>
        <div className="absolute top-3 right-3 text-2xl">🌟</div>
        <div className="flex items-center gap-3">
          <Avatar init="AP" size={64} />
          <div>
            <div className="text-[18px] font-semibold">Andrés P.</div>
            <div className="text-[12px] opacity-90">Ing. Industrial · Karma 1820</div>
          </div>
        </div>
        <div className="text-[13px] opacity-90 mt-3">“He resuelto 64 dudas y dirigido 12 salas este mes.”</div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton tone="cyan" onClick={() => next()}>Conectar <I.send /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function QrScanScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Conectar por QR" title="Escanea el perfil de un amigo">
      <div className="rounded-3xl bg-nexuInk text-white p-6 relative overflow-hidden aspect-square flex items-center justify-center">
        <motion.div animate={{ y: [-100, 100] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
          className="absolute inset-x-6 h-1 rounded-full" style={{ background: RED, boxShadow: `0 0 30px 4px ${RED}` }} />
        <div className="absolute inset-6 border-2 rounded-2xl" style={{ borderColor: CYAN }} />
        <div className="text-center">
          <I.qr style={{ width: 100, height: 100, color: 'white', opacity: 0.85 }} />
          <div className="text-[12px] opacity-80 mt-3">Apunta al QR del marco Nexu</div>
        </div>
      </div>
      <div className="mt-auto pt-6"><GhostButton onClick={() => next()}>Cerrar cámara →</GhostButton></div>
    </ScreenWrap>
  )
}

function ConnectionsSummaryScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Resumen de conexiones" title="Has ampliado tu red en un 15% esta semana.">
      <div className="rounded-3xl border border-nexuLine bg-white p-5">
        <div className="flex items-center gap-2 justify-center my-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div key={i} className="w-3 h-3 rounded-full"
              animate={{ scale: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, delay: i * 0.08, repeat: Infinity }}
              style={{ background: i < 7 ? RED : CYAN }} />
          ))}
        </div>
        <div className="grid grid-cols-3 text-center">
          {[{n:7,l:'Pares'},{n:3,l:'Grupos'},{n:2,l:'Salas'}].map((s, i) => (
            <div key={i}><div className="text-[26px] font-semibold text-nexuInk leading-none">+{s.n}</div><div className="text-[11px] text-nexuInkSoft mt-1">{s.l}</div></div>
          ))}
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Ver mi impacto <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

/* ===================== fin parte D ===================== */

/* ===================== RENDERERS — E: Fase 4 (karma / estatus / retención) ===================== */

function KarmaBoardScreen({ screen, state, next }) {
  const k = state.karma + 1218
  return (
    <ScreenWrap kicker="Tablero de impacto" title="Has ayudado a 45 compañeros este mes.">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl p-5 text-center border border-nexuLine bg-white">
          <div className="relative w-24 h-24 mx-auto">
            <svg viewBox="0 0 100 100" className="-rotate-90 absolute inset-0">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#E7E9F0" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={RED} strokeWidth="8" strokeLinecap="round" strokeDasharray="180 263" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[20px] font-semibold text-nexuInk">{k}</div>
          </div>
          <div className="text-[12px] text-nexuInkSoft mt-2">Karma total</div>
        </div>
        <div className="rounded-3xl p-5 text-center border border-nexuLine bg-white">
          <div className="relative w-24 h-24 mx-auto">
            <svg viewBox="0 0 100 100" className="-rotate-90 absolute inset-0">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#E7E9F0" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={CYAN} strokeWidth="8" strokeLinecap="round" strokeDasharray="220 263" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[20px] font-semibold text-nexuInk">87%</div>
          </div>
          <div className="text-[12px] text-nexuInkSoft mt-2">Tasa de ayuda</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-nexuMist p-3"><div className="text-[18px] font-semibold text-nexuInk">45</div><div className="text-[10px] text-nexuInkSoft">Pares ayudados</div></div>
        <div className="rounded-2xl bg-nexuMist p-3"><div className="text-[18px] font-semibold text-nexuInk">12</div><div className="text-[10px] text-nexuInkSoft">Salas activas</div></div>
        <div className="rounded-2xl bg-nexuMist p-3"><div className="text-[18px] font-semibold text-nexuInk">3</div><div className="text-[10px] text-nexuInkSoft">Medallas</div></div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Ver historial <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function KarmaHistoryScreen({ screen, next }) {
  const items = [
    { d: 'Hoy 14:21',    a: '+10', t: 'Resolviste duda en Sala 4', tone: 'red'  },
    { d: 'Hoy 12:08',    a: '+5',  t: 'Tu PDF fue útil',           tone: 'cyan' },
    { d: 'Ayer 22:40',   a: '+15', t: 'Lideraste sala de voz',     tone: 'red'  },
    { d: 'Ayer 18:02',   a: '+5',  t: 'Comentaste con valor',      tone: 'cyan' },
    { d: '13 may 09:11', a: '+50', t: 'Bienvenida Nexu',           tone: 'red'  },
  ]
  return (
    <ScreenWrap kicker="Desglose de Karma" title="Cada acción cuenta">
      <div className="rounded-3xl border border-nexuLine bg-white divide-y divide-nexuLine">
        {items.map((it, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-white text-[12px]')} style={{ background: it.tone === 'red' ? RED : CYAN }}>{it.a}</div>
            <div className="flex-1">
              <div className="text-[13.5px] font-medium text-nexuInk">{it.t}</div>
              <div className="text-[11px] text-nexuInkSoft">{it.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Ver medallas <I.award /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function MedalsGridScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Muro de medallas" title="Logros académicos">
      <div className="grid grid-cols-3 gap-3">
        {MEDALS.map(m => (
          <div key={m.id} className={cn('rounded-2xl border p-3 text-center bg-white', m.locked ? 'opacity-50 border-dashed border-nexuLine' : 'border-nexuLine shadow-sm')}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto text-white" style={{ background: m.color }}><I.award /></div>
            <div className="text-[11.5px] font-semibold text-nexuInk mt-2 leading-tight">{m.name}</div>
            <div className="text-[10px] text-nexuInkSoft mt-0.5">{m.locked ? 'Bloqueada' : '✓ Lograda'}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function RankUpScreen({ screen, next }) {
  return (
    <ScreenWrap>
      <div className="flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: (Math.random() - 0.5) * 320, y: (Math.random() - 0.5) * 320, opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
            style={{ background: i % 2 === 0 ? RED : CYAN }} />
        ))}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 180 }}>
          <div className="text-[12px] uppercase tracking-wider text-nexuInkSoft">Nuevo rango</div>
          <div className="text-[36px] font-semibold text-nexuInk leading-none mt-2">Mentor de Facultad</div>
          <div className="text-[14px] text-nexuInkSoft mt-2">Has pasado de “Iniciado” a este nivel.</div>
        </motion.div>
      </div>
      <PrimaryButton tone="cyan" onClick={() => next()} pulse>Reclamar rango</PrimaryButton>
    </ScreenWrap>
  )
}

function LeaderboardScreen({ screen, next }) {
  const podium = LEADERBOARD.slice(0, 3)
  const rest = LEADERBOARD.slice(3)
  return (
    <ScreenWrap kicker="Ranking de facultad" title="Top 5% de tu carrera">
      <div className="rounded-3xl bg-white border border-nexuLine p-5">
        <div className="flex items-end justify-center gap-2 h-44 mb-2">
          {/* 2nd */}
          <div className="flex-1 flex flex-col items-center justify-end">
            <Avatar init={podium[1].init} size={40} />
            <div className="mt-2 w-full rounded-t-xl flex items-center justify-center text-white font-semibold" style={{ height: 70, background: '#5B6076' }}>2</div>
          </div>
          {/* 1st */}
          <div className="flex-1 flex flex-col items-center justify-end">
            <div className="text-2xl">👑</div>
            <Avatar init={podium[0].init} size={48} accent />
            <div className="mt-2 w-full rounded-t-xl flex items-center justify-center text-white font-semibold" style={{ height: 100, background: RED }}>1</div>
          </div>
          {/* 3rd */}
          <div className="flex-1 flex flex-col items-center justify-end">
            <Avatar init={podium[2].init} size={40} />
            <div className="mt-2 w-full rounded-t-xl flex items-center justify-center text-white font-semibold" style={{ height: 50, background: CYAN }}>3</div>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-nexuLine bg-white divide-y divide-nexuLine">
        {rest.map(p => (
          <div key={p.rank} className={cn('px-4 py-2.5 flex items-center gap-3', p.me && 'bg-nexuRed/5')}>
            <div className={cn('text-[12px] font-semibold w-6', p.me ? 'text-nexuRed' : 'text-nexuInkSoft')}>#{p.rank}</div>
            <Avatar init={p.init} size={32} accent={p.me} />
            <div className="flex-1 text-[13px] font-medium text-nexuInk">{p.name}</div>
            <div className="text-[12px] font-semibold text-nexuInk">{p.karma}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function KarmaStoreScreen({ screen, next }) {
  const items = [
    { name: 'Destacar tu post', cost: 50,  icon: <I.bolt /> },
    { name: 'Crear sala premium', cost: 120, icon: <I.mic /> },
    { name: 'Banner personal',   cost: 200, icon: <I.star /> },
  ]
  return (
    <ScreenWrap kicker="Canje de Karma" title="Tienda Nexu" copy="Da utilidad a tus puntos.">
      <div className="space-y-2.5">
        {items.map((it, i) => (
          <TactileCard key={i} onClick={() => next()}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: i % 2 === 0 ? RED : CYAN }}>{it.icon}</div>
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-nexuInk">{it.name}</div>
                <div className="text-[11px] text-nexuInkSoft">Función académica premium</div>
              </div>
              <Pill tone="red">{it.cost} K</Pill>
            </div>
          </TactileCard>
        ))}
      </div>
    </ScreenWrap>
  )
}

function ThanksNotifScreen({ screen, next }) {
  return (
    <ScreenWrap>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="rounded-3xl p-6 text-center text-white" style={{ background: `linear-gradient(135deg, ${CYAN}, #0E5A60)` }}>
        <div className="text-4xl">🙏</div>
        <div className="text-[20px] font-semibold mt-2">A 10 personas les sirvió tu último apunte</div>
        <div className="text-[13px] opacity-90 mt-2">Gracias por aportar a la red.</div>
      </motion.div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function PublicProfileScreen({ screen, state, next }) {
  const d = state.data
  return (
    <ScreenWrap kicker="Vista pública" title="Así te ven los demás">
      <div className="rounded-3xl overflow-hidden border border-nexuLine bg-white">
        <div className="h-24" style={{ background: `linear-gradient(135deg, ${RED}, ${CYAN})` }} />
        <div className="px-4 pb-5 -mt-10">
          <Avatar init={d.avatar || (d.name?.[0] || 'Y') + (d.lastname?.[0] || 'O')} size={72} accent />
          <div className="text-[18px] font-semibold text-nexuInk mt-2">{d.name || 'Estudiante'} {d.lastname || ''}</div>
          <div className="text-[12px] text-nexuInkSoft">{d.career || 'Carrera'} · {d.university || 'Universidad'}</div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div><div className="text-[18px] font-semibold text-nexuInk">{state.karma + 1218}</div><div className="text-[10px] text-nexuInkSoft">Karma</div></div>
            <div><div className="text-[18px] font-semibold text-nexuInk">45</div><div className="text-[10px] text-nexuInkSoft">Ayudas</div></div>
            <div><div className="text-[18px] font-semibold text-nexuInk">12</div><div className="text-[10px] text-nexuInkSoft">Salas</div></div>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Continuar <I.arrowR /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function LibraryScreen({ screen, next }) {
  const folders = [
    { n: 'Cálculo II',         c: 12 },
    { n: 'Programación II',    c: 23 },
    { n: 'Anatomía',            c:  8 },
    { n: 'Tesis: estado del arte', c: 5 },
  ]
  return (
    <ScreenWrap kicker="Biblioteca de recursos" title="Tu disco duro académico">
      <div className="grid grid-cols-2 gap-3">
        {folders.map((f, i) => (
          <button key={i} onClick={() => next()} className="tap-44 rounded-2xl border border-nexuLine bg-white p-4 text-left hover:border-nexuInk/30">
            <div className="w-10 h-10 rounded-xl bg-nexuMist flex items-center justify-center text-nexuInk"><I.bookmark /></div>
            <div className="text-[14px] font-semibold text-nexuInk mt-2">{f.n}</div>
            <div className="text-[11px] text-nexuInkSoft">{f.c} archivos</div>
          </button>
        ))}
      </div>
      <div className="mt-auto pt-6"><GhostButton onClick={() => next()}>Continuar →</GhostButton></div>
    </ScreenWrap>
  )
}

function RoomHistoryScreen({ screen, next }) {
  const sessions = [
    { t: 'Repaso Final · Programación II', when: '13 may · 21:00', dur: '1h 12m' },
    { t: 'Dudas TFG: estado del arte',     when: '12 may · 19:00', dur: '52 min' },
    { t: 'Anatomía: aparato circulatorio', when: '11 may · 22:30', dur: '38 min' },
  ]
  return (
    <ScreenWrap kicker="Historial de salas" title="Tus aprendizajes en vivo">
      <div className="space-y-2">
        {sessions.map((s, i) => (
          <TactileCard dense key={i} onClick={() => next()}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: CYAN }}><I.mic /></div>
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold text-nexuInk">{s.t}</div>
                <div className="text-[11px] text-nexuInkSoft">{s.when} · {s.dur}</div>
              </div>
            </div>
          </TactileCard>
        ))}
      </div>
      <div className="mt-auto pt-6"><GhostButton onClick={() => next()}>Continuar →</GhostButton></div>
    </ScreenWrap>
  )
}

function PreferencesScreen({ screen, next }) {
  const [prefs, setPrefs] = useState({
    examOnly: false, silent: true, lateNight: false, dailyDigest: true,
  })
  const map = {
    examOnly: 'Solo dudas de examen', silent: 'Salas de estudio silencioso',
    lateNight: 'Notificaciones nocturnas', dailyDigest: 'Resumen diario',
  }
  return (
    <ScreenWrap kicker="Preferencias de estudio" title={screen.title || 'Personaliza tu Nexu'}>
      <div className="rounded-3xl border border-nexuLine bg-white divide-y divide-nexuLine">
        {Object.keys(prefs).map(k => (
          <div key={k} className="px-4 py-3.5 flex items-center gap-3">
            <div className="flex-1 text-[14px] text-nexuInk">{map[k]}</div>
            <button onClick={() => setPrefs(p => ({ ...p, [k]: !p[k] }))}
              className={cn('w-12 h-7 rounded-full transition relative', prefs[k] ? '' : 'bg-nexuLine')}
              style={{ background: prefs[k] ? CYAN : undefined }}>
              <motion.div className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow"
                animate={{ left: prefs[k] ? 22 : 2 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Guardar <I.check /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function CvGeneratorScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="CV de Nexu" title="Tu impacto, exportable" copy="Resumen de habilidades para LinkedIn o tu CV.">
      <div className="rounded-3xl border border-nexuLine bg-white p-5">
        <div className="flex items-center gap-2"><I.file style={{ color: RED }} /><div className="text-[12px] uppercase tracking-wider text-nexuRed font-semibold">Vista previa PDF</div></div>
        <div className="mt-3 space-y-2 text-[12.5px] text-nexuInk">
          <div className="font-semibold">Habilidades evidenciadas</div>
          <div className="flex flex-wrap gap-1.5">
            {['React','TypeScript','Comunicación','Trabajo en equipo','Liderazgo de salas'].map(t => <Pill key={t} tone="red">{t}</Pill>)}
          </div>
          <div className="font-semibold mt-3">Métricas de impacto</div>
          <ul className="list-disc pl-5 text-nexuInkSoft">
            <li>45 dudas resueltas</li>
            <li>12 salas de voz lideradas</li>
            <li>8 recursos compartidos</li>
          </ul>
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Generar PDF <I.upload /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function ReminderScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Recordatorio" title="Programa una sala">
      <div className="rounded-3xl border border-nexuLine bg-white p-5">
        <div className="text-[12px] uppercase tracking-wider text-nexuInkSoft">Próxima sesión</div>
        <div className="text-[16px] font-semibold text-nexuInk mt-1">Repaso Final · Programación II</div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="rounded-2xl bg-nexuMist p-3 text-center"><div className="text-[20px] font-semibold text-nexuInk">28</div><div className="text-[11px] text-nexuInkSoft">May 2026</div></div>
          <div className="rounded-2xl bg-nexuMist p-3 text-center"><div className="text-[20px] font-semibold text-nexuInk">21:00</div><div className="text-[11px] text-nexuInkSoft">Hora local</div></div>
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton tone="cyan" pulse onClick={() => next()}>Activar alarma push</PrimaryButton></div>
    </ScreenWrap>
  )
}

function EvoSurveyScreen({ screen, state, dispatch, next }) {
  const v = state.data.evolution ?? 7
  return (
    <ScreenWrap kicker="Encuesta" title="¿Sientes que Nexu ha mejorado tus notas?">
      <div className="rounded-3xl border border-nexuLine bg-white p-5">
        <div className="text-center text-[64px] font-semibold leading-none text-nexuInk">{v}/10</div>
        <input type="range" min={1} max={10} value={v} className="nexu-range mt-4"
          style={{ ['--p']: `${((v - 1) / 9) * 100}%` }}
          onChange={(e) => dispatch({ type: 'SET', payload: { evolution: Number(e.target.value) } })} />
        <div className="flex justify-between text-[11px] text-nexuInkSoft mt-1"><span>Para nada</span><span>¡Mucho!</span></div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Enviar <I.send /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function PrivacyScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Ajustes técnicos" title="Privacidad y datos" copy="Cumplimos con GDPR. Controlas tu información.">
      <div className="rounded-3xl border border-nexuLine bg-white divide-y divide-nexuLine">
        {[
          { t: 'Visibilidad del perfil', s: 'Pública en mi facultad' },
          { t: 'Notificaciones',         s: 'Activas' },
          { t: 'Descargar mis datos',    s: 'Solicitar' },
          { t: 'Eliminar cuenta',        s: 'Permanente · 30 días' },
        ].map((o, i) => (
          <button key={i} onClick={() => next()} className="tap-44 w-full px-4 py-3.5 flex items-center gap-3 text-left">
            <div className="flex-1">
              <div className="text-[14px] font-medium text-nexuInk">{o.t}</div>
              <div className="text-[11px] text-nexuInkSoft">{o.s}</div>
            </div>
            <I.chevR style={{ color: '#5B6076' }} />
          </button>
        ))}
      </div>
      <div className="mt-auto pt-6"><GhostButton onClick={() => next()}>Continuar →</GhostButton></div>
    </ScreenWrap>
  )
}

function WeeklyWrapScreen({ screen, next }) {
  const stats = [
    { kicker: 'Tu semana', big: '15h',  sub: 'Estudiando con tus pares' },
    { kicker: 'Conexiones', big: '+12', sub: 'Nuevos compañeros este mes' },
    { kicker: 'Países',     big: '3',   sub: 'Estudiantes de distintos lugares' },
  ]
  return (
    <ScreenWrap>
      <div className="-mx-5 px-5 overflow-x-auto no-scrollbar">
        <div className="flex gap-3 pb-2">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}
              className="min-w-[260px] aspect-[3/4] rounded-3xl p-6 text-white relative overflow-hidden"
              style={{ background: i === 0 ? `linear-gradient(160deg, ${RED}, #7B0F12)` : i === 1 ? `linear-gradient(160deg, ${CYAN}, #0E5A60)` : `linear-gradient(160deg, #0F1226, #3A3F5C)` }}>
              <div className="text-[11px] uppercase tracking-wider opacity-80">{s.kicker}</div>
              <div className="text-[80px] font-semibold mt-4 leading-none">{s.big}</div>
              <div className="text-[14px] opacity-95 mt-3">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-[12px] text-nexuInkSoft mt-3 text-center">Comparte tu wrap · viralidad orgánica</div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Compartir <I.send /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function EmbassadorScreen({ screen, next }) {
  return (
    <ScreenWrap kicker="Embajador Nexu" title="Trae a tu clase" copy="Por cada amigo que se una, ganas Karma extra.">
      <div className="rounded-3xl bg-white border border-nexuLine p-5">
        <div className="rounded-2xl bg-nexuMist p-4 flex items-center gap-3">
          <I.link />
          <div className="flex-1 text-[12px] text-nexuInk truncate">nexu.app/r/yo-2024</div>
          <button onClick={() => next()} className="tap-44 px-3 h-9 rounded-xl text-white text-[12px] font-semibold" style={{ background: RED }}>Copiar</button>
        </div>
        <div className="grid grid-cols-3 mt-4 text-center">
          <div><div className="text-[20px] font-semibold text-nexuInk">+50</div><div className="text-[10px] text-nexuInkSoft">por amigo</div></div>
          <div><div className="text-[20px] font-semibold text-nexuInk">x2</div><div className="text-[10px] text-nexuInkSoft">si entran a sala</div></div>
          <div><div className="text-[20px] font-semibold text-nexuInk">∞</div><div className="text-[10px] text-nexuInkSoft">sin límite</div></div>
        </div>
      </div>
      <div className="mt-auto pt-6"><PrimaryButton onClick={() => next()}>Compartir <I.send /></PrimaryButton></div>
    </ScreenWrap>
  )
}

function FinalLoopScreen({ screen, next }) {
  return (
    <ScreenWrap>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}><NexuLogo size={120} /></motion.div>
        <div className="text-[26px] font-semibold text-nexuInk mt-6">Estás en el flujo.</div>
        <div className="text-[14px] text-nexuInkSoft mt-2 max-w-xs">Tu carrera está en marcha. Sigue aprendiendo con tu red.</div>
      </div>
      <PrimaryButton pulse onClick={() => next()}>Continuar aprendiendo <I.arrowR /></PrimaryButton>
    </ScreenWrap>
  )
}

function LaunchScreen({ screen, next }) {
  return (
    <ScreenWrap>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <div className="relative">
            <motion.div className="absolute inset-0 rounded-full" animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ background: `${RED}33` }} />
            <NexuLogo size={140} />
          </div>
        </motion.div>
        <div className="text-[28px] font-semibold text-nexuInk mt-8">Listo para entrar</div>
        <div className="text-[14px] text-nexuInkSoft mt-2 max-w-xs">Tu cuenta está creada. Tu red te espera.</div>
      </div>
      <PrimaryButton pulse onClick={() => next()}>Entrar a mi nueva red social <I.arrowR /></PrimaryButton>
    </ScreenWrap>
  )
}

function NetworkScanScreen({ screen, next }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPct(p => Math.min(100, p + 4)), 80)
    return () => clearInterval(id)
  }, [])
  useEffect(() => { if (pct >= 100) setTimeout(() => next(), 400) }, [pct])
  return (
    <motion.div className="flex-1 flex flex-col px-5 pt-4 pb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="rounded-3xl bg-nexuInk text-white p-6 relative overflow-hidden flex-1">
        <div className="text-[11px] uppercase tracking-wider opacity-70">Escaneo de red</div>
        <div className="text-[18px] font-semibold mt-1">Conectando con el nodo de tu carrera UNESCO…</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="-100 -100 200 200" width="240" height="240">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2
              const x = Math.cos(a) * 70, y = Math.sin(a) * 70
              return <g key={i}>
                <line x1="0" y1="0" x2={x} y2={y} stroke={RED} strokeOpacity="0.4" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="6" fill={RED} />
              </g>
            })}
            <circle cx="0" cy="0" r="14" fill={CYAN} />
          </svg>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-1.5 rounded-full bg-white/20 overflow-hidden"><div className="h-full" style={{ width: `${pct}%`, background: RED }} /></div>
          <div className="text-[11px] opacity-80 mt-2">{pct}% · indexando perfiles compatibles</div>
        </div>
      </div>
    </motion.div>
  )
}

/* ===================== fin parte E ===================== */

/* ===================== SCREENS DATA ===================== */

const PHASE_1 = [
  { id:'p1-1',  kind:'message', illustration:'welcome', title:'La red donde tu carrera cobra vida', copy:'Bienvenido a Nexu — el espacio donde estudiar deja de ser solitario.', cta:'Comenzar mi camino' },
  { id:'p1-2',  kind:'message', illustration:'isolation', title:'Estudiar solo es agotador.', copy:'La soledad académica te roba tiempo y motivación. Nexu te conecta con quienes viven lo mismo.' },
  { id:'p1-3',  kind:'message', illustration:'aha', title:'Tu red social académica, personalizada por tu área UNESCO.', cta:'Ver cómo Nexu me ayuda' },
  { id:'p1-4',  kind:'choice', field:'difficulty', title:'¿Qué tan desafiante ha sido este semestre para ti?', options:['Fácil','Medio','Difícil','Extremo'] },
  { id:'p1-5',  kind:'numericInput', field:'hours', title:'¿Cuántas horas pasas buscando respuestas solo?', unit:'horas / semana' },
  { id:'p1-6',  kind:'impact' },
  { id:'p1-7',  kind:'unescoArea', title:'¿En qué área UNESCO estudias?', copy:'Te conectaremos con tu macrogrupo profesional.' },
  { id:'p1-8',  kind:'searchPicker', field:'career', source:'career', title:'¿Cuál es tu carrera?', placeholder:'Buscar carrera…' },
  { id:'p1-9',  kind:'searchPicker', field:'university', source:'university', title:'¿En qué universidad estudias?', placeholder:'Buscar institución…' },
  { id:'p1-10', kind:'authChoice', title:'Guardemos tu diagnóstico', copy:'Crea tu cuenta para no perder tu progreso.' },
  { id:'p1-11', kind:'textInput', field:'name', title:'Empecemos por lo básico, ¿cómo te llamas?', placeholder:'Tu nombre' },
  { id:'p1-12', kind:'mirror' },
  { id:'p1-13', kind:'textInput', field:'lastname', title:'¿Y tus apellidos?', copy:'Esto te identifica en tu facultad.', placeholder:'Tus apellidos' },
  { id:'p1-14', kind:'date', title:'¿Cuándo es tu cumpleaños?' },
  { id:'p1-15', kind:'age' },
  { id:'p1-16', kind:'gender', title:'¿Cómo te identificas?' },
  { id:'p1-17', kind:'email', title:'Tu correo será tu llave de acceso a Nexu.', copy:'Preferiblemente institucional.' },
  { id:'p1-18', kind:'message', kicker:'Validación en tiempo real', title:'Correo verificado.', copy:'Formato válido detectado. A continuación enviaremos un código.' },
  { id:'p1-19', kind:'password', title:'Crea una contraseña fuerte.', copy:'Indicador visual: de Rojo (débil) a Cian (fuerte).' },
  { id:'p1-20', kind:'passwordConfirm', title:'Solo para estar seguros, escríbela de nuevo.' },
  { id:'p1-21', kind:'otp', title:'Verifica tu cuenta', copy:'Te enviamos un código de 6 dígitos a tu correo.' },
  { id:'p1-22', kind:'success', kicker:'Éxito de registro', title:'¡Cuenta creada!', copy:'Bienvenido a la red.' },
  { id:'p1-23', kind:'message', title:'Ahora, hagamos que Nexu trabaje para ti.', copy:'Configura tu perfil académico para personalizar al máximo.' },
  { id:'p1-24', kind:'slider', field:'semester', min:1, max:10, unit:'Semestre actual', title:'¿En qué semestre estás?', copy:'Te conectaremos con pares en tu mismo nivel.' },
  { id:'p1-25', kind:'avatar', title:'Foto de perfil', copy:'Sube tu mejor foto. Optimizamos vía Cloudinary.' },
  { id:'p1-26', kind:'progressLoad', kicker:'Procesando', title:'Optimizando tu presencia en la red…', copy:'IA aplicando mejoras visuales.', duration:3000 },
  { id:'p1-27', kind:'tagPicker', title:'Tus intereses', copy:'Selecciona al menos 5 etiquetas que te describan.' },
  { id:'p1-28', kind:'multichoice', field:'pains', min:1, options:PAINS, title:'¿Qué es lo que más te cuesta resolver hoy?' },
  { id:'p1-29', kind:'message', illustration:'communityProof', title:'Estas son las salas activas en tu carrera ahora mismo.', copy:'Muestreo en tiempo real de la actividad en tu área UNESCO.' },
  { id:'p1-30', kind:'permission', field:'notifPush', icon:'bell', title:'Permisos de notificación', copy:'Te avisaremos cuando alguien responda tu duda.', permTitle:'Notificaciones push', permBody:'Activa para recibir alertas en tiempo real.' },
  { id:'p1-31', kind:'permission', field:'micGranted', icon:'mic', title:'Permisos de micrófono', copy:'Necesario para participar en salas de voz WebRTC.', permTitle:'Acceso al micrófono', permBody:'Solo se activa cuando entras a una sala.' },
  { id:'p1-32', kind:'message', title:'Karma · La economía de Nexu', copy:'Ganas Karma resolviendo dudas. Lo usas para destacar contenido y desbloquear funciones.' },
  { id:'p1-33', kind:'medal', title:'Reclama tu primera medalla', copy:'Eres parte de la primera generación Nexu.' },
  { id:'p1-34', kind:'identitySummary', title:'Tu identidad académica', copy:'Revisa tus datos antes de continuar.' },
  { id:'p1-35', kind:'honor', title:'Compromiso de honor estudiantil', copy:'Una red profesional empieza con respeto.' },
  { id:'p1-36', kind:'progressLoad', kicker:'Sincronización', title:'Configurando tu nodo en la red global…', copy:'Indexando tu perfil en Prisma · NestJS.', duration:2400 },
  { id:'p1-37', kind:'tutorial', target:'wall' },
  { id:'p1-38', kind:'tutorial', target:'rooms' },
  { id:'p1-39', kind:'tutorial', target:'messages' },
  { id:'p1-40', kind:'tutorial', target:'profile' },
  { id:'p1-41', kind:'message', illustration:'beating', title:'Bienvenido a tu interfaz', copy:'Has visto los 4 pilares de Nexu.', cta:'Entendido' },
  ...HABIT_QS.map((q, i) => ({ id:`p1-${42+i}`, kind:'yesno', qid:i, title:q })),
  { id:'p1-52', kind:'progressLoad', kicker:'Análisis', title:'Analizando 1,000+ perfiles para encontrar tus pares ideales…', copy:'Algoritmo de afinidad académica.', duration:4000 },
  { id:'p1-53', kind:'peerCarousel', title:'Tus pares cercanos', copy:'Hay 45 estudiantes de tu carrera esperándote.' },
  { id:'p1-54', kind:'message', kicker:'Anclaje de valor', title:'Estudiantes en Nexu aprueban un 30% más rápido.', copy:'Datos de la comunidad activa.' },
  { id:'p1-55', kind:'karmaGift', amount:50, title:'Te regalamos tus primeros puntos.', copy:'Para que consultes hoy mismo.' },
  { id:'p1-56', kind:'progressLoad', kicker:'Configurando feed', title:'Filtrando el mejor contenido para tu área…', copy:'Personalización basada en UNESCO.', duration:2200 },
  { id:'p1-57', kind:'message', illustration:'beating', title:'Bienvenido a Nexu, {name}.', copy:'Tu carrera empieza aquí.' },
  { id:'p1-58', kind:'tutorial', target:'roomBtn' },
  { id:'p1-59', kind:'tutorial', target:'plus' },
  { id:'p1-60', kind:'launch' },
  { id:'p1-61', kind:'feedHome', title:'Bienvenido a tu Feed' },
]

const PHASE_2 = [
  { id:'p2-1',  kind:'networkScan' },
  { id:'p2-2',  kind:'message', illustration:'communityProof', title:'Hay 124 estudiantes de tu facultad en línea ahora.', copy:'Estás entrando a la conversación viva de tu carrera.' },
  { id:'p2-3',  kind:'feedFirstLook', title:'Tu primer vistazo al Feed', copy:'Contenido ultra-específico de tu carrera.' },
  { id:'p2-4',  kind:'tooltip', copy:'“Aquí no solo escribes, aquí hablas y resuelves en vivo.”' },
  { id:'p2-5',  kind:'tour', tourIdx:1, emoji:'🤝',  title:'Mentoría par',           copy:'Conecta con compañeros que ya pasaron por donde tú estás.' },
  { id:'p2-6',  kind:'tour', tourIdx:2, emoji:'📝',  title:'Repaso de exámenes',     copy:'Sesiones grupales antes de los exámenes finales.' },
  { id:'p2-7',  kind:'tour', tourIdx:3, emoji:'🚀',  title:'Grupos de proyecto',     copy:'Forma equipos para tareas y TFG.' },
  { id:'p2-8',  kind:'tour', tourIdx:4, emoji:'🎙️', title:'Salas de voz en vivo',   copy:'Audio en tiempo real con tus pares.' },
  { id:'p2-9',  kind:'tour', tourIdx:5, emoji:'📚',  title:'Biblioteca compartida',  copy:'Apuntes, esquemas y resúmenes al alcance.' },
  { id:'p2-10', kind:'tour', tourIdx:6, emoji:'🏆',  title:'Reconocimiento académico', copy:'Karma, medallas y rankings de facultad.' },
  { id:'p2-11', kind:'lobby' },
  { id:'p2-12', kind:'audioTest', title:'Prueba de audio', copy:'Asegúrate de que todos te escuchen claro.' },
  { id:'p2-13', kind:'liveRoom', speakingIdx:0 },
  { id:'p2-14', kind:'liveRoom', speakingIdx:2 },
  { id:'p2-15', kind:'liveRoom', speakingIdx:2, handRaised:true, notif:'Has pedido la palabra. Te avisarán cuando sea tu turno.' },
  { id:'p2-16', kind:'liveRoom', speakingIdx:1, reactions:true, notif:'Reaccionaste con 🔥' },
  { id:'p2-17', kind:'liveRoom', speakingIdx:0, notif:'Chat de texto activado en la sala' },
  { id:'p2-18', kind:'liveRoom', speakingIdx:3, notif:'Lucía M. está hablando' },
  { id:'p2-19', kind:'liveRoom', speakingIdx:4, notif:'Viendo perfil de Andrés P.' },
  { id:'p2-20', kind:'liveRoom', speakingIdx:1, reactions:true, notif:'Andrés P. compartió un esquema' },
  { id:'p2-21', kind:'roomUpload', title:'Compartiendo recurso', copy:'Subiendo esquema_estudio.pdf vía Cloudinary…' },
  { id:'p2-22', kind:'message', kicker:'Saliendo de sala', title:'¡Saliste de la sala!', copy:'Recolectamos un par de datos de calidad.' },
  { id:'p2-23', kind:'choice', field:'ratingNps', title:'¿Te ayudó esta sesión?', copy:'Valoración de 1 a 5.', options:[
    {value:1,label:'⭐'},{value:2,label:'⭐⭐'},{value:3,label:'⭐⭐⭐'},{value:4,label:'⭐⭐⭐⭐'},{value:5,label:'⭐⭐⭐⭐⭐'},
  ]},
  { id:'p2-24', kind:'message', illustration:'beating', title:'Gracias por tu valoración', copy:'Tus aportes hacen mejor a la comunidad.' },
  { id:'p2-25', kind:'message', kicker:'Resumen', title:'La sala duró 38 min · 6 hablantes · 24 oyentes', copy:'Tus apuntes se guardaron en tu biblioteca.' },
  { id:'p2-25a', kind:'rating5', title:'¿Cómo ha sido tu experiencia en Nexu hasta ahora?' },
  { id:'p2-25b', kind:'message', kicker:'¡Nos alegra oír eso!', title:'+5 Karma por ser parte activa de la comunidad', copy:'¿Nos regalas un segundo más?' },
  { id:'p2-25c', kind:'storeJump', title:'Calificación en la Store', copy:'Ventana nativa iOS / Android.' },
  { id:'p2-25d', kind:'pararrayos', title:'Sentimos que no sea perfecto aún.', copy:'Tu opinión va directo al equipo.' },
  { id:'p2-26', kind:'message', kicker:'Feed liberado', title:'Scroll infinito activado.', copy:'Mezcla de posts, encuestas académicas y anuncios de salas futuras.' },
  { id:'p2-27', kind:'composer' },
  { id:'p2-28', kind:'tagSuggest' },
  { id:'p2-29', kind:'wallAction', action:'like' },
  { id:'p2-30', kind:'wallAction', action:'comment' },
  { id:'p2-31', kind:'wallAction', action:'save' },
  { id:'p2-32', kind:'wallAction', action:'share' },
  { id:'p2-33', kind:'wallAction', action:'report' },
  { id:'p2-34', kind:'wallAction', action:'follow' },
  { id:'p2-35', kind:'wallAction', action:'award' },
  { id:'p2-36', kind:'socketNotif' },
  { id:'p2-37', kind:'daySummary' },
  { id:'p2-38', kind:'message', title:'Tus nuevas conexiones te están esperando.', copy:'Vamos al sistema de mensajería privada.', cta:'Ver mis mensajes privados' },
]

const PHASE_3 = [
  { id:'p3-1',  kind:'matchNotif' },
  { id:'p3-2',  kind:'inboxEmpty' },
  { id:'p3-3',  kind:'peerProfile' },
  { id:'p3-4',  kind:'iceBreaker' },
  { id:'p3-5',  kind:'chat' },
  { id:'p3-6',  kind:'chatMultimedia', kindMM:'photo' },
  { id:'p3-7',  kind:'chatMultimedia', kindMM:'voice' },
  { id:'p3-8',  kind:'chatMultimedia', kindMM:'pdf' },
  { id:'p3-9',  kind:'chatMultimedia', kindMM:'link' },
  { id:'p3-10', kind:'chatMultimedia', kindMM:'code' },
  { id:'p3-11', kind:'msgReactions' },
  { id:'p3-12', kind:'blockReport', title:'Bloqueo y reporte', copy:'Mantén la comunidad sana.' },
  { id:'p3-13', kind:'groupInvite' },
  { id:'p3-14', kind:'groupCreate', title:'Define tu grupo' },
  { id:'p3-15', kind:'memberSelect' },
  { id:'p3-16', kind:'groupWall' },
  { id:'p3-17', kind:'groupTask', title:'Tareas · Repasar tema 1' },
  { id:'p3-18', kind:'groupTask', title:'Tareas · Hacer esquema' },
  { id:'p3-19', kind:'groupTask', title:'Tareas · Subir resumen al grupo' },
  { id:'p3-20', kind:'groupTask', title:'Tareas · Probar ejercicios resueltos' },
  { id:'p3-21', kind:'fomoNotif' },
  { id:'p3-22', kind:'sharedFiles', title:'Archivos · esta semana' },
  { id:'p3-23', kind:'sharedFiles', title:'Archivos · este mes' },
  { id:'p3-24', kind:'sharedFiles', title:'Archivos · anteriores' },
  { id:'p3-25', kind:'searchInput' },
  { id:'p3-26', kind:'searchResults' },
  { id:'p3-27', kind:'searchResults' },
  { id:'p3-28', kind:'searchResults' },
  { id:'p3-29', kind:'searchResults' },
  { id:'p3-30', kind:'searchResults' },
  { id:'p3-31', kind:'weeklyHighlight' },
  { id:'p3-32', kind:'qrScan' },
  { id:'p3-33', kind:'connectionsSummary' },
  { id:'p3-34', kind:'message', title:'Tu ayuda ha generado valor.', copy:'Mira tu impacto en el sistema de Karma.', cta:'Ver mi impacto' },
]

const PHASE_4 = [
  { id:'p4-1',  kind:'karmaBoard' },
  { id:'p4-2',  kind:'karmaHistory' },
  { id:'p4-3',  kind:'medalsGrid' },
  { id:'p4-4',  kind:'rankUp' },
  { id:'p4-5',  kind:'leaderboard' },
  { id:'p4-6',  kind:'leaderboard' },
  { id:'p4-7',  kind:'leaderboard' },
  { id:'p4-8',  kind:'leaderboard' },
  { id:'p4-9',  kind:'karmaStore' },
  { id:'p4-10', kind:'thanksNotif' },
  { id:'p4-11', kind:'publicProfile' },
  { id:'p4-12', kind:'library' },
  { id:'p4-13', kind:'roomHistory' },
  { id:'p4-14', kind:'preferences', title:'Preferencias · Solo dudas de examen' },
  { id:'p4-15', kind:'preferences', title:'Preferencias · Salas silenciosas' },
  { id:'p4-16', kind:'preferences', title:'Preferencias · Notificaciones nocturnas' },
  { id:'p4-17', kind:'preferences', title:'Preferencias · Resumen diario' },
  { id:'p4-18', kind:'cvGenerator' },
  { id:'p4-19', kind:'reminder' },
  { id:'p4-20', kind:'evoSurvey' },
  { id:'p4-21', kind:'privacy' },
  { id:'p4-22', kind:'weeklyWrap' },
  { id:'p4-23', kind:'embassador' },
  { id:'p4-24', kind:'finalLoop' },
]

const SCREENS = [
  ...PHASE_1.map((s, i) => ({ ...s, phase: 1, n: i + 1 })),
  ...PHASE_2.map((s, i) => ({ ...s, phase: 2, n: i + 1 })),
  ...PHASE_3.map((s, i) => ({ ...s, phase: 3, n: i + 1 })),
  ...PHASE_4.map((s, i) => ({ ...s, phase: 4, n: i + 1 })),
]
const PHASE_LABELS = {
  1: 'Conversión e Identidad',
  2: 'Valor en Tiempo Real',
  3: 'Conexión y Retención',
  4: 'Karma y Estatus',
}
const PHASE_COUNTS = { 1: PHASE_1.length, 2: PHASE_2.length, 3: PHASE_3.length, 4: PHASE_4.length }

const RENDERERS = {
  message: MessageScreen,
  impact: ImpactStatScreen,
  choice: ChoiceScreen,
  multichoice: MultiChoiceScreen,
  slider: SliderScreen,
  numericInput: NumericInputScreen,
  textInput: TextInputScreen,
  date: DateScreen,
  age: AgeRevealScreen,
  gender: GenderScreen,
  email: EmailScreen,
  password: PasswordScreen,
  passwordConfirm: PasswordConfirmScreen,
  otp: OTPScreen,
  success: SuccessScreen,
  avatar: AvatarUploadScreen,
  tagPicker: TagPickerScreen,
  unescoArea: UnescoAreaScreen,
  searchPicker: SearchPickerScreen,
  mirror: MirrorScreen,
  authChoice: AuthChoiceScreen,
  permission: PermissionScreen,
  medal: MedalClaimScreen,
  identitySummary: IdentitySummaryScreen,
  honor: HonorScreen,
  progressLoad: ProgressLoadScreen,
  tutorial: TutorialScreen,
  yesno: YesNoScreen,
  peerCarousel: PeerCarouselScreen,
  karmaGift: KarmaGiftScreen,
  feedHome: FeedHomeScreen,
  networkScan: NetworkScanScreen,
  feedFirstLook: FeedFirstLookScreen,
  tooltip: TooltipScreen,
  tour: TourCardScreen,
  lobby: LobbyScreen,
  audioTest: AudioTestScreen,
  liveRoom: LiveRoomScreen,
  roomUpload: RoomUploadScreen,
  rating5: Rating5Screen,
  storeJump: StoreJumpScreen,
  pararrayos: PararrayosScreen,
  composer: ComposerScreen,
  tagSuggest: TagSuggestScreen,
  wallAction: WallActionScreen,
  socketNotif: SocketNotifScreen,
  daySummary: DaySummaryScreen,
  matchNotif: MatchNotifScreen,
  inboxEmpty: InboxEmptyScreen,
  peerProfile: PeerProfileScreen,
  iceBreaker: IceBreakerScreen,
  chat: ChatScreen,
  chatMultimedia: ChatMultimediaScreen,
  msgReactions: MsgReactionsScreen,
  blockReport: BlockReportScreen,
  groupInvite: GroupInviteScreen,
  groupCreate: GroupCreateScreen,
  memberSelect: MemberSelectScreen,
  groupWall: GroupWallScreen,
  groupTask: GroupTaskScreen,
  fomoNotif: FomoNotifScreen,
  sharedFiles: SharedFilesScreen,
  searchInput: SearchInputScreen,
  searchResults: SearchResultsScreen,
  weeklyHighlight: WeeklyHighlightScreen,
  qrScan: QrScanScreen,
  connectionsSummary: ConnectionsSummaryScreen,
  karmaBoard: KarmaBoardScreen,
  karmaHistory: KarmaHistoryScreen,
  medalsGrid: MedalsGridScreen,
  rankUp: RankUpScreen,
  leaderboard: LeaderboardScreen,
  karmaStore: KarmaStoreScreen,
  thanksNotif: ThanksNotifScreen,
  publicProfile: PublicProfileScreen,
  library: LibraryScreen,
  roomHistory: RoomHistoryScreen,
  preferences: PreferencesScreen,
  cvGenerator: CvGeneratorScreen,
  reminder: ReminderScreen,
  evoSurvey: EvoSurveyScreen,
  privacy: PrivacyScreen,
  weeklyWrap: WeeklyWrapScreen,
  embassador: EmbassadorScreen,
  finalLoop: FinalLoopScreen,
  launch: LaunchScreen,
}

function interpolate(str, data) {
  if (!str) return str
  return str.replace(/\{(\w+)\}/g, (_, k) => (data[k] || ''))
}

function PhaseBadge({ phase }) {
  return (
    <div className="flex gap-1.5 mt-1">
      {[1,2,3,4].map(p => (
        <div key={p} className={cn('h-1 rounded-full transition-all', p === phase ? 'w-6' : 'w-2')}
          style={{ background: p < phase ? CYAN : p === phase ? RED : '#E7E9F0' }} />
      ))}
    </div>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const max = SCREENS.length - 1
  const screen = SCREENS[state.index]
  const Renderer = RENDERERS[screen.kind] || MessageScreen
  const totalInPhase = PHASE_COUNTS[screen.phase]
  const pct = ((screen.n) / totalInPhase) * 100

  // Interpolate {name} etc. into title/copy
  const interpolated = useMemo(() => ({
    ...screen,
    title: interpolate(screen.title, state.data),
    copy:  interpolate(screen.copy,  state.data),
  }), [screen, state.data])

  const next = () => dispatch({ type: 'NEXT', max })
  const back = () => dispatch({ type: 'BACK' })

  // Keyboard shortcuts: ← back, → next (skip)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowLeft')  back()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.index])

  return (
    <PhoneFrame>
      <TopBar
        onBack={back}
        canBack={state.index > 0}
        phaseIdx={screen.phase}
        phaseLabel={PHASE_LABELS[screen.phase]}
        screenN={screen.n}
        screenTotal={totalInPhase}
        karma={state.karma}
      />
      <ProgressBar pct={pct} />
      <div className="px-5 mt-2">
        <PhaseBadge phase={screen.phase} />
      </div>
      <AnimatePresence mode="wait">
        <Renderer key={screen.id} screen={interpolated} state={state} dispatch={dispatch} next={next} back={back} />
      </AnimatePresence>
      <DevJumpBar index={state.index} max={max} dispatch={dispatch} />
    </PhoneFrame>
  )
}

function DevJumpBar({ index, max, dispatch }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-3 right-3 w-10 h-10 rounded-full bg-nexuInk text-white shadow-tactile flex items-center justify-center text-[11px] font-semibold opacity-70 hover:opacity-100 z-50">
        {index + 1}/{max + 1}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-16 right-3 left-3 max-w-[420px] mx-auto z-50 rounded-2xl bg-white border border-nexuLine shadow-tactile p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-[12px] font-semibold text-nexuInk">Saltar a pantalla</div>
              <button onClick={() => setOpen(false)} className="ml-auto text-nexuInkSoft"><I.x /></button>
            </div>
            <input type="range" min={0} max={max} value={index}
              onChange={(e) => dispatch({ type: 'JUMP', index: Number(e.target.value) })}
              className="nexu-range" style={{ ['--p']: `${(index / max) * 100}%` }} />
            <div className="grid grid-cols-4 gap-1.5 mt-3">
              {[
                { l: 'Fase 1', i: 0 },
                { l: 'Fase 2', i: 61 },
                { l: 'Fase 3', i: 61 + 42 },
                { l: 'Fase 4', i: 61 + 42 + 34 },
              ].map(b => (
                <button key={b.i} onClick={() => dispatch({ type: 'JUMP', index: b.i })}
                  className="tap-44 px-2 py-2 rounded-xl bg-nexuMist text-[11px] font-semibold text-nexuInk hover:bg-nexuLine">
                  {b.l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
