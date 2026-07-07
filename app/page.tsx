"use client"
import React, { useState, useEffect, useRef } from "react"

/* ── CONSTANTS (lines 5–9) ── */
const P = "+201044442622"
const PD = "0104 444 2622"
const PI = "01044442622"
const WN = "201044442622"
const WK = "a395f96b-18a3-41fe-8868-a6cb79a15ebf"

const PHONE = P
const WA = `https://wa.me/${WN}`
const WEB3_KEY = WK
const CC_EMAIL = "apkzoz85@gmail.com"

const STATS = [
  { val: "294", label: "فدان" },
  { val: "830 م", label: "شاطئ خاص" },
  { val: "كيلو 185", label: "رأس الحكمة" },
  { val: "90%", label: "إطلالة بحر" },
]

const FEATURES = [
  "مارينا عالمية", "فندق 5 نجوم", "سبا ومساج", "مطاعم وكافيهات",
  "منطقة تجارية", "نوادي رياضية", "لاجون 25 فدان", "مسارات دراجات",
  "حدائق ومتنزهات", "كلوب هاوس", "جراجات واسعة", "أمن 24/7",
]

const UNITS = [
  { type: "شاليه — 1 غرفة", area: "من 80 م²", price: "من 10,000,000 ج" },
  { type: "شاليه — 2 غرف", area: "من 100 م²", price: "من 13,000,000 ج" },
  { type: "شاليه — 3 غرف", area: "من 130 م²", price: "من 17,000,000 ج" },
  { type: "تاون هاوس — 3-4 غرف", area: "من 150 م²", price: "من 22,000,000 ج" },
  { type: "توين هاوس — 4 غرف", area: "من 185 م²", price: "من 28,000,000 ج" },
  { type: "فيلا مستقلة — 4-6 غرف", area: "من 205 م²", price: "من 38,000,000 ج" },
]

const LOCATION_ITEMS = [
  { dist: "15 دقيقة", place: "سيدي عبد الرحمن" },
  { dist: "40 كم", place: "مطار العلمين الدولي" },
  { dist: "80 كم", place: "مدينة العلمين الجديدة" },
  { dist: "140 كم", place: "مرسى مطروح" },
  { dist: "مباشر", place: "طريق الفوكا الجديد" },
  { dist: "280 كم", place: "القاهرة الجديدة" },
]

/* ── Tracking helpers ── */
function trackLead(label: string) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      // (window as any).gtag("event", "conversion", { send_to: "AW-XXXXXXXXXX/XXXXX" })
    }
  } catch { }
}

/* ── useInView ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect() } }, { threshold })
    ob.observe(el); return () => ob.disconnect()
  }, [threshold])
  return { ref, vis }
}
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useInView()
  return <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `all .65s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>
}

/* ── Lead Form ── */
function LeadForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [form, setForm] = useState({ name: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3_KEY, name: form.name, phone: form.phone, project: "SALT North Coast — تطوير مصر", subject: "Lead — SALT سولت رأس الحكمة", cc: CC_EMAIL }),
      })
      if (res.ok) { setSent(true); trackLead("form") } else setLoading(false)
    } catch { setLoading(false) }
  }
  if (sent) return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>✅</div>
      <p style={{ fontWeight: 700, color: variant === "dark" ? "#fff" : "#1a1a1a" }}>تم الإرسال بنجاح</p>
      <p style={{ fontSize: ".78rem", color: variant === "dark" ? "rgba(255,255,255,.4)" : "#5A7A6B", marginTop: 6 }}>هنتواصل معاك خلال 24 ساعة</p>
    </div>
  )
  const isDark = variant === "dark"
  const iBg = isDark ? "rgba(255,255,255,.06)" : "#f4f9f6"
  const iBorder = isDark ? "rgba(255,255,255,.1)" : "rgba(90,122,107,.15)"
  const iColor = isDark ? "#fff" : "#1a1a1a"
  const iPh = isDark ? "rgba(255,255,255,.3)" : "#5A7A6B"
  return (
    <form onSubmit={submit}>
      <style>{`.fi${variant}::placeholder{color:${iPh}}.fi${variant}:focus{border-color:#1B6B4A!important;box-shadow:0 0 0 3px rgba(27,107,74,.08)!important}`}</style>
      {[{ p: "الاسم الكريم *", k: "name", t: "text" }, { p: "رقم الهاتف *", k: "phone", t: "tel" }].map(f => (
        <input key={f.k} className={`fi${variant}`} type={f.t} placeholder={f.p} value={(form as any)[f.k]}
          onChange={e => setForm({ ...form, [f.k]: e.target.value })} required
          style={{ width: "100%", padding: "14px 16px", marginBottom: 10, background: iBg, border: `1px solid ${iBorder}`, borderRadius: 8, color: iColor, fontSize: ".85rem", outline: "none", fontFamily: "'Almarai',sans-serif", transition: "all .2s", direction: f.k === "phone" ? "ltr" : "rtl" }} />
      ))}
      <button type="submit" disabled={loading} style={{ width: "100%", padding: "16px", background: "#1B6B4A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".88rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", opacity: loading ? .7 : 1, transition: "all .2s" }}>
        {loading ? "جاري الإرسال..." : "سجّل الآن — احصل على البروشور"}
      </button>
    </form>
  )
}

/* ══════════════ MAIN ══════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupForm, setPopupForm] = useState({ name: "", phone: "" })
  const [popupSent, setPopupSent] = useState(false)
  const [popupLoading, setPopupLoading] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showCookie, setShowCookie] = useState(false)

  useEffect(() => { setMounted(true); const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn) }, [])

  /* Popup: 55% scroll OR 16 seconds */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("salt_p")) return
      const timer = setTimeout(() => { setShowPopup(true); sessionStorage.setItem("salt_p", "1") }, 16000)
      const scrollHandler = () => {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        if (pct > 0.55 && !sessionStorage.getItem("salt_p")) { setShowPopup(true); sessionStorage.setItem("salt_p", "1") }
      }
      window.addEventListener("scroll", scrollHandler)
      return () => { clearTimeout(timer); window.removeEventListener("scroll", scrollHandler) }
    } catch { }
  }, [])

  /* Cookie consent */
  useEffect(() => {
    try { if (!localStorage.getItem("salt_cookie")) setShowCookie(true) } catch { }
  }, [])

  const submitPopup = async (e: React.FormEvent) => {
    e.preventDefault(); setPopupLoading(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3_KEY, name: popupForm.name, phone: popupForm.phone, subject: "Lead — SALT سولت رأس الحكمة (Popup)", cc: CC_EMAIL }),
      })
      if (res.ok) { setPopupSent(true); trackLead("popup") } else setPopupLoading(false)
    } catch { setPopupLoading(false) }
  }

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#FAFAF7;color:#1a1a1a;font-family:'Almarai',sans-serif;font-size:16px;direction:rtl}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes kenBurns{0%{transform:scale(1)}100%{transform:scale(1.06)}}

        @media(max-width:768px){
          .nav{padding:0 16px!important;height:56px!important}
          .nav-links{display:none!important}
          .hero-inner{padding:0 20px 48px!important}
          .hero-inner h1{font-size:2.6rem!important}
          .stats-bar{flex-wrap:wrap!important;padding:20px 16px!important;gap:0!important}
          .stats-bar>div{flex:1 1 50%!important;padding:14px 0!important}
          .s-pad{padding:48px 16px!important}
          .features-grid{grid-template-columns:repeat(2,1fr)!important}
          .mp-grid{grid-template-columns:1fr!important}
          .mp-img{min-height:250px!important}
          .mp-text{padding:32px 20px!important}
          .loc-grid{grid-template-columns:1fr 1fr!important}
          .units-list>div{flex-direction:column!important;align-items:flex-start!important;gap:12px!important}
          .units-list .u-cta{width:100%!important}
          .contact-grid{grid-template-columns:1fr!important}
          .c-left{padding:40px 20px!important}
          .c-right{padding:40px 20px!important}
          .footer-inner{flex-direction:column!important;gap:12px!important;text-align:center!important;padding-bottom:80px!important}
          .float-btns{display:none!important}
          .payment-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64, transition: "all .3s",
        background: scrolled ? "rgba(250,250,247,.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,.06)" : "none",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, background: "#1B6B4A", borderRadius: 4, transform: "rotate(45deg)" }} />
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontWeight: 600, letterSpacing: ".15em", color: scrolled ? "#1a1a1a" : "#fff" }}>TATWEER MISR</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["المشروع", "about"], ["الموقع", "location"], ["الأسعار", "prices"], ["تواصل", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => scroll(id)} style={{
              background: "none", border: "none", cursor: "pointer", fontSize: ".75rem", fontWeight: 600,
              color: scrolled ? "#5A7A6B" : "rgba(255,255,255,.6)", letterSpacing: ".06em", transition: "color .2s",
              fontFamily: "'Almarai',sans-serif",
            }}>{l}</button>
          ))}
          <a href={`tel:${PHONE}`} dir="ltr" style={{ fontSize: ".82rem", fontWeight: 700, color: scrolled ? "#1a1a1a" : "#fff", textDecoration: "none" }}>{PD}</a>
          <button onClick={() => scroll("contact")} style={{
            background: "#1B6B4A", color: "#fff", border: "none", padding: "10px 20px",
            fontWeight: 700, fontSize: ".72rem", letterSpacing: ".06em", cursor: "pointer",
            fontFamily: "'Almarai',sans-serif", borderRadius: 6,
          }}>سجّل الآن</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {mounted && <img src="https://prod-images.nawy.com/processed/compound_image/image/5976/default.webp" alt="SALT North Coast" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", animation: "kenBurns 20s ease infinite alternate" }} />}
        {!mounted && <div style={{ position: "absolute", inset: 0, background: "#1a1a1a" }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,26,26,.95) 0%, rgba(26,26,26,.5) 40%, rgba(26,26,26,.3) 100%)" }} />

        <div className="hero-inner" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "0 48px 72px", maxWidth: 800 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "7px 16px", background: "rgba(27,107,74,.8)", borderRadius: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#fff" }}>أحدث مشاريع تطوير مصر — رأس الحكمة</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 400, color: "#fff", lineHeight: .95, marginBottom: 20 }}>
            SALT<br />
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,.3)", fontWeight: 300 }}>Experience The</span>{" "}
            <span style={{ color: "#7ECBA1" }}>Salt Life</span>
          </h1>

          <p style={{ fontSize: ".92rem", color: "rgba(255,255,255,.4)", lineHeight: 1.9, maxWidth: 480, marginBottom: 28 }}>
            منتجع فاخر على 294 فدان في قلب رأس الحكمة — شاطئ 830 متر · مارينا عالمية · فندق 5 نجوم · لاجونات كريستالية على 25 فدان.
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => scroll("contact")} style={{ padding: "15px 32px", background: "#1B6B4A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".88rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>سجّل الآن</button>
            <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع SALT North Coast من تطوير مصر وأريد معرفة المزيد عن الوحدات المتاحة وأنظمة السداد.")}`} target="_blank" rel="noopener noreferrer"
              style={{ padding: "15px 32px", background: "#25D366", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: ".88rem", textDecoration: "none" }}>💬 واتساب</a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar" style={{ display: "flex", background: "#1a1a1a" }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "24px 16px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 500, color: "#7ECBA1" }}>{s.val}</div>
            <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.3)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="s-pad" style={{ padding: "64px 40px", background: "#FAFAF7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".25em", color: "#1B6B4A", marginBottom: 8 }}>TATWEER MISR DEVELOPMENTS</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 500, marginBottom: 12 }}>منتجع SALT في رأس الحكمة</h2>
              <p style={{ fontSize: ".9rem", color: "#5A7A6B", maxWidth: 650, margin: "0 auto", lineHeight: 1.9 }}>
                SALT أحدث مشاريع تطوير مصر على الساحل الشمالي — منتجع ساحلي فاخر في قلب رأس الحكمة على مساحة 294 فدان، مصمم على مصاطب متدرجة بارتفاعات من 9 لـ 33 متر فوق سطح البحر. 90% من الوحدات بإطلالة بحر مباشرة، مع لاجونات كريستالية على 25 فدان، مارينا عالمية، فندق 5 نجوم، ومنطقة تجارية وترفيهية متكاملة.
              </p>
            </div>
          </Reveal>

          {/* Features */}
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * .04}>
                <div style={{
                  background: "#fff", borderRadius: 10, padding: "16px", textAlign: "center",
                  border: "1px solid rgba(0,0,0,.04)", transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,.05)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}>
                  <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#1a1a1a" }}>{f}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section id="location" style={{ background: "#1a1a1a" }}>
        <div className="mp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "55vh" }}>
          <div className="mp-img" style={{ position: "relative", overflow: "hidden", minHeight: "40vw" }}>
            <img src="https://prod-images.nawy.com/processed/compound_image/image/5977/default.webp" alt="SALT Location" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          </div>
          <div className="mp-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#7ECBA1", marginBottom: 12 }}>STRATEGIC LOCATION</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              الموقع الاستراتيجي<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,.3)" }}>كيلو 185 — رأس الحكمة</span>
            </h2>
            <div style={{ width: 32, height: 2, background: "#1B6B4A", borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)", lineHeight: 1.9, marginBottom: 28 }}>
              يقع SALT على الكيلو 185 طريق الإسكندرية – مرسى مطروح في قلب رأس الحكمة، على الطريق الساحلي الدولي وبالقرب من طريق الفوكا الجديد.
            </p>

            <div className="loc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {LOCATION_ITEMS.map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba(255,255,255,.06)", borderRight: "3px solid #1B6B4A" }}>
                  <div style={{ fontSize: ".75rem", fontWeight: 700, color: "#7ECBA1", marginBottom: 4 }}>{item.dist}</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>{item.place}</div>
                </div>
              ))}
            </div>

            <button onClick={() => scroll("contact")} style={{
              marginTop: 24, padding: "14px 28px", background: "#1B6B4A", color: "#fff", border: "none",
              borderRadius: 8, fontWeight: 700, fontSize: ".85rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", alignSelf: "flex-start",
            }}>سجّل واحصل على الماستر بلان</button>
          </div>
        </div>
      </section>

      {/* ── PRICES + CTA ── */}
      <section id="prices" className="s-pad" style={{ padding: "64px 40px", background: "#F4F1EC" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".25em", color: "#1B6B4A", marginBottom: 8 }}>الأسعار</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500 }}>الوحدات والأسعار</h2>
            </div>
          </Reveal>

          {/* أسعار استرشادية disclaimer */}
          <Reveal>
            <p style={{ textAlign: "center", fontSize: ".72rem", color: "#999", marginBottom: 24, fontStyle: "italic" }}>* الأسعار استرشادية وقابلة للتغيير — تواصل معنا لمعرفة أحدث الأسعار</p>
          </Reveal>

          <div className="units-list" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {UNITS.map((u, i) => (
              <Reveal key={i} delay={i * .04}>
                <div style={{
                  background: "#fff", borderRadius: 10, padding: "20px 24px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  border: "1px solid rgba(0,0,0,.04)", transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(27,107,74,.12)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,.04)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: ".9rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{u.type}</div>
                    <div style={{ fontSize: ".75rem", color: "#5A7A6B", marginBottom: 2 }}>{u.area}</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", color: "#1B6B4A", fontWeight: 600 }}>{u.price}</div>
                  </div>
                  <div className="u-cta" style={{ display: "flex", gap: 8 }}>
                    <a href={`${WA}?text=${encodeURIComponent(`مرحباً، أنا مهتم بـ ${u.type} في مشروع SALT North Coast من تطوير مصر`)}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ padding: "10px 16px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".72rem", textDecoration: "none", borderRadius: 6, whiteSpace: "nowrap" }}>
                      💬 واتساب
                    </a>
                    <button onClick={() => scroll("contact")} style={{
                      padding: "10px 16px", background: "#1B6B4A", color: "#fff", border: "none",
                      fontWeight: 700, fontSize: ".72rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", borderRadius: 6, whiteSpace: "nowrap",
                    }}>سجّل الآن</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Payment Plans */}
          <Reveal delay={.15}>
            <div className="payment-grid" style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { t: "النظام الأول", d: "10% مقدم", d2: "تقسيط على 7 سنوات", badge: "الأكثر طلباً" },
                { t: "النظام الثاني", d: "10% مقدم + 5% بعد 3 شهور", d2: "تقسيط على 8 سنوات", badge: "" },
              ].map((p, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "20px", textAlign: "center", border: "1px solid rgba(0,0,0,.04)", position: "relative" }}>
                  {p.badge && <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#1B6B4A", color: "#fff", fontSize: ".6rem", fontWeight: 700, padding: "3px 12px", borderRadius: 10 }}>{p.badge}</span>}
                  <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", color: "#1B6B4A", marginBottom: 6 }}>{p.t}</div>
                  <div style={{ fontSize: ".88rem", fontWeight: 700, marginBottom: 2 }}>{p.d}</div>
                  <div style={{ fontSize: ".78rem", color: "#5A7A6B" }}>{p.d2}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={.2}>
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <p style={{ fontSize: ".78rem", color: "#5A7A6B" }}>جدية حجز: 100,000 جنيه</p>
            </div>
          </Reveal>

          <Reveal delay={.25}>
            <div style={{ marginTop: 16, background: "rgba(27,107,74,.04)", borderRadius: 8, padding: "14px 20px", border: "1px solid rgba(27,107,74,.08)", textAlign: "center" }}>
              <span style={{ fontSize: ".82rem", color: "#1B6B4A", fontWeight: 700 }}>احجز وحدتك الآن</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT DEVELOPER ── */}
      <section style={{ background: "#1a1a1a" }}>
        <div className="mp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "50vh" }}>
          <div className="mp-img" style={{ position: "relative", overflow: "hidden", minHeight: "35vw" }}>
            <img src="https://prod-images.nawy.com/processed/compound_image/image/5975/default.webp" alt="Tatweer Misr" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          </div>
          <div className="mp-text" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#7ECBA1", marginBottom: 12 }}>TATWEER MISR DEVELOPMENTS</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              عن تطوير مصر<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,.3)" }}>منذ 2014</span>
            </h2>
            <div style={{ width: 32, height: 2, background: "#1B6B4A", borderRadius: 2, marginBottom: 20 }} />
            <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)", lineHeight: 1.9, marginBottom: 28 }}>
              منذ تأسيسها عام 2014، رسخت تطوير مصر مكانتها كواحدة من أبرز شركات التطوير العقاري في مصر. مشاريع متكاملة في العين السخنة والساحل الشمالي ومدينة المستقبل — تشمل SALT و IL Monte Galala و Fouka Bay و D Bay و Bloomfields و Rivers.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[{ v: "7+", l: "مشاريع متكاملة" }, { v: "2014", l: "سنة التأسيس" }, { v: "+25,000", l: "عميل" }, { v: "4", l: "مواقع استراتيجية" }].map((s, i) => (
                <div key={i} style={{ padding: "14px", background: "rgba(255,255,255,.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,.06)" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 600, color: "#7ECBA1" }}>{s.v}</div>
                  <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.25)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "60vh" }}>
          <div className="c-left" style={{ background: "#1B6B4A", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "rgba(255,255,255,.5)", marginBottom: 12 }}>تواصل معنا</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              ابدأ رحلتك<br />في رأس الحكمة
            </h2>
            <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)", lineHeight: 1.9, marginBottom: 32 }}>
              سجّل بياناتك واحصل على البروشور والأسعار التفصيلية وخطط السداد. فريقنا هيتواصل معاك خلال 24 ساعة.
            </p>
            <a href={`tel:${PHONE}`} dir="ltr" style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 600, color: "#fff", textDecoration: "none", marginBottom: 20 }}>{PD}</a>
            <div style={{ display: "flex", gap: 12 }}>
              <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع SALT North Coast من تطوير مصر وأريد معرفة المزيد")}`} target="_blank" rel="noopener noreferrer"
                style={{ padding: "12px 24px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", borderRadius: 8 }}>💬 واتساب</a>
              <a href={`tel:${PHONE}`} style={{ padding: "12px 24px", border: "1px solid rgba(255,255,255,.3)", color: "#fff", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", borderRadius: 8 }}>📞 اتصل الآن</a>
            </div>
          </div>
          <div className="c-right" style={{ background: "#F4F1EC", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".2em", color: "#1B6B4A", marginBottom: 8 }}>سجّل بياناتك</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 500, marginBottom: 6 }}>احصل على البروشور والأسعار</h3>
            <p style={{ fontSize: ".78rem", color: "#5A7A6B", marginBottom: 24 }}>فريقنا المتخصص في خدمتك</p>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── AGENT DISCLOSURE ── */}
      <div style={{ background: "#f0ebe4", padding: "16px 40px", textAlign: "center" }}>
        <p style={{ fontSize: ".7rem", color: "#999", lineHeight: 1.8 }}>
          هذا الموقع مُدار بواسطة وكيل عقاري معتمد وليس بواسطة شركة تطوير مصر مباشرة. جميع المعلومات المعروضة للأغراض التسويقية فقط والأسعار استرشادية وقابلة للتغيير.
        </p>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a1a", padding: "20px 40px 80px" }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 18, height: 18, background: "#1B6B4A", borderRadius: 3, transform: "rotate(45deg)" }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: ".85rem", letterSpacing: ".15em", color: "#7ECBA1" }}>TATWEER MISR</span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button onClick={() => setShowPrivacy(true)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", fontSize: ".6rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>سياسة الخصوصية</button>
            <span style={{ fontSize: ".65rem", color: "rgba(255,255,255,.2)" }}>© 2026 تطوير مصر | وكيل معتمد</span>
          </div>
        </div>
      </footer>

      {/* ── POPUP ── */}
      {showPopup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)" }}>
          <div style={{ background: "#fff", maxWidth: 400, width: "100%", borderRadius: 16, overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,.3)" }}>
            <div style={{ background: "#1B6B4A", padding: "24px 28px", color: "#fff", position: "relative" }}>
              <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: 12, left: 16, background: "none", border: "none", color: "rgba(255,255,255,.5)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
              <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".2em", color: "rgba(255,255,255,.6)", display: "block", marginBottom: 8 }}>SALT — رأس الحكمة</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.15 }}>294 فدان<br /><span style={{ fontWeight: 700 }}>احجز مكانك الآن</span></h2>
            </div>
            <div style={{ padding: "24px 28px" }}>
              {popupSent ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>✅</div>
                  <p style={{ fontWeight: 700 }}>تم التسجيل!</p>
                  <p style={{ fontSize: ".78rem", color: "#5A7A6B", marginTop: 6 }}>هنتواصل معاك قريباً</p>
                  <button onClick={() => setShowPopup(false)} style={{ marginTop: 14, padding: "10px 28px", background: "#1B6B4A", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", borderRadius: 8, fontFamily: "'Almarai',sans-serif" }}>إغلاق</button>
                </div>
              ) : (
                <form onSubmit={submitPopup}>
                  <style>{`.pp-i::placeholder{color:#5A7A6B}.pp-i:focus{border-color:#1B6B4A!important}`}</style>
                  <p style={{ fontSize: ".78rem", color: "#5A7A6B", marginBottom: 14, lineHeight: 1.7 }}>سجّل بياناتك واحصل على البروشور والأسعار</p>
                  {[{ p: "الاسم الكريم *", k: "name" }, { p: "رقم الهاتف *", k: "phone" }].map(f => (
                    <input key={f.k} className="pp-i" placeholder={f.p} value={(popupForm as any)[f.k]}
                      onChange={e => setPopupForm({ ...popupForm, [f.k]: e.target.value })} required
                      type={f.k === "phone" ? "tel" : "text"}
                      style={{ width: "100%", padding: "13px 16px", marginBottom: 10, background: "#f4f9f6", border: "1px solid rgba(90,122,107,.15)", borderRadius: 8, fontSize: ".85rem", outline: "none", fontFamily: "'Almarai',sans-serif", direction: f.k === "phone" ? "ltr" : "rtl", color: "#1a1a1a" }} />
                  ))}
                  <button type="submit" disabled={popupLoading} style={{ width: "100%", padding: "14px", background: "#1B6B4A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".82rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", opacity: popupLoading ? .7 : 1 }}>
                    {popupLoading ? "..." : "🏖 سجّل الآن"}
                  </button>
                  <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع SALT North Coast من تطوير مصر")}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", marginTop: 8, padding: "12px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".75rem", textAlign: "center", textDecoration: "none", borderRadius: 8 }}>💬 واتساب مباشرة</a>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PRIVACY POLICY MODAL ── */}
      {showPrivacy && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setShowPrivacy(false)}>
          <div style={{ background: "#fff", maxWidth: 500, width: "100%", borderRadius: 16, overflow: "hidden", maxHeight: "80vh", display: "flex", flexDirection: "column" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ background: "#1B6B4A", padding: "20px 28px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 500 }}>سياسة الخصوصية</h3>
              <button onClick={() => setShowPrivacy(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.5)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ padding: "24px 28px", overflowY: "auto", fontSize: ".82rem", color: "#555", lineHeight: 1.9 }}>
              <p style={{ marginBottom: 12 }}>نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية المعلومات التي تقدمها عبر هذا الموقع.</p>
              <p style={{ fontWeight: 700, marginBottom: 6 }}>البيانات التي نجمعها:</p>
              <p style={{ marginBottom: 12 }}>الاسم ورقم الهاتف الذي تقدمه من خلال نماذج التواصل لغرض التواصل معك بخصوص المشاريع العقارية المعروضة.</p>
              <p style={{ fontWeight: 700, marginBottom: 6 }}>كيف نستخدم بياناتك:</p>
              <p style={{ marginBottom: 12 }}>نستخدم بياناتك فقط للتواصل معك بخصوص استفسارك عن المشاريع العقارية. لن نشارك بياناتك مع أطراف ثالثة دون موافقتك.</p>
              <p style={{ fontWeight: 700, marginBottom: 6 }}>حقوقك:</p>
              <p>يمكنك طلب حذف بياناتك في أي وقت عن طريق التواصل معنا.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── COOKIE CONSENT ── */}
      {showCookie && (
        <div style={{ position: "fixed", bottom: 60, left: 16, right: 16, zIndex: 150, background: "#1a1a1a", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, boxShadow: "0 10px 40px rgba(0,0,0,.3)" }}>
          <p style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)", flex: 1 }}>نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بالاستمرار في التصفح فإنك توافق على استخدامنا لها.</p>
          <button onClick={() => { setShowCookie(false); try { localStorage.setItem("salt_cookie", "1") } catch { } }}
            style={{ padding: "8px 20px", background: "#1B6B4A", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: ".72rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", whiteSpace: "nowrap" }}>موافق</button>
        </div>
      )}

      {/* FLOAT BUTTONS */}
      <div className="float-btns" style={{ position: "fixed", bottom: 80, left: 24, zIndex: 50, display: "flex", flexDirection: "column", gap: 10 }}>
        <a href={`tel:${PHONE}`} style={{ width: 48, height: 48, borderRadius: 12, background: "#1B6B4A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(27,107,74,.3)", textDecoration: "none" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
        </a>
        <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع SALT North Coast من تطوير مصر")}`} target="_blank" rel="noopener noreferrer"
          style={{ width: 48, height: 48, borderRadius: 12, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,.3)", textDecoration: "none" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
      </div>

      {/* MOBILE BAR */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <a href={`tel:${PHONE}`} style={{ padding: "16px", background: "#1B6B4A", color: "#fff", fontWeight: 700, fontSize: ".78rem", textAlign: "center", textDecoration: "none" }}>📞 اتصل الآن</a>
        <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع SALT North Coast من تطوير مصر")}`} target="_blank" rel="noopener noreferrer"
          style={{ padding: "16px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".78rem", textAlign: "center", textDecoration: "none" }}>💬 واتساب</a>
      </div>
    </div>
  )
}
