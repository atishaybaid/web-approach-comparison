import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { addToDoInDB, getCurrentToFromDb, updateTodoCompletedStatusInDb } from "./db.js";


const __dirname = path.resolve();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;



const handleCreateTodo = (todoTitle) => {
    addToDoInDB({ title: todoTitle, complete: false });
}



const handleToggleTodo = ({ todoId, completed }) => {
    updateTodoCompletedStatusInDb({ todoId, completed })
}


const renderToDoListItem = () => {
    const toListHTMLArray = getCurrentToFromDb().map((todoItem) => {
        const { id, complete, title } = todoItem;
        return (
            `<form method="post">
                 <input type="hidden" name="todoId" value="${id}"/>
                <input type="hidden" name="completed" value="${!complete}"/>
                <li> ${title}</li>
                <button 
                 type="submit"
                 name="intent"
                 value="toggleTodo"
                 title="${complete ? 'Mark as incomplete' : 'Mark as complete'}"
                >${complete ? 'Mark as incomplete' : 'Mark as complete'}</button>

            </form>`
        )
    })

    return toListHTMLArray.join("\n")
}

const renderToDoList = () => {
    return (
        `<ul>
           ${renderToDoListItem()}
        </ul>`
    )

}

app.get("/todo", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    
    <body>
        <header>
            <h1>todos</h1>
            <form method="post">
                <input type="hidden" name="intent" value="createTodo" />
                <input class="new-todo" placeholder="What Needs to be done?" autofocus name="todoTitle" />
                <button type="submit">Add ToDo</button>
            </form>
        </header>
        <section>
            <h2>Tasks to be done</h2>
            ${renderToDoList()}
        </section>
    </body>
    
    </html>`)
})






app.post("/todo", (req, res, next) => {
    const { intent, todoTitle = "" } = req.body
    switch (intent) {
        case "createTodo": {

            handleCreateTodo(todoTitle);
            next();
            break;
        }

        case "toggleTodo": {
            handleToggleTodo(req.body);
            next();
            break;
        }
    }
}, (req, res) => {
    res.redirect("/todo")
})



app.listen(port, () => {
    console.log("express running on port:", port);
})



