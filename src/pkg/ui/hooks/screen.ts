'use client'

import { useState, useEffect } from 'react'

type ScreenType = {
  width: number
  isMedium: boolean
  isSmall: boolean
  isLarge: boolean
}
export default function useScreenType(): ScreenType {
  const [windowWidth, setWindowWidth] = useState<number>(0)

  const isWindow = typeof window !== 'undefined'

  const getWidth = () => (isWindow ? window.innerWidth : windowWidth)

  const resize = () => setWindowWidth(getWidth())

  useEffect(() => {
    if (isWindow) {
      setWindowWidth(getWidth())

      window.addEventListener('resize', resize)

      return () => window.removeEventListener('resize', resize)
    }
    //eslint-disable-next-line
  }, [isWindow])

  // return windowWidth
  const width = windowWidth

  return {
    width,
    isLarge: width > 768,
    isMedium: width > 640 && width <= 768,
    isSmall: width <= 640,
  }
}
