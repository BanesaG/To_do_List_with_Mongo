let todoArray = [
    {
        "task_id":"item1",
        "task": "Go the gym",
        "completed": "true"
      } ,

      {
        "task_id":"item2",
        "task": "Pay bills",
        "completed": "true"
      } ,

      {
        "task_id":"item3",
        "task": "Practice CSS Grid",
        "completed": "false"
      } 
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = todoArray;