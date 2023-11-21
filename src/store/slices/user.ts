import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { FetchStatus } from './_common'

interface User {
   id: number
   password: string
   isBlocked: boolean
   lastFailedLoginTime: string
   timeToWaitBeforeLoginMs: null | unknown
   lastFailedLoginCount: null | unknown
   role: {
      id: number
      title: string
   }
}

interface UserResponse {
   extra: {
      email: string
   }
   access_token: string
   user: User
}

export const fetchLoginUser = createAsyncThunk(
   'user/fetchLoginUser',
   async ({ email, password }: { email: string; password: string }) => {
      const promise = fetch('http://51.250.109.119/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
            accept: 'application/json',
         },
         body: JSON.stringify({
            email,
            password,
         }),
      }).then((r) => r.json())

      const response = await promise

      response.extra = {
         email,
      }

      return response as UserResponse
   }
)

export const userSlice = createSlice({
   name: 'posts',
   initialState: {
      data: {
         login: '',
      },
      status: 'noop',
   },
   reducers: {
      log: (state, action: { payload: string; type: string }) => {
         console.log(state.data.login + action.payload)
      },
   },

   extraReducers(builder) {
      builder
         .addCase(fetchLoginUser.pending, (state, action) => {
            state.status = FetchStatus.LOADING
            console.log(action)
            return state
         })
         .addCase(fetchLoginUser.fulfilled, (state, action) => {
            const { payload } = action

            state.data.login = payload.extra.email

            localStorage.setItem('token', payload.access_token)

            state.status = FetchStatus.SUCCEEDED
         })
         .addCase(fetchLoginUser.rejected, (state, action) => {
            console.log(action)
            console.log('e')
            state.status = FetchStatus.FAILED
         })
   },
})

export const { log } = userSlice.actions

// circular nice dep
const selectUser = (state: RootState) => state.user
export const selectUserFetchStatus = (state: RootState) =>
   selectUser(state).status

const selectUserFetchData = (state: RootState) => selectUser(state).data
export const selectUserFetchLogin = (state: RootState) =>
   selectUserFetchData(state).login

export const userReducer = userSlice.reducer
