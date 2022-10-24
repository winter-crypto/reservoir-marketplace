import React, { useEffect, useState } from 'react'

const WinterCheckout: React.FC<{
  showModal: boolean
  contractAddress?: string
  tokenId?: string
  walletAddress?: string
  email?: string
  mintQuantity?: number
  erc1155Video?: string
  title?: string
  extraMintParams?: Record<string, string | number | undefined>
  priceFunctionParams?: Record<string, string | number | undefined>
  brandImage?: string
  production?: boolean
  fillSource?: string
  onClose?: () => void
  onSuccess?: (txId: string, email: string) => void
}> = ({
  showModal,
  contractAddress,
  tokenId,
  walletAddress,
  email,
  mintQuantity,
  erc1155Video,
  title,
  extraMintParams,
  priceFunctionParams,
  brandImage,
  production,
  fillSource,
  onClose,
  onSuccess,
}) => {
  const [projectUrl, setProjectUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleWindowEvent = (
        e: Event & {
          data:
            | { name: string; transactionhash: string; email: string }
            | string
        }
      ) => {
        if (typeof e.data === 'string') {
          if (e.data === 'closeWinterCheckoutModal') {
            onClose?.()
          }
        } else {
          if (e.data.name === 'closeWinterCheckoutModal') {
            onClose?.()
          }
        }
      }
      window.addEventListener('message', handleWindowEvent)
      return () => window.removeEventListener('message', handleWindowEvent)
    }
  }, [onClose, onSuccess])

  useEffect(() => {
    let queryString = 'contractAddress=' + contractAddress
    queryString += '&tokenId=' + tokenId
    if (walletAddress) {
      queryString += '&walletAddress=' + walletAddress
    }
    if (email) {
      queryString += '&email=' + email
    }
    if (mintQuantity) {
      queryString += '&mintQuantity=' + mintQuantity
    }
    if (erc1155Video) {
      queryString += '&erc1155Video=' + erc1155Video
    }
    if (title) {
      queryString += '&title=' + title
    }
    if (extraMintParams) {
      queryString += `&extraMintParams=${encodeURIComponent(
        JSON.stringify(extraMintParams)
      )}`
    }
    if (priceFunctionParams) {
      queryString += `&priceFunctionParams=${encodeURIComponent(
        JSON.stringify(priceFunctionParams)
      )}`
    }
    if (brandImage) {
      queryString += `&brandImage=${encodeURIComponent(brandImage)}`
    }
    if (fillSource) {
      queryString += `&fillSource=` + fillSource
    }

    const url =
      process.env.NEXT_PUBLIC_WINTER_ENV === 'local'
        ? 'http://localhost:3002/?' + queryString
        : production
        ? 'https://checkout.usewinter.com//?' + queryString
        : 'https://sandbox-winter-checkout.onrender.com/?' + queryString

    setProjectUrl(url)
  }, [
    contractAddress,
    tokenId,
    production,
    walletAddress,
    email,
    mintQuantity,
    extraMintParams,
    priceFunctionParams,
    title,
    erc1155Video,
    brandImage,
  ])

  return showModal ? (
    <div
      dangerouslySetInnerHTML={{
        __html: `<iframe id="winter-checkout" src="${projectUrl}" style="color-scheme: light; position: fixed; top: 0px; bottom: 0px; right: 0px; width: 100%; border: none; margin: 0px; padding: 0px; overflow: hidden; z-index: 999999; height: 100%;" />`,
      }}
    />
  ) : (
    <></>
  )
}

export default WinterCheckout
