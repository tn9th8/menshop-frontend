const cmsRoutes = {
  cms: {
    value: '/cms',
    login: {
      value: '/cms/login'
    },
    forgotPassword: {
      value: '/cms/forgot-password'
    },
    resetPassword: {
      value: (resetPasswordToken: string) => `/cms/reset-password/${resetPasswordToken}`
    },
    accountSettings: {
      value: '/cms/account-settings'
    },
    orderManagement: {
      value: '/cms/order-management',
    },
    bookingManagement: {
      value: '/cms/booking-management',
      detail: {
        value: (bookingId: string) => `/cms/booking-management/${bookingId}`
      }
    },
    tourManagement: {
      value: '/cms/tour-management',
      detail: {
        value: (tourId: string) => `/cms/tour-management/${tourId}`
      }
    },
    reviewManagement: {
      value: '/cms/review-management',
    },
    accountManagement: {
      value: '/cms/account-management',
    },
    discountManagement: {
      value: '/cms/discount-management',
      detail: {
        value: (discountId: string) => `/cms/discount-management/${discountId}`
      }
    },
    locationManagement: {
      detail: {
        value: (locationId: string) => `/cms/location-management/${locationId}`
      }
    },
    transportationManagement: {
      detail: {
        value: (transportationId: string) => `/cms/transportation-management/${transportationId}`
      }
    },
    generalSettings: {
      value: '/cms/general-settings',
    },
    myShop: {
      value: '/cms/my-shop',
    },
    productManagement: {
      value: '/cms/product-management',
      detail: {
        value: (productId: string) => `/cms/product-management/${productId}`
      }
    },
  }
}

export default cmsRoutes
