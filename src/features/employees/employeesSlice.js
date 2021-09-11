import { createSlice } from "@reduxjs/toolkit";
import employees from "../../data/employees";
import roles from "../../data/roles";

const initialState = {employees, roles};
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    load: (state) => {
      //
    },
    add: (state, action) => {
      // ...state,
    },
  },
});

export const { add, load } = employeesSlice.actions;

export default employeesSlice.reducer;
