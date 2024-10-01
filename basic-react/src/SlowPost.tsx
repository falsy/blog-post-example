import { memo } from "react"

const PostsTab = memo(function PostsTab() {
  let items = []
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />)
  }
  return <ul className="items">{items}</ul>
})

function SlowPost({ index }: { index: number }) {
  let startTime = performance.now()
  while (performance.now() - startTime < 1) {
    // 항목당 1 ms 동안 아무것도 하지 않음으로써 매우 느린 코드를 대리 실행합니다.
  }

  return <li className="item">Post #{index + 1}</li>
}

export default PostsTab
