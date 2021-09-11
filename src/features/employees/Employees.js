import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

function Employees() {
  const data = useSelector((state) => state.employees);
  const employees = _.sortBy(
    useSelector((state) => state.employees.employees),
    ["roleId", "lastName"]
  );
  console.log(data);

  const getRole = (roleID) => {
    return data.roles.find((role) => role.id === roleID);
  };
  console.log(getRole(3));

  return (
    <div>
      <ul>
        {employees.map((employee) => {
          const role = getRole(employee.roleId);
          if (role) {
            return (
              <li key={employee.id}>
                {employee.id}. {employee.lastName} {employee.firstName}{" "}
                {role.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Employees;
