import type { Handle, RemixNode } from 'remix/ui'
import { event } from '../data/event.ts'
import { color, font } from '../ui/theme.ts'

export interface DocumentProps {
  children?: RemixNode
  title?: string
  description?: string
}

const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')

const baseStyles = `
@layer base {
  :root {
    --paper: ${color.paper};
    --paper-deep: ${color.paperDeep};
    --paper-light: ${color.paperLight};
    --ink: ${color.ink};
    --ink-soft: ${color.inkSoft};
    --sage: ${color.sage};
    --sage-soft: ${color.sageSoft};
    --olive: ${color.olive};
    --wheat: ${color.wheat};
    --clay: ${color.clay};
    --line: ${color.line};
    color-scheme: light;
  }
  * { box-sizing: border-box; }
  html { background: var(--paper); }
  body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: ${font.serif};
    font-size: 17px;
    line-height: 1.55;
    font-variation-settings: 'SOFT' 60, 'opsz' 14;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 { font-weight: 500; margin: 0; }
  p { margin: 0; }
  a { color: var(--olive); text-decoration-color: var(--sage-soft); text-underline-offset: 3px; }
  a:hover { text-decoration-color: var(--olive); }
  button, input, select, textarea { font: inherit; color: inherit; }
  :focus-visible { outline: 2px solid var(--olive); outline-offset: 3px; border-radius: 4px; }
  img { max-width: 100%; }
  ::selection { background: var(--sage-soft); }
}
`

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    let { children, title = event.title, description } = handle.props

    return (
      <html lang="pt-BR">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={color.paper} />
          <title>{title}</title>
          {description ? <meta name="description" content={description} /> : null}
          <meta property="og:title" content={title} />
          {description ? <meta property="og:description" content={description} /> : null}
          <meta property="og:type" content="website" />
          <meta property="og:image" content={`${siteUrl}/og.png`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Allura&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&display=swap"
          />
          <style>{baseStyles}</style>
        </head>
        <body>{children}</body>
      </html>
    )
  }
}
