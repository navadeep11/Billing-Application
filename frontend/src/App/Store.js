import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from './Services/AuthenticationApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { ItemApi } from './Services/ItemApi'
import { CartApi } from './Services/CartApi'
import {BillApi} from './Services/BillApi'

export const Store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ItemApi.reducerPath]: ItemApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [BillApi.reducerPath]: BillApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, ItemApi.middleware, CartApi.middleware,BillApi.middleware),
})

setupListeners(Store.dispatch)
