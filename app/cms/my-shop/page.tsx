import CMSLayout from 'components/Layout/CMSLayout'
import MyShopPage from 'pages/CMS/MyShopPage'

const MyShopPagePage = () => {
  return (
    <CMSLayout title="Quản lý cửa hàng" topBarTitle="Quản lý cửa hàng">
      <MyShopPage />
    </CMSLayout>
  );
}

export default MyShopPagePage
