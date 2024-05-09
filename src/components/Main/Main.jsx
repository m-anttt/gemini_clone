import { useContext } from 'react';
import { assets } from '../../assets/assets';
import './styles.scss'
import { Context } from '../../context/Context';
import { exmaplesPrompts } from '../../utils/examples';
import ResponseResult from '../ResponseResult/ResponseResult';
const Main = () => {
  const {onSend, recentPrompt, showResult, loading, resultData, prompt, setPrompt, loadImage, sendImage, image, setImage} = useContext(Context)
  return ( <div className='main'>
    <div className='nav'>
      <p>Gemini</p>
      <img src={assets.user_icon} alt="" className='user-icon'/>
    </div>
    <div className="main__container">
      {loadImage ? <div className='input-container'><label className="input-file"><input type="file" name="file" onChange={(e)=>setImage(e.target.files[0])}/><span>{image ? "Image chosen" : "Choose image"}</span></label></div> :  !showResult ? <><div className="greet">
        <p><span>Hello, Developer!</span></p>
        <p>How can I help you today?</p>
      </div>
      <div className="cards">
        {exmaplesPrompts.map((prompt)=>{
          return (
            <div className="card" onClick={()=>setPrompt(prompt.title)} key={prompt.title}>
            <p>{prompt.title}</p>
            <img src={assets[`${prompt.image}_icon`]} alt="" />
          </div>)
        })}
      </div></> : <div className='result'><div className='result__item'><img src={assets.user_icon} className='user-icon' alt="" /><p>{recentPrompt}</p></div><div className='result__data'><img src={assets.gemini_icon} className='result__icon' alt="" />{loading ? <div className='loader'>
        <hr />
        <hr />
        <hr />
      </div> : <ResponseResult/> }</div></div>}
      
      <div className="main__bottom">
        <div className="search-box">
          <input type="text" placeholder='Enter a prompt' onChange={(e)=>setPrompt(e.target.value)} value={prompt}/>
          <div className='search-box__icons'>
            <img src={assets.gallery_icon} alt="" onClick={sendImage}/>
            <img src={assets.send_icon} alt="" onClick={onSend}/>
          </div>
        </div>
        <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its responses.</p>
      </div>
    </div>
  </div> );
}
 
export default Main;