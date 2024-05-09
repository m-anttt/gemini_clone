import { createContext, useState } from "react";
import runChat from "../api/gemini";
import run from "../api/imagesgemini";

export const Context = createContext()

const ContextProvider = ({children}) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null)
  const [recentPrompt, setRecentPrompt] = useState('')
  const [prevPrompts, setPrevPrompts] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loadImage, setLoadImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState("")

  const delayPara = (index, nextWord) =>{
    setTimeout(()=>{
      setResultData(prev => prev + nextWord)
    }, 75*index)
  }

  const sendImage = async ()=>{
    setLoadImage(true)
  }

  const onSend = async (query) =>{
    setResultData('')
    setLoadImage(false)
    setLoading(true)
    setShowResult(true)
    setRecentPrompt(prompt)
    let response;
    if (image && prompt){
      setPrevPrompts(prev => [...prev, prompt])
      setRecentPrompt(prompt)
      response = await run(prompt)
    }
    else if (prompt){
      setPrevPrompts(prev => [...prev, prompt])
      setRecentPrompt(prompt)
      response = await runChat(prompt);
    }
    else if (query){
      setRecentPrompt(query)
      response = await runChat(query);
    }
    setResultData(response)
    setLoading(false)
    setPrompt('')
  }

  const newChat = ()=>{
    setLoading(false)
    setShowResult(false)
  }

  const contextValue = {
    prompt, setPrompt, prevPrompts, setPrevPrompts, onSend, setRecentPrompt, recentPrompt, showResult, setShowResult, loading, setLoading, resultData, setResultData, newChat, loadImage, sendImage, image, setImage
  }
  return (
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  )
}

export default ContextProvider;