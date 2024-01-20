import { Document } from 'mongodb';

// ====== USER PARAMS
export type UserSessionParams = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

// ====== USER PARAMS
export type CreateUserParams = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  id: string;
  data: {
    selectedOptions: { value: string }[]; // Specify the expected structure
  };
};

// ====== PRODUCT PARAMS
export type AddProductParams = {
  data: {
    title: string;
    desc: string;
    imageUrl: any;
    downloadLink: any;
    categoryId: string;
    price?: string;
    isFree: boolean;
    url: string;
  };
  // path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    desc: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type DeleteEventParams = {
  eventId: string;
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  name: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  productTitle: string;
  productId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  userId: string;
  productId: string;
  totalAmount: string;
  numOfDownload: number;

  // stripeId: string;
  // eventId: string;
  // buyerId: string;
  // totalAmount: string;
  // createdAt: Date;
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchstring: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type Category = {
  id: string;
  name: string;
};

export interface productDetails extends Document {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  downloadLink: string;
  price: string;
  isFree: boolean;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: Category;
}

//interfaces

export interface IProduct extends Document {
  id: string;
  title: string;
  desc: string;
  createdAt: Date;
  imageUrl: any;
  downloadLink: any;
  price?: string;
  isFree: boolean;
  url: string;
  categoryId: string;
}

export interface IUser extends Document {
  id: string;
  email: string;
  selectedOptions: [];
}

// export interface IOrder extends Document {
//   createdAt: Date;
//   stripeId: string;
//   totalAmount: string;
//   product: {
//     _id: string;
//     title: string;
//   };
//   user: {
//     _id: string;
//     email: string;
//     name: string;
//   };
// }

export interface IOrder extends Document {
  id: string;
  userId: string;
  productId: string;
  totalAmount: number;
  numOfDownload: number;
  // createdAt: string;
  // user: {
  //   email: string;
  // };
}

// export interface IUser extends Document {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image: string;
//     role: string;
//   };
// }
