import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const { name, relation} = req.body
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(name, relation),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(name, relation) {
  return `possible Christmas wish text message you could use for your ${relation} ${name}`;
}