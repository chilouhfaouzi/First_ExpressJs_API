const Joi = require("joi");
const express = require("express");
const app = express();

//Enable parsing request body --> add Middleware
app.use(express.json());

//Port declaration
const port = process.env.PORT || 3000; //if the enviroment variable is not set, use 3000

//Listen to Port with callback function
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

var students = [
  { id: 1, name: "Faouzi" },
  { id: 2, name: "Amine" },
  { id: 3, name: "Reda" },
];

//Get all students
app.get("/api/students", (req, res) => {
  res.send(students);
});

//Get a student by id
app.get("/api/students/:id", (req, res) => {
  const student = students.find((student) => student.id == req.params.id);
  if (!student)
    return res.status(404).send("The student with the given ID was not found");
  res.send(student);
});

//Add student
app.post("/api/students", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = Joi.validate(req.body, schema);
  const name = req.body.name;
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  let student = { id: students.length + 1, name: name };
  students.push(student);
  res.send(students);
});

//Update student
app.put("/api/students/:id", (req, res) => {
  const student = students.find((student) => student.id == req.params.id);
  if (!student)
    return res.status(404).send("The student with the given ID was not found");

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  student.name = req.body.name;
  res.send(students);
});

//Delete student
app.delete("/api/students/:id", (req, res) => {
  const student = students.find((student) => student.id == req.params.id);
  if (!student)
    return res.status(404).send("The student with the given ID was not found");

  const index = students.indexOf(student);
  students.splice(index, 1);

  res.send(student);
});

//query params : after ? in the url
//route params : /:id
