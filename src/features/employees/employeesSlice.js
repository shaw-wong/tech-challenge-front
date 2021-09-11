import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    load: (state) => {
      // 
    },
    add: (state) => {
      // 
    },
  },  
});

export const { add, load } = employeesSlice.actions;

export default employeesSlice.reducer;
