import express, { type Request, type Response } from "express";
// Note: We use 'type' imports when appropriate for better tree-shaking and clarity

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Modern Express & TypeScript (ESM)!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
