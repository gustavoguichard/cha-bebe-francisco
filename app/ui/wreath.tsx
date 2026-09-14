import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'

import { color } from './theme.ts'

const leafColors = [color.sage, color.olive, color.wheat, color.sageSoft]

function Leaf(handle: Handle<{ angle: number; radius: number; size: number; tone: number; flip: boolean }>) {
  return () => {
    let { angle, radius, size, tone, flip } = handle.props
    let tilt = flip ? -34 : 34
    return (
      <g transform={`rotate(${angle}) translate(${radius} 0) rotate(${tilt}) scale(${size})`}>
        <path
          d="M0 0C4 -7 12 -9 20 -4C14 4 6 6 0 0Z"
          fill={leafColors[tone % leafColors.length]}
          opacity="0.9"
        />
        <path d="M1 0C7 -2 13 -3 18 -4" stroke={color.olive} stroke-width="0.8" fill="none" opacity="0.6" />
      </g>
    )
  }
}

function Sprig(handle: Handle<{ from: number; to: number; radius: number; seed: number }>) {
  return () => {
    let { from, to, radius, seed } = handle.props
    let count = 15
    let leaves: RemixNode[] = []
    for (let i = 0; i < count; i++) {
      let angle = from + ((to - from) * i) / (count - 1)
      let wobble = ((i * 7 + seed) % 5) - 2
      let taper = 1 - Math.abs(i - (count - 1) / 2) / (count - 1)
      leaves.push(
        <Leaf
          key={`a${i}`}
          angle={angle}
          radius={radius + 4 + wobble}
          size={1.7 + taper * 0.9 + ((i + seed) % 3) * 0.2}
          tone={(i + seed) % 4}
          flip={false}
        />,
        <Leaf
          key={`b${i}`}
          angle={angle + 5}
          radius={radius - 10 - wobble}
          size={1.4 + taper * 0.8 + ((i + seed + 1) % 3) * 0.2}
          tone={(i + seed + 2) % 4}
          flip
        />,
        <Leaf
          key={`c${i}`}
          angle={angle + 2.5}
          radius={radius - 3}
          size={1.1 + ((i + seed + 2) % 3) * 0.25}
          tone={(i + seed + 1) % 4}
          flip={i % 2 === 0}
        />,
      )
    }
    return (
      <g>
        <path
          d={describeArc(radius - 2, from, to)}
          fill="none"
          stroke={color.olive}
          stroke-width="1.4"
          opacity="0.6"
        />
        {leaves}
      </g>
    )
  }
}

function describeArc(radius: number, from: number, to: number) {
  let start = polar(radius, from)
  let end = polar(radius, to)
  let large = to - from > 180 ? 1 : 0
  return `M${start.x} ${start.y}A${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`
}

function polar(radius: number, degrees: number) {
  let radians = (degrees * Math.PI) / 180
  return { x: (radius * Math.cos(radians)).toFixed(2), y: (radius * Math.sin(radians)).toFixed(2) }
}

function Heart(handle: Handle<{ x: number; y: number; size: number; fill: string }>) {
  return () => {
    let { x, y, size, fill } = handle.props
    return (
      <path
        transform={`translate(${x} ${y}) scale(${size})`}
        d="M0 6C-6 0 -8 -4 -5 -7C-3 -9 0 -8 0 -5C0 -8 3 -9 5 -7C8 -4 6 0 0 6Z"
        fill={fill}
        opacity="0.85"
      />
    )
  }
}

export function Wreath(handle: Handle<{ children?: RemixNode }>) {
  return () => (
    <div
      mix={css({
        position: 'relative',
        width: 'min(88vw, 420px)',
        aspectRatio: '1',
        margin: '0 auto',
      })}
    >
      <svg
        viewBox="-210 -210 420 420"
        aria-hidden="true"
        mix={css({ position: 'absolute', inset: 0, width: '100%', height: '100%' })}
      >
        <circle r="196" fill={color.paperLight} />
        <circle r="196" fill="none" stroke={color.line} stroke-width="1" />
        <Sprig from={104} to={256} radius={170} seed={1} />
        <Sprig from={-76} to={76} radius={170} seed={3} />
        <Heart x={0} y={-176} size={1.4} fill={color.wheat} />
        <Heart x={0} y={182} size={1.1} fill={color.clay} />
        <circle cx="-120" cy="-150" r="2.4" fill={color.wheat} opacity="0.8" />
        <circle cx="130" cy="-140" r="2" fill={color.sage} opacity="0.8" />
        <circle cx="-140" cy="130" r="2" fill={color.sage} opacity="0.8" />
        <circle cx="125" cy="145" r="2.4" fill={color.wheat} opacity="0.8" />
      </svg>
      <div
        mix={css({
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 18%',
          boxSizing: 'border-box',
        })}
      >
        {handle.props.children}
      </div>
    </div>
  )
}

export function Rainbow() {
  return () => (
    <svg viewBox="0 0 120 64" aria-hidden="true" mix={css({ width: '96px', height: 'auto', display: 'block' })}>
      <path d="M8 60A52 52 0 0 1 112 60" fill="none" stroke={color.clay} stroke-width="10" stroke-linecap="round" />
      <path d="M22 60A38 38 0 0 1 98 60" fill="none" stroke={color.wheat} stroke-width="10" stroke-linecap="round" />
      <path d="M36 60A24 24 0 0 1 84 60" fill="none" stroke={color.sage} stroke-width="10" stroke-linecap="round" />
      <path d="M50 60A10 10 0 0 1 70 60" fill="none" stroke={color.paperDeep} stroke-width="10" stroke-linecap="round" />
    </svg>
  )
}

export function HeartSlot(handle: Handle<{ filled: boolean }>) {
  return () => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      mix={css({ width: '20px', height: '20px', display: 'block', flex: '0 0 auto' })}
    >
      <path
        d="M12 21C4 15 1 10 4 6C6 3 10 3 12 7C14 3 18 3 20 6C23 10 20 15 12 21Z"
        fill={handle.props.filled ? color.clay : 'none'}
        stroke={handle.props.filled ? color.clay : color.clay}
        stroke-width="1.6"
        stroke-linejoin="round"
        opacity={handle.props.filled ? '1' : '0.7'}
      />
    </svg>
  )
}
