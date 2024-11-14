"use client"

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <head>
        <title>Error</title>
      </head>
      <body>
        <button onClick={() => reset()}>Reset</button>
      </body>
    </html>
  )
}
