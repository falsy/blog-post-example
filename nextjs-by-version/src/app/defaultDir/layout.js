export default function Layout({ test, children }) {
  return (
    <div>
      <div>{test}</div>
      <div>{children}</div>
    </div>
  )
}
