import React from 'react'
import useScrollPrgores from '../../hooks/useScrollPrgores'
import ProggresBar from './ProgresBar'

const WindowScrollProgres = () => {
    const proggres = useScrollPrgores()

  return (
    <div className='h-1.5 w-full fixed top-0 left-0 z-30'>
        <ProggresBar progress={proggres ?? 0}/>
    </div>
  )
}

export default WindowScrollProgres