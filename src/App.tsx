import * as React from 'react'

import './App.css'

function App(): JSX.Element {
  return (
    <>
      <main>
        <h1>This is a basic React app</h1>

        <p>It's for quickly creating a Typescript based react app.</p>

        <p>
          It doesn't do anything fancy, it's just an easy setup for getting
          started with some tools like eslint and prettier.
        </p>

        <p>And as an added bonus you can easily deploy it to Github Pages</p>
      </main>

      <footer>
        <p>
          Made with the{' '}
          <a href="https://github.com/joshdales/webpack-react-app">
            webpack-react-app
          </a>{' '}
          template
        </p>
      </footer>
    </>
  )
}

export default App
