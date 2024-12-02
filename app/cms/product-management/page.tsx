import CMSLayout from 'components/Layout/CMSLayout'
import ProductManagement from 'pages/CMS/ProductManagement'

const ProductManagementPage = () => {
  return (
    <CMSLayout title="Product Management" topBarTitle="Product Management">
      <ProductManagement />
    </CMSLayout>
  );
}

export default ProductManagementPage
