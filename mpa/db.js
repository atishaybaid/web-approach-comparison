const todoList = [];



export const addToDoInDB = ({ title, complete = false }) => {

    const newTodo = {
        id: Math.random().toString().substring(0, 2),
        title,
        complete,
        createdAt: Date.now(),

    }

    todoList.push(newTodo);

    console.log("new todo list");
    console.log(todoList);

    return todoList;

}


export const getCurrentToFromDb = () => {
    return todoList;
}



