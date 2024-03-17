const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config({
  path: "./data/config.env",
});

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://todo-application-assignment.netlify.app",
    ],
    methods: ["POST", "DELETE", "PUT", "GET"],
  })
);

const connection = mysql.createConnection({
  host: "db4free.net",
  port: 3306,
  user: "shiva_kumar",
  password: "sai@1234",
  database: "user_details_db",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("database successfuly connected..");
});

app.get("/", (req, resp) => {
  resp.send("hello");
});

app.post("/register", async (request, response) => {
  const { username, password, name } = request.body;
  const modifyPassword = await bcrypt.hash(password, 10);
  connection.query(
    `select * from user_info_of_todo_app where username = '${username}'`,
    (error1, reslut) => {
      if (error1) {
        response.status(400).json({ error_msg: "database error" });
      } else {
        if (reslut.length === 0) {
          connection.query(
            `insert into user_info_of_todo_app(name , username , password)values('${name}','${username}' ,  '${modifyPassword}')`,
            (error2, reslut2) => {
              if (error2) {
                response.status(400).json({ error_msg: "database error" });
              } else {
                connection.query(
                  `select id from user_info_of_todo_app where username = '${username}'`,
                  (error3, reslut3) => {
                    if (error3) {
                      response
                        .status(400)
                        .json({ error_msg: "database error" });
                    } else {
                      console.log(reslut3[0].id);
                      response.status(200).json({ id: reslut3[0].id });
                    }
                  }
                );
              }
            }
          );
        } else {
          response
            .status(400)
            .json({ error_msg: "this username already register" });
        }
      }
    }
  );
});

app.post("/login", (request, response) => {
  const { username, password } = request.body;
  connection.query(
    `select * from user_info_of_todo_app where username = '${username}'`,
    async (error, reslut) => {
      if (error) {
        console.log(error);
        response.status(400).json({ error_msg: "database error" });
      } else {
        if (reslut.length !== 0) {
          const comperePassword = await bcrypt.compare(
            password,
            reslut[0].password
          );
          if (comperePassword) {
            response.status(200).json({ id: reslut[0].id });
          } else {
            response.status(400).json({ error_msg: "password is wrong" });
          }
        } else {
          response.status(400).json({ error_msg: "user is not register" });
        }
      }
    }
  );
});

app.post("/addtodo", (req, resp) => {
  const { id, title, description, category, isCheckTrue, user_id } = req.body;
  connection.query(
    `insert into todos_details(id , title , description , category , isCheckTrue , user_id)values(
        '${id}','${title}','${description}','${category}',${isCheckTrue},${user_id})`,
    (error, reslut) => {
      if (error) throw error;
      resp.status(200).json({ msg: "data add successfuly" });
    }
  );
});

app.put("/updatetodo", (req, resp) => {
  const { id, title, description, category, isCheckTrue } = req.body;
  connection.query(
    `update todos_details set title = '${title}' , description='${description}', category = '${category}' , isCheckTrue = ${isCheckTrue} where id = '${id}'`,
    (error, reslut) => {
      if (error) throw error;
      resp.status(200).json({ msg: "data updated successfuly" });
    }
  );
});

app.delete("/deletetodo", (req, resp) => {
  const { id } = req.body;
  connection.query(
    `delete from todos_details where id = '${id}'`,
    (error, result) => {
      if (error) throw error;
      console.log("delete successfully");
    }
  );
});

app.put("/updateischeck", (req, resp) => {
  const { isCheckTrue, id } = req.body;
  console.log(isCheckTrue);
  connection.query(
    `update todos_details set isCheckTrue = ${isCheckTrue} where id = '${id}'`,
    (error, reslut) => {
      if (error) throw error;
      resp.status(200).json({ msg: "data updated successfuly" });
    }
  );
});

app.post("/getalldata", (req, resp) => {
  const { id } = req.body;
  connection.query(
    `select * from todos_details where user_id = ${id}`,
    (error, result) => {
      if (error) {
        resp.status(400).json({ error_msg: "database error" });
      } else {
        resp.status(200).json(result);
      }
    }
  );
});

app.listen(process.env.PORT, () =>
  console.log(`server is running port ${process.env.PORT}`)
);
