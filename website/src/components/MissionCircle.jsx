import React from 'react'

/**
 * MissionCircle
 * A responsive circular container that displays mission text, matching
 * the reference dark-navy circular UI with centered white typography.
 * - Maintains perfect circle via aspect-square
 * - Uses gradient + inner ring to mirror the photo styling
 * - Adds gentle hover/transition for polish
 */
export default function MissionCircle({ text }) {
  return (
    <div className="w-full flex items-center justify-center">
      {/* Outer wrapper constrains max size and centers the circle */}
      <div
        className="relative select-none"
        style={{
          // desktop ~360px diameter, scales down fluidly
          width: 'min(90vw, 360px)',
        }}
      >
        {/* Circle */}
        <div
          className="group relative aspect-square rounded-full overflow-hidden
                     shadow-xl ring-1 ring-white/20
                     transition-all duration-300 ease-out
                     hover:scale-[1.02] hover:shadow-2xl"
          style={{
            background:
              'radial-gradient(120% 120% at 30% 30%, #1b3a6b 0%, #0f2d52 55%, #0b2342 100%)',
          }}
        >
          {/* Subtle inner light and border to mimic reference */}
          <div
            className="absolute inset-[10%] rounded-full pointer-events-none"
            style={{
              boxShadow:
                'inset 0 0 30px rgba(255,255,255,0.08), inset 0 0 2px rgba(255,255,255,0.35)',
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
            <p
              className="text-center text-white/95 tracking-wide leading-relaxed"
              style={{
                fontSize: 'clamp(12px, 2.6vw, 16px)',
                fontWeight: 500,
              }}
            >
              {text}
            </p>
          </div>

          {/* Hover glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}