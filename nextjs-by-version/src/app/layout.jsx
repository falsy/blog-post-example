import "./global.css"

export const metadata = {
  title: "Nextjs by Version",
  description: "Learn about nextjs by version."
}

export default function RootLayout({ children }) {
  return (
    <html lang={"en"}>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
