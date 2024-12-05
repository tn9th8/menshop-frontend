import CMSLayout from 'components/Layout/CMSLayout'
import ProductDetail from 'pages/CMS/ProductManagement/ProductDetailPage'

const ProductDetailPage = () => {
  return (
    <CMSLayout title="QUẢN LÝ SẢN PHẨM" topBarTitle="QUẢN LÝ SẢN PHẨM">
      <ProductDetail />
    </CMSLayout>
  )
}

export default ProductDetailPage