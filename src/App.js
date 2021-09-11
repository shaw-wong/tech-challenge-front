import React from "react";
import "./App.css";

import Layout from "./components/layout/Layout";
import Employees from "./features/employees/Employees";

function App() {
  return (
    <Layout>
      <Employees />
    </Layout>
  );
}

export default App;
