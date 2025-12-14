import express, { type Request, type Response } from "express";
// Note: We use 'type' imports when appropriate for better tree-shaking and clarity

const app = express();
const port = Number(process.env.PORT) || 5000;
const host = "0.0.0.0";

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Modern Express & TypeScript (ESM)!");
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
