import { useState } from "react";
import "./chatbot.css"
function ChatBot() {
    const [openChatbot, setOpenchatbot] = useState(false);
    const [openiconchatbot, setopeniconchatbot] = useState(true);
    function openchatbot() {
        setOpenchatbot(true);
        setopeniconchatbot(false)
    }
    function closechatbot() {
        setOpenchatbot(false)
        setopeniconchatbot(true)
    }
    return (
        <>
            {
                openiconchatbot && (<div className="chatbot_parent" onClick={openchatbot}>
                    <div class="ping"></div>
                    <img src="/chatbot.png" alt="" className="chatbot_child" />
                </div>
                )}
            {
                openChatbot && (
                    <div className="chatbox">

                        <div className="chat-header">
                            <div className="cb"><div className="logochatbot"><img src="/chatbot.png" alt="" style={{ width: "100%" }} /></div><p>Trợ lý AI</p></div>
                            <button onClick={closechatbot} className="closechatbot"><img src="/close.png" alt="" /></button>
                        </div>
                        <div className="chat-content">
                            <div className="message bot">
                                Xin chào! Tôi có thể giúp gì cho bạn?
                            </div>

                            <div className="message user">
                                Shop còn iPhone không?
                            </div>
                            <div className="message bot">
                                Xin chào! Tôi có thể giúp gì cho bạn?
                            </div>

                            <div className="message user">
                                Shop còn iPhone không?
                            </div>
                            <div className="message bot">
                                Xin chào! Tôi có thể giúp gì cho bạn?
                            </div>

                            <div className="message user">
                                Shop còn iPhone không?
                            </div>
                        </div>

                        {/* INPUT */}
                        <div className="chat-input">
                            <input placeholder="Nhập tin nhắn..." />
                            <button>Gửi</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default ChatBot;
