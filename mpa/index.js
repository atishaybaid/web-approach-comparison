import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { addToDoInDB, getCurrentToFromDb } from "./db.js";


const __dirname = path.resolve();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;



const handleCreateTodo = (todoTitle) => {
    addToDoInDB({ title: todoTitle, complete: false });
}

const renderToDoList = () => {
    return (
        `<ul>
           ${getCurrentToFromDb().map((todoItem) => {
            return (
                `<li>${todoItem.title}</li>`
            )
        })}
        </ul>`
    )

}

app.get("/todo", (req, res) => {
    console.log(__dirname)
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
        }
    }
    console.log("todo post body");
    console.log(req.body);
}, (req, res) => {
    res.redirect("/todo")
})



app.listen(port, () => {
    console.log("express running on port:", port);
})



