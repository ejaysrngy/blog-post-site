import React from 'react'
import { NavigationTypes } from './types'

export default function Navigation(props: NavigationTypes) {
  const {navLinks} = props
    
  return (
    <div>{navLinks}</div>
  )
}
