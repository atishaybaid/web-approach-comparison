const todoList = [];

const generateRandomId = () => {
    const date = new Date();
    return date.getTime();
}


export const addToDoInDB = ({ title, complete = false }) => {

    const newTodo = {
        id: generateRandomId().toString(),
        title,
        complete,
        createdAt: Date.now(),

    }

    todoList.push(newTodo);


    return todoList;

}


export const updateTodoCompletedStatusInDb = ({ todoId, completed }) => {
    const indexToUpdate = todoList.findIndex((todoItem) => {
        return todoItem.id == todoId;
    })
    console.log(todoId);
    console.log(completed);
    console.log(indexToUpdate);

    let todoItemToUpdate = todoList[indexToUpdate];
    todoItemToUpdate.complete = completed === "true";

    todoList.splice(indexToUpdate, 1, todoItemToUpdate);
    console.log("updatted todo list");
    console.log(todoList);

}


export const getCurrentToFromDb = () => {
    return todoList;
}



