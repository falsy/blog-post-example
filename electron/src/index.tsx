import React from 'react'
import ReactDOM from 'react-dom/client'
import { Global, css } from '@emotion/react'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }}>
    <Global styles={css`
      margin: 0;
      padding: 0;
    `}/>
    <h1 style={{
      height: '60px'
    }}>hello world2</h1>
    <webview id="foo" src="https://www.github.com/" style={{
      display: 'inline-flex',
      width: '100%',
      height: 'calc(100% - 60px)'}} />
  </div>
)