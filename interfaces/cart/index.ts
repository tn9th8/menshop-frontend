import { IProduct } from 'interfaces/product'

export interface ICart {
  productItems: {
    _id: string
    quantity: number
    variant: string
    product: IProduct
  }[]
  shop: {
    _id: string
    name: string
  }
  discounts: any[]
}

export interface IListCart {
  _id: string;
  status: string;
  user: string;
  __v: number;
  tourCount: number;
  tours: ITourCart[];
}

export interface IAddToCart {
  product: string
  shop: string
  quantity: number
  variant: string
}

export interface IUpdateToCart {
  user: string;
  tour: {
    itemId: string;
    startDate: string;
    startTime: string;
    participants: IParticipants[];
  };
}

export interface IDeleteCart {
  productItems: string[]
}

export interface ITourCart {
  tour: {
    _id: string;
    code: string;
    title: string;
    thumbnail: string;
    numOfRating: number,
    ratingAverage: number
  };
  isPrivate: boolean;
  startDate: string;
  startTime: string;
  participants: IParticipants[];
  transports: [];
  hotels: [];
  _id: string;
}

export interface IParticipants {
  title: string;
  quantity: number;
  price: number;
  currency?: string;
  _id?: string;
}

export interface ICart {
  cart: IListCart;
}

export interface IUpdatedCart {
  updatedCart: IListCart;
}
