import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface userInfotype {
    name:string , email:string , role:string, emailVarified:boolean
}
interface authState {
  status:boolean , userInfo:userInfotype | null
}

const initialState: authState = {
  status:false , userInfo:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    StoreLogin: (state, action:PayloadAction<userInfotype>) => {
      state.status= true
      state.userInfo= action.payload
    },
    StoreLogout: (state) => {
      state.status = false
      state.userInfo= null
    }
  },
})

export const { StoreLogin , StoreLogout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const userInfo = (state: RootState) => state.auth

export default authSlice.reducer