import { GoogleGenerativeAI } from "@google/generative-ai";
import API_KEY_GOOGLE from './config.js'
const genAI = new GoogleGenerativeAI(API_KEY_GOOGLE);
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

export default async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const fileInputEl = document.querySelector("input[type=file]");
  const imageParts = await Promise.all(
    [...fileInputEl.files].map(fileToGenerativePart)
  );
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  return text;
}
