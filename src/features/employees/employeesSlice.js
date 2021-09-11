import { createSlice } from "@reduxjs/toolkit";
import employees from "../../data/employees";
import roles from "../../data/roles";

// Find role details from roleID.
const getRole = (roleID) => {
  return roles.find((role) => role.id === roleID);
};

// Add the role details into the employee.
const addRoleToEmployee = (employee) => {
  const role = getRole(employee.roleId);
  if (role && employee.lastName && employee.firstName ) {
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
      const newEmployee = addRoleToEmployee(action.payload);
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
