import { RefObject, useEffect, useRef, useState } from "react"

export default function IntersectionG({
  ref: containerRef
}: {
  ref: RefObject<HTMLDivElement | null>
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 1,
        root: containerRef.current,
        rootMargin: "-100px 0px 0px 0px"
      }
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
      style={{ backgroundColor: "lightgoldenrodyellow" }}
    >
      <div>
        <p>{isVisible ? "Visible" : "Hidden"}</p>
        <p>threshold: 1</p>
        <p>(요소의 전체가 뷰포트에 보일 때)</p>
        <p>rootMargin: -100px 0px 0px 0px</p>
        <p>(뷰포트의 위로 100px 만큼 빠르게 비활성화)</p>
      </div>
    </div>
  )
}
