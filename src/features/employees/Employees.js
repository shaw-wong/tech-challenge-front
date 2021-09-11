import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "./employeesSlice";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FuzzySearch from "fuzzy-search";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 170,
  },
  btn: {
    marginTop: theme.spacing(1),
  },
}));

function Employees() {
  const classes = useStyles();

  const data = _.sortBy(
    useSelector((state) => state.employees.employees),
    ["roleId", "lastName"]
  );

  const searcher = new FuzzySearch(
    data,
    ["roleId", "lastName", "firstName", "role.name"],
    {
      caseSensitive: false,
    }
  );

  const [searchKeyword, setSearchKeyword] = useState("");

  const employees = searcher.search(searchKeyword);

  const dispatch = useDispatch();

  /** Generate the new ID for the new employee by calculating
   * the maximum value of the existing employees and plus 1.
   */
  const newId = (employees) => {
    if (employees !== null && employees.length > 0) {
      return _.maxBy(employees, "id").id + 1;
    }
    return 1;
  };

  const [newEmployeeState, setNewEmployeeState] = useState({
    firstName: "",
    lastName: "",
    roleId: "",
    id: newId(employees),
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setNewEmployeeState({
      ...newEmployeeState,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    setNewEmployeeState({
      firstName: "",
      lastName: "",
      roleId: "",
      id: newId(employees),
    });
  }, [data.length]);

  return (
    <div>
      <div>
        <TextField
          id="search"
          name="search"
          label="Search"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="employees-table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => {
                if (employee && employee.role) {
                  return (
                    <TableRow key={employee.id}>
                      <TableCell component="th" scope="row">
                        {employee.id}
                      </TableCell>
                      <TableCell align="right">{employee.lastName}</TableCell>
                      <TableCell align="right">{employee.firstName}</TableCell>
                      <TableCell align="right">{employee.role.name}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              value={newEmployeeState.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              value={newEmployeeState.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="roleId-label">Role</InputLabel>
              <Select
                labelId="roleId-label"
                id="roleId"
                name="roleId"
                value={newEmployeeState.roleId}
                onChange={handleChange}
              >
                <MenuItem value={1}>Developer</MenuItem>
                <MenuItem value={2}>Supervisor</MenuItem>
                <MenuItem value={3}>Quality Assurance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              size="large"
              fontWeight="fontWeightBold"
              onClick={() => dispatch(add(newEmployeeState))}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Employees;
