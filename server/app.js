import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import mongoose from "mongoose";
import pkg from "body-parser";
import todosSchema from "./todoSchema.js";

const { json } = pkg;
dotenv.config();
const app = express();

app.use(cors());
app.use(json());

mongoose
  .connect(process.env.Mongo_Url)
  .then((result) => {
    app.listen(process.env.PORT, () =>
      console.log("mongodb bağlandı server dinleniyor", process.env.PORT)
    );
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/todos", (req, res) => {
  todosSchema
    .find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
app.post("/todos", (req, res) => {
  const values = {
    title: req.body.title,
    complated: false,
  };
  const todo = new todosSchema(values);
  todo.save().then(todosSchema.find().then((result) => res.send(result)));
});
app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todosSchema.findById(id);
  const isComplated = Boolean(req.body.complated);
  if (index != "") {
    todosSchema
      .findByIdAndUpdate(id, { complated: isComplated }, { new: true })
      .then(() =>
        todosSchema.find().then((result) => {
          res.send(result);
        })
      )

      .catch((hata) => {
        console.error("Güncelleme hatası:", hata);
      });
  }
});
app.delete("/todos/:id", (req, res) => {
  const delId = req.params.id;

  todosSchema
    .deleteOne({ _id: delId })
    .then(() => {
      console.log(`${delId} idli Veri silindi.`);
    })
    .catch((hata) => {
      console.error("Silme hatası:", hata);
    })
    .finally(() => {
      todosSchema.find().then((result) => res.send(result));
    });
});
