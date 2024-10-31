import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())

const rota = "/usuarios";

app.get(rota, async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
});

app.post(rota, async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).send({ user, message: "User created successful!" });
});

app.put(rota + "/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(200).send({ user, message: "User updated successful!" });
});

app.delete(rota + "/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    }
  });
  res.status(204).end();
});

app.listen(3000);
