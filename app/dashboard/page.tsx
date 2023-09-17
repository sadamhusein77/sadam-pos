'use client'
import { getUserData } from '@/helpers'
import React, { useEffect } from 'react'

export default function Dashboard() {

    useEffect(() => {
      const dataUser = getUserData()
      console.log('user', dataUser)
    }, [])
    
  return (
    <div>Dashboard</div>
  )
}
