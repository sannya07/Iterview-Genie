import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    age: '',
    course: '',
    college: '',
    passingYear: ''
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return {
        name: '',
        email: '',
        age: '',
        course: '',
        college: '',
        passingYear: ''
      };
    }
  }
});


export const { setUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;
