import { RefObject, useEffect, useRef, useState } from "react"

export default function IntersectionG({
  ref
}: {
  ref: RefObject<HTMLDivElement | null>
}) {
  const [isVisible, setIsVisible] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 1,
        root: ref.current,
        rootMargin: "-100px 0px 0px 0px"
      }
    )

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={targetRef}
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
