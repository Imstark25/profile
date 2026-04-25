'use client'
import dynamic from 'next/dynamic'

const Blob = dynamic(() => import('@/app/components/canvas/Blob'), { ssr: false })

export default function Page() {
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Next 3D Starter</h1>
          <p className='mb-8 text-2xl leading-normal'>A minimalist starter for React, Next, and React Three Fiber.</p>
        </div>
      </div>

      <Blob className='absolute top-0 right-0 -z-10' />
    </>
  )
}


