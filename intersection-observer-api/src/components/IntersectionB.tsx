import { useEffect, useRef, useState } from "react"

export default function IntersectionB() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.5 }
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
      style={{ backgroundColor: "lightblue" }}
    >
      <div>
        <p>{isVisible ? "Visible" : "Hidden"}</p>
        <p>threshold: 0.5</p>
        <p>(요소의 50% 이상이 뷰포트에 보일 때)</p>
      </div>
    </div>
  )
}
