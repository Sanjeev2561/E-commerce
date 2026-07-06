import { configureStore } from '@reduxjs/toolkit'
import cartess from "../slice/cartslice"
export const store = configureStore({
  reducer: {
    cart:cartess
  },
})