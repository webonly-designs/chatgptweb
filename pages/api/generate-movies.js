import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const {platform, genre, type} = req.body
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(platform, genre, type),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(platform, genre, type) {
  return `Best ${genre} ${type} to watch on ${platform}`;
}