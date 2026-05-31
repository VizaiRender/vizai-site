import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Vizai Render — Renders fotorrealistas com IA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const iconUrl = 'https://vizairender.com/icon.png'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0940D2',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '64px',
          padding: '80px',
        }}
      >
        <img
          src={iconUrl}
          width={200}
          height={200}
          style={{ borderRadius: '32px', flexShrink: 0 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: '80px',
              fontWeight: '700',
              letterSpacing: '-3px',
              lineHeight: 1,
            }}
          >
            Vizai Render
          </div>
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.80)',
              fontSize: '34px',
              fontWeight: '400',
              lineHeight: 1.3,
            }}
          >
            Renders fotorrealistas com IA para SketchUp
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
