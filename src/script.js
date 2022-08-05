const { todos, testAddTodo } = require("./script");

test("sumAsync adds numbers asynchronously", async () => {
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

// test('sumAsync adds numbers asynchronously', async () => {
//     const result = await sumAsync(3, 7)
//     const expected = 10
//     expect(result).toBe(expected)
//   })
