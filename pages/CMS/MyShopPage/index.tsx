'use client'
import { useStores } from 'hooks/useStores'
import { useEffect } from 'react'


const MyShopPage = () => {
  const { shopStore } = useStores()
  const { myShop } = shopStore

  useEffect(() => {
    shopStore.fetchMyShop()
  }, [])

  return (
    <div>
      <h1>My Shop Page</h1>
    </div>
  )
}

export default MyShopPage
