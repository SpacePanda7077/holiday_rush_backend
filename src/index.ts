import express, { type Request, type Response } from "express";
import {Contract, Wallet, JsonRpcProvider, solidityPacked, keccak256,getBytes}from "ethers"
import cors from "cors";
import{contract_address,abi} from "./network.js"
// Note: We use 'type' imports when appropriate for better tree-shaking and clarity
const RPC_URL = "https://api.infra.mainnet.somnia.network"
 const PKEY = "c1c20f8f3b26d3120cce3e68b273e3d218eb3f49e4d193a07fb841c4a15b9c82"

const provider = new JsonRpcProvider(RPC_URL)
const wallet = new Wallet(PKEY, provider)  

const app = express();
const port = Number(process.env.PORT) || 5000;
const host = "0.0.0.0";
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
});
app.post("/verify_score", async(req: Request, res: Response) => {
  const {address,score} = req.body
  console.log(address,score)
  const nonce = BigInt(Date.now())
  const packed = solidityPacked(
    ["address", "uint256", "uint256"],
    [address, score, nonce] // contract.target = address in v6
  );
  const hash = keccak256(packed);
  const signature = await wallet.signMessage(getBytes(hash));
  console.log(signature)
  res.json({signature, nonce: nonce.toString() })
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
