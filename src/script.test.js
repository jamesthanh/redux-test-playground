const { todos, testAddTodo } = require("./script");

test("State", async () => {
  const todos = (state = [], action) => {};
  const stateBefore = [];
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux",
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false,
    },
  ];
  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(todos(stateBefore, action).toEqual(stateAfter));
});
