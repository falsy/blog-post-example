import "./global.css"
import Link from "next/link"

export const metadata = {
  title: "Nextjs by Version",
  description: "Learn about nextjs by version."
}

export default function RootLayout({ children }) {
  return (
    <html lang={"en"}>
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/blog/post">Post</Link>
              </li>
              <li>
                <Link href="/defaultDir">default</Link>
              </li>
              <li>
                <Link href="/defaultDir/testChildren">
                  default - testChildren
                </Link>
              </li>
              <li>
                <Link href="/dynamic/test">dynamic - test</Link>
              </li>
              <li>
                <Link href="/parallel">parallel</Link>
              </li>
              <li>
                <Link href="/actions">actions</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div>{children}</div>
      </body>
    </html>
  )
}
