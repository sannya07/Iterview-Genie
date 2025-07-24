import { configureStore } from '@reduxjs/toolkit'
import Userdata from'./UserSlice'


const store = configureStore({
  reducer: {
    user: Userdata,
  },
})

export default store;