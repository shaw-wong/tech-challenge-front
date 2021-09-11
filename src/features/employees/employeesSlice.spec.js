import employeesReducer from "./employeesSlice";

describe("counter reducer", () => {
  const initialState = [];
  it("should handle initial state", () => {
    expect(employeesReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
});
