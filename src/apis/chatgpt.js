import {Configuration, OpenAIApi} from 'openai'
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);

export const generateData = (title) => {
    const response = openai.createCompletion({
        model: "text-davinci-003",
        prompt: title,
        max_tokens: 2048,
        temperature: 0,
      });
    return response      
}


export function createChatCompletion(messages) {
  return openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages
  })
}