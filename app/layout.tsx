import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SALT North Coast | تطوير مصر — سولت رأس الحكمة",
  description: "SALT سولت الساحل الشمالي من تطوير مصر — منتجع فاخر في رأس الحكمة على 294 فدان. شاليهات وفيلات بإطلالة بحر مباشرة، مارينا عالمية، فندق 5 نجوم. مقدم 10% وتقسيط حتى 8 سنوات.",
  keywords: "SALT,سولت,SALT North Coast,سولت الساحل الشمالي,تطوير مصر,Tatweer Misr,رأس الحكمة,شاليهات رأس الحكمة,فيلات الساحل الشمالي",
  openGraph: {
    title: "SALT North Coast | تطوير مصر — سولت رأس الحكمة",
    description: "منتجع SALT سولت في رأس الحكمة على 294 فدان — مارينا، فندق 5 نجوم، لاجونات. مقدم 10% وتقسيط 8 سنوات.",
    locale: "ar_EG",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18307172737" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18307172737');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
