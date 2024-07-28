import { configureStore } from "@reduxjs/toolkit";

import ProductsReducer from "./reducers/products";
import FiltersReducer from "./reducers/filters";
import CartsReducer from "./reducers/carts";
import UsersReducer from "./reducers/users";
import NotificationsReducer from "./reducers/notifications";

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    filters: FiltersReducer,
    carts: CartsReducer,
    users: UsersReducer,
    notifications: NotificationsReducer,
  },
});
