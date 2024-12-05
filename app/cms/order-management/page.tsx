import CMSLayout from 'components/Layout/CMSLayout'
import OrderManagement from 'pages/CMS/OrderManagement'

const OrderManagementPage = () => {
  return (
    <CMSLayout title="QUẢN LÝ ĐƠN HÀNG" topBarTitle="QUẢN LÝ ĐƠN HÀNG">
      <OrderManagement />
    </CMSLayout>
  )
}

export default OrderManagementPage
