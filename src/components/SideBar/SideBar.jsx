import { useContext, useState } from 'react'
import './styles.scss'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'
const SideBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const {onSend, prevPrompts, setRecentPrompt, newChat} = useContext(Context);
  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSend(prompt)
  }
  return ( <div className="sidebar">
    <div className='top'>
      <img className='menu' src={assets.menu_icon} onClick={() => setToggleMenu(state => !state)}alt="" />
      <div className="new-chat" onClick={newChat}>
        <img src={assets.plus_icon} alt=""/>
        {toggleMenu ? <p>New Chat</p> : null}
      </div>
      {toggleMenu? <div className="recent">
        <p className='recent__title'>Recent</p>
        {prevPrompts.map((prompt, index)=>{
          return (
            <div className="recent__entry" onClick={()=>loadPrompt(prompt)}>
            <img src={assets.message_icon} alt="" />
            <p>{prompt.slice(0, 18)} ...</p>
          </div>
          )
        })}
      </div> : null}
    </div>
    <div className="bottom">
      <div className="bottom__item recent__entry">
        <img src={assets.question_icon} alt="" />
        {toggleMenu ? <p>Help</p> : null}
      </div>
      <div className="bottom__item recent__entry">
        <img src={assets.history_icon} alt="" />
        {toggleMenu ? <p>Activity</p> : null}
      </div>
      <div className="bottom__item recent__entry">
        <img src={assets.setting_icon} alt="" />
        {toggleMenu ? <p>Settings</p> : null}
      </div>
    </div>
  </div> );
}
 
export default SideBar;