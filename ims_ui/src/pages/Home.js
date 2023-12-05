import React, { useEffect, useState } from 'react'
import { findSolution, findFibonacci } from 'helpers/globals'

const Home = () => {
  const a = [17, 15, 18, 19, 11]
  const b = [1, 1, 1, 1, 1]
  const n = 4

  const [res, setRes] = useState(0)

  useEffect(() => {
    const res = findSolution(a, b, n)
    setRes(res)
  }, [])

  return (
    <div className="home__page">
      <h1>Hello Home! Res is: {res}</h1>
      <h2>Fibonacci of 10 is: {JSON.stringify(findFibonacci(10))}</h2>
    </div>
  )
}

export default Home
