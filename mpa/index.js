import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { addToDoInDB } from "./db.js";


const __dirname = path.resolve();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;



const handleCreateTodo = (todoTitle) => {
    addToDoInDB({ title: todoTitle, complete: false });
}

app.get("/todo", (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '/mpa/view/todo.html'));
})






app.post("/todo", (req, res) => {
    const { intent, todoTitle = "" } = req.body
    switch (intent) {
        case "createTodo": {

            handleCreateTodo(todoTitle);
        }
    }
    console.log("todo post body");
    console.log(req.body);
})



app.listen(port, () => {
    console.log("express running on port:", port);
})



