import React, { useState, useEffect, useRef, useCallback } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  // Allow for node build
  let win = ''
  let body = ''
  if (typeof window !== 'undefined') {
    body = document.body
    win = window
  }

  // DOM refs
  const gc = useRef()
  const o = useRef()

  // State
  const [isForward, setIsForward] = useState(true)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  // Hook
  const useEventListener = (eventName, handler, element) => {
    // Create a ref that stores handler
    const savedHandler = useRef()

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
      savedHandler.current = handler
    }, [handler])

    useEffect(
      () => {
        // Make sure element supports addEventListener
        // On 
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        // Create event listener that calls handler function stored in ref
        const eventListener = event => savedHandler.current(event);

        element.addEventListener(eventName, eventListener)

        return () => {
          element.removeEventListener(eventName, eventListener)
        }
      },
      [eventName, element] // Re-run if eventName or element changes
    )
  }

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(
    ({ clientX, clientY }) => {
      // Update coordinates
      setCoords({ x: clientX, y: clientY })
      mouseColorShadows({ x: coords.x, y: coords.y }, gc)
    },
    [setCoords, coords, gc]
  )

  const doBarrelRoll = (e) => {
    e.preventDefault()
    const bodyRect = body.getBoundingClientRect()
    const oRect = o.current.getBoundingClientRect()
    const x = (oRect.left + oRect.right) / 2 - bodyRect.left
    const y = (oRect.top + oRect.bottom) / 2 - bodyRect.top
    body.style.transformOriginX = x + 'px'
    body.style.transformOriginY = y + 'px'
    body.style.webkitTransformOriginX = x + 'px'
    body.style.webkitTransformOriginY = y + 'px'
    if (isForward) {
      body.className = 'barrelroll'
    } else {
      body.className = 'barrelroll-reverse'
    }
    isForward ? setIsForward(false) : setIsForward(true)
  }

  const mouseColorShadows = (coordinates, gc) => {
    const heading = gc.current
    const rXP = (coordinates.x - heading.offsetLeft - heading.clientWidth / 2)
    const rYP = (coordinates.y - heading.offsetTop - heading.clientHeight / 2)
    const dtsv1 = `${rYP / 10}`
    const dtsv2 = `${rXP / 80}`
    const dtsv3 = `rgba(227,6,19,.8)`
    const dtsv4 = `${rYP / 8}`
    const dtsv5 = `${rXP / 60}`
    const dtsv6 = `rgba(255,237,0,1)`
    const dtsv7 = `${rXP / 70}`
    const dtsv8 = `${rYP / 12}`
    const dtsv9 = `rgba(0,159,227,.7)`
    const dynamicTextShadowValues = `${dtsv1}px ${dtsv2}px ${dtsv3}, ${dtsv4}px ${dtsv5}px ${dtsv6}, ${dtsv7}px ${dtsv8}px ${dtsv9}`
    heading.style.textShadow = dynamicTextShadowValues
  }

  // Add event listener using our hook
  useEventListener('mousemove', handler, win)
  useEventListener('mousemove', handler, gc)

  return (
    <Layout>
      <SEO title="George Design - A website" />
      {/* <h6>
        The mouse position is ({coords.x}, {coords.y})
      </h6> */}
      <h1 id='heading' ref={gc}>
        Ge<a
          id='rolypoly'
          tabIndex='-1'
          aria-disabled='true'
          href='/'
          title='Oh ho ho, click me!'
          ref={o}
          onClick={doBarrelRoll}
        >o</a
        >rge Clark
      </h1>
      <ul className='links'>
        <li>
          <a
            href='https://twitter.com/h0rhay'
            title='George Clark on Twitter'
          ><svg
            style={{ 'enableBackground': 'new 0 0 67 67' }}
            viewBox='0 0 67 67'
            xmlns='http://www.w3.org/2000/svg'
          >
              <desc>Twitter icon</desc>
              <path
                d='M38.167,22.283c-2.619,0.953-4.274,3.411-4.086,6.101  l0.063,1.038l-1.048-0.127c-3.813-0.487-7.145-2.139-9.974-4.915l-1.383-1.377l-0.356,1.017c-0.754,2.267-0.272,4.661,1.299,6.271  c0.838,0.89,0.649,1.017-0.796,0.487c-0.503-0.169-0.943-0.296-0.985-0.233c-0.146,0.149,0.356,2.076,0.754,2.839  c0.545,1.06,1.655,2.097,2.871,2.712l1.027,0.487l-1.215,0.021c-1.173,0-1.215,0.021-1.089,0.467  c0.419,1.377,2.074,2.839,3.918,3.475l1.299,0.444l-1.131,0.678c-1.676,0.976-3.646,1.526-5.616,1.567  C20.775,43.256,20,43.341,20,43.405c0,0.211,2.557,1.397,4.044,1.864c4.463,1.377,9.765,0.783,13.746-1.568  c2.829-1.674,5.657-5,6.978-8.221c0.713-1.715,1.425-4.851,1.425-6.354c0-0.975,0.063-1.102,1.236-2.267  c0.692-0.678,1.341-1.419,1.467-1.631c0.21-0.403,0.188-0.403-0.88-0.043c-1.781,0.636-2.033,0.551-1.152-0.402  c0.649-0.678,1.425-1.907,1.425-2.267c0-0.063-0.314,0.042-0.671,0.233c-0.377,0.212-1.215,0.53-1.844,0.72l-1.131,0.361l-1.027-0.7  c-0.566-0.381-1.361-0.805-1.781-0.932C40.766,21.902,39.131,21.944,38.167,22.283z M34,64C17.432,64,4,50.568,4,34  C4,17.431,17.432,4,34,4s30,13.431,30,30C64,50.568,50.568,64,34,64z'
                style={{ 'fillRule': 'evenodd', 'clipRule': 'evenodd', 'fill': '#010101' }}
              /></svg
            ></a>
        </li>
        <li>
          <a href='https://github.com/h0rhay' title='George Clark on GitHub'
          ><svg
            style={{ 'enableBackground': 'new 0 0 67 67' }}
            viewBox='0 0 67 67'
            xmlns='http://www.w3.org/2000/svg'
          >
              <desc>GitHub icon</desc>
              <path
                d='M20.543,34.568c-0.054,0,0.592,1.367,0.61,1.367  c1.41,2.516,4.128,4.08,8.713,4.514c-0.654,0.488-1.44,1.414-1.549,2.484c-0.823,0.523-2.478,0.696-3.764,0.297  c-1.803-0.559-2.493-4.066-5.192-3.566c-0.584,0.107-0.468,0.486,0.037,0.809c0.823,0.523,1.597,1.178,2.194,2.571  c0.459,1.07,1.423,2.981,4.473,2.981c1.21,0,2.058-0.143,2.058-0.143s0.023,2.731,0.023,3.793c0,1.225-1.682,1.57-1.682,2.159  c0,0.233,0.557,0.255,1.004,0.255c0.884,0,2.723-0.725,2.723-1.998c0-1.011,0.017-4.41,0.017-5.006c0-1.3,0.709-1.712,0.709-1.712  s0.088,6.94-0.169,7.872c-0.302,1.094-0.847,0.939-0.847,1.427c0,0.726,2.214,0.179,2.948-1.416c0.567-1.239,0.319-8.05,0.319-8.05  l0.605-0.012c0,0,0.034,3.117,0.013,4.542c-0.021,1.476-0.123,3.342,0.769,4.222c0.586,0.579,2.484,1.594,2.484,0.666  c0-0.539-1.04-0.982-1.04-2.441v-6.715c0.831,0,0.706,2.208,0.706,2.208l0.061,4.103c0,0-0.184,1.494,1.645,2.119  c0.645,0.223,2.025,0.283,2.09-0.09c0.065-0.373-1.662-0.928-1.678-2.084c-0.01-0.707,0.032-1.119,0.032-4.187  c0-3.068-0.419-4.202-1.88-5.106c4.508-0.455,7.299-1.551,8.658-4.486c0.106,0.003,0.555-1.371,0.496-1.371  c0.305-1.108,0.47-2.419,0.502-3.971c-0.008-4.21-2.058-5.699-2.451-6.398c0.58-3.187-0.098-4.637-0.412-5.135  c-1.162-0.406-4.041,1.045-5.615,2.067c-2.564-0.737-7.986-0.666-10.019,0.19c-3.751-2.639-5.736-2.235-5.736-2.235  s-1.283,2.259-0.339,5.565c-1.234,1.546-2.154,2.64-2.154,5.539C19.906,31.83,20.102,33.292,20.543,34.568z M33,64  C16.432,64,3,50.568,3,34C3,17.431,16.432,4,33,4s30,13.431,30,30C63,50.568,49.568,64,33,64z'
                style={{ 'fillRule': 'evenodd', 'clipRule': 'evenodd', 'fill': '#010101' }}
              /></svg
            ></a>
        </li>
        <li>
          <a
            href='https://www.linkedin.com/in/georgedesign/'
            title='George Clark on LinkedIn'
          ><svg
            style={{ 'enableBackground': 'new 0 0 67 67' }}
            viewBox='0 0 67 67'
            xmlns='http://www.w3.org/2000/svg'
          >
              <desc>LinkedIn icon</desc>
              <path
                d='M50.837,48.137V36.425c0-6.275-3.35-9.195-7.816-9.195  c-3.604,0-5.219,1.983-6.119,3.374V27.71h-6.79c0.09,1.917,0,20.427,0,20.427h6.79V36.729c0-0.609,0.044-1.219,0.224-1.655  c0.49-1.22,1.607-2.483,3.482-2.483c2.458,0,3.44,1.873,3.44,4.618v10.929H50.837z M22.959,24.922c2.367,0,3.842-1.57,3.842-3.531  c-0.044-2.003-1.475-3.528-3.797-3.528s-3.841,1.524-3.841,3.528c0,1.961,1.474,3.531,3.753,3.531H22.959z M34,64  C17.432,64,4,50.568,4,34C4,17.431,17.432,4,34,4s30,13.431,30,30C64,50.568,50.568,64,34,64z M26.354,48.137V27.71h-6.789v20.427  H26.354z'
                style={{ 'fillRule': 'evenodd', 'clipRule': 'evenodd', 'fill': '#010101' }}
              /></svg
            ></a>
        </li>
      </ul>
      <p>Front end developer, husband, father of 3, lover of <span role='img' aria-label='cheese emoji'>🧀</span>.</p>
      <p>
        I code in HTML, CSS, JavaScript, <br />and I work with technologies such as
        {` `}<a href='https://www.reactjs.org'>React</a>,
        {` `}<a href='https://www.gatsbyjs.org/'>Gatsby</a>,
        {` `}<a href='https://webpack.js.org/'>webpack</a>
        {` `}&
        {` `}<a href='https://www.styled-components.com/'>Styled Components</a>.
      </p>
      <p>
        Please <a href='mailto:clarkgeorge76@gmail.com'>drop me</a> an email if you'd like to get in touch.
      </p>
    </Layout>
  )
}

export default IndexPage
