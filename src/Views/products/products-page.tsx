import React from 'react'
import CardList from '~/components/card-list/card-list'
import type { ProductsViewProps } from '~/interfaces/IProductsViewProps'

const ProductsPage = ({ page }: ProductsViewProps) => {
  return (
    <div className="w-full justify-center items-center content-center">
      <CardList page={page} />
    </div>
  )
}

export default ProductsPage