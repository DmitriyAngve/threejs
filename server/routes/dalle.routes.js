import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}); // it's for configure the use of the DALLE API

const openai = new OpenAIApi(config); // merge with your instance of the open AI API (for generate images for you)

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

// route through which we'll be able to pass the prompt the front to the server
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body; // get the prompt through passing from the frontend (prompt comming through req.body)

    const response = await openai.createImage({
      prompt,
      n: 1, // number of images
      size: "1024x1024",
      response_format: "b64_json", // image format
    }); // createImage() - is a specific function based on a given prompt

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image }); // send it to forntend
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
