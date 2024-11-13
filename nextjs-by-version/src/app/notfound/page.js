import { notFound } from "next/navigation"

export default function page() {
  notFound()

  return (
    <div>
      <p>notfound - page</p>
    </div>
  )
}
