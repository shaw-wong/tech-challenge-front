import { createSlice } from "@reduxjs/toolkit";
import employees from "../../data/employees";
import roles from "../../data/roles";

const getRole = (roleID) => {
  return roles.find((role) => role.id === roleID);
};

const addRoletoEmployee = (employee) => {
  const role = getRole(employee.roleId);
  if (role) {
    return { ...employee, role };
  } else {
    return null;
  }
};

const initialState = {
  employees: employees.map((employee) => {
    return {
      ...employee,
      role: getRole(employee.roleId),
    };
  }),
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    load: (state) => {
      //
    },
    add: (state, action) => {
      // Add the new employee from user input.
      const newEmployee = addRoletoEmployee(action.payload);
      if (newEmployee) {
        console.log("New Employee: ", newEmployee);
        return {
          ...state,
          employees: [...state.employees, newEmployee],
        };
      }
    },
  },
});

export const { add, load } = employeesSlice.actions;

export default employeesSlice.reducer;
