import { use, Suspense } from "react"

function getName() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        name: "falsy",
      })
    }, 1000)
  })
}

function UserName({ userNamePromise }) {
  const user = use(userNamePromise)

  return <p>{user.name}</p>
}

export default function UseHook() {
  const userNamePromise = getName()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserName userNamePromise={userNamePromise} />
    </Suspense>
  )
}
