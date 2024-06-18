const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "Todos.db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config({
  path: "./data/config.env",
});

app.use(express.json());

app.use(cors());

let db;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(process.env.PORT, () =>
      console.log(`server is running port ${process.env.PORT}`)
    );
  } catch (e) {
    console.log(`Conection error ${e}`);
  }
};
initializeDBAndServer();

app.get("/", (req, resp) => {
  resp.send("hello");
});

app.post("/register", async (req, resp) => {
  const { username, password, name } = req.body;
  const searchUser = `select * from user where username = '${username}'`;
  const data = await db.get(searchUser);
  if (data === undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const storeDataQuery = `insert into user(name , username , password) values('${name}' , '${username}', '${hashedPassword}')`;
    const response = await db.run(storeDataQuery);
    resp.status(200);
    resp.send({ userId: response.lastID });
  } else {
    resp.status(400);
    resp.send({ error: "This username is already registered" });
  }
});

app.post("/login", async (req, resp) => {
  const { username, password } = req.body;
  const checkuser = `select * from user where username='${username}'`;
  const response = await db.get(checkuser);
  if (response !== undefined) {
    const comperPassword = await bcrypt.compare(password, response.password);
    if (comperPassword) {
      resp.send({ userId: response.id }).status(200);
    } else {
      resp.status(400);
      resp.send({ error: "password is wrong" });
    }
  } else {
    resp.status(400);
    resp.send({ error: "This username is not registered" });
  }
});

app.post("/addtodo", async (req, resp) => {
  try {
    const { id, title, description, category, status, user_id } = req.body;
    const query = `insert into todos(id , title , description , category , status , user_id)values(
          '${id}','${title}','${description}','${category}',${status},${user_id})`;
    await db.run(query);
    resp.status(200).json({ msg: "data add successfuly" });
  } catch (e) {
    resp.status(400);
    resp.send({ msg: `something went worng ${e}` });
  }
});

app.put("/updatetodo", async (req, resp) => {
  const { id, title, description, category, status } = req.body;
  try {
    const query = `update todos set title = '${title}' , description='${description}', category = '${category}' , status = ${status} where id = '${id}'`;
    await db.run(query);
    resp.status(200);
    resp.send({ msg: "Todo updated successfuly" });
  } catch (e) {
    resp.status(400);
    resp.send({ msg: `something went worng ${e}` });
  }
});

app.delete("/deletetodo", async (req, resp) => {
  const { id } = req.body;
  console.log(id);
  try {
    const query = `delete from todos where id = '${id}'`;
    await db.run(query);
    resp.status(200);
    resp.send({ msg: "todo is deleted successfuly" });
  } catch (e) {
    resp.status(400);
    resp.send({ msg: `something went worng ${e}` });
  }
});

app.put("/updateischeck", async (req, resp) => {
  const { status, id } = req.body;
  try {
    const query = `update todos set status = ${status} where id = '${id}'`;
    await db.run(query);
    resp.status(200);
    resp.send({ msg: "status updated successfuly" });
  } catch (e) {
    resp.status(400);
    resp.send({ msg: `something went worng ${e}` });
  }
});

app.post("/getalldata", async (req, resp) => {
  const { id } = req.body;
  try {
    const query = `select * from todos where user_id = ${id}`;
    const response = await db.all(query);
    console.log(response);
    resp.status(200);
    resp.send(response);
  } catch (e) {
    resp.status(400);
    resp.send({ msg: `something went worng ${e}` });
  }
});
