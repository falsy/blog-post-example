import { useEffect, useRef, useState } from "react"

export default function IntersectionC() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`items ${isVisible ? "visible" : "hidden"}`}
      style={{ backgroundColor: "lightyellow" }}
    >
      <div>
        <p>{isVisible ? "Visible" : "Hidden"}</p>
        <p>threshold: 0.1</p>
        <p>(요소의 10% 이상이 뷰포트에 보일 때)</p>
      </div>
    </div>
  )
}
