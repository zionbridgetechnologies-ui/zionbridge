import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Zionbridge Technologies | Training & Placement | HR Recruitment | IT Services',
  description: 'Zionbridge Technologies offers industry-expert training, 100% placement assistance, HR recruitment, IT services, certifications, internships, and career guidance. Launch your dream career today.',
  keywords: 'training and placement company, placement training, networking training, software training, HR recruitment, IT services, career guidance, private bank jobs, internship programs, CCNA, Python, Java, Full Stack',
  openGraph: {
    title: 'Zionbridge Technologies | Training & Placement',
    description: 'Launch Your Dream Career with Expert Training & 100% Placement Support',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#0B1F4D', color: '#fff', borderRadius: '12px' } }} />
      </body>
    </html>
  )
}
