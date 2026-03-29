import { ImageResponse } from 'next/og'

export const alt = 'Helpful Home Buyers USA — Sell Your House Fast for Cash'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1a2e',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #f59e0b, #f97316)',
          }}
        />

        {/* Main heading */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: '24px',
            letterSpacing: '-1px',
          }}
        >
          Sell Your House Fast
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: '#cbd5e1',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Fair Cash Offer in 24 Hours • Virginia &amp; Nationwide
        </div>

        {/* Bottom contact bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '12px',
            padding: '16px 40px',
          }}
        >
          <span
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: '#f59e0b',
            }}
          >
            (703) 940-1159
          </span>
          <span style={{ color: '#f59e0b', fontSize: 20 }}>•</span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: '#f59e0b',
            }}
          >
            {process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') ?? 'helpfulhomebuyersusa.com'}
          </span>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #f59e0b, #f97316)',
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  )
}
