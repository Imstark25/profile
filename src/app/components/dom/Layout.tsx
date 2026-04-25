'use client'

import { useRef, forwardRef } from 'react'
import { usePathname } from 'next/navigation'

const Layout = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()
  const pathname = usePathname()

  return (
    <div
      ref={ref}
      data-scroll-container
      className='dominant'
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'auto',
      }}>
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
