"use client"
import { useEffect } from "react"

const P = "+201044442622"
const PD = "0104 444 2622"
const WN = "201044442622"

export default function ThankYou() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", { send_to: "AW-18307172737/a1oUCMbDs84cEIGTxZlE", value: 1.0, currency: "EGP" })
      }
    } catch { }
  }, [])

  return (
    <main dir="rtl" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", fontFamily: "'Almarai',sans-serif", background: "#F4F9F6" }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem", color: "#1C1917" }}>تم الإرسال!</h1>
        <p style={{ color: "#8B7355", marginBottom: "2rem", fontSize: "0.9rem" }}>سيتواصل معك فريقنا خلال ٢٤ ساعة</p>
        <div style={{ border: "1px solid rgba(28,25,23,0.1)", padding: "20px", marginBottom: "20px", textAlign: "right", borderRadius: 10 }}>
          <a href={`tel:${P}`} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee", textDecoration: "none", color: "#1C1917" }}>
            <span style={{ fontWeight: 700 }} dir="ltr">{PD}</span>
            <span style={{ fontSize: "0.75rem", color: "#8B7355" }}>اتصال مباشر</span>
          </a>
          <a href={`https://wa.me/${WN}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", textDecoration: "none" }}>
            <span style={{ fontWeight: 700, color: "#25D366" }}>واتساب</span>
            <span style={{ fontSize: "0.75rem", color: "#8B7355" }}>رد فوري</span>
          </a>
        </div>
        <a href="/" style={{ display: "inline-block", background: "#FF4713", color: "white", padding: "12px 32px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", borderRadius: 8 }}>
          العودة للرئيسية
        </a>
      </div>
    </main>
  )
}
