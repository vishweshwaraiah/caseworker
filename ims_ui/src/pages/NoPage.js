import React from 'react'
import JvIcon from 'components/JvIcon'
import JvButton from 'components/JvButton'

const NoPage = () => {
  return (
    <main className="not_found">
      <div className="not_found_icon">
        <JvIcon svgName="lost_space" size="50vh" />
      </div>
      <div className="not_found_content">
        <h1>404</h1>
        <h2>UH OH! You're lost.</h2>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <JvButton href="/" variant="dark">
          HOME
        </JvButton>
      </div>
    </main>
  )
}

export default NoPage
