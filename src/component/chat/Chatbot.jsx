import { useState, useEffect, useRef } from "react";
import "./chatbot.css";
function ChatBot() {
    const [openChatbot, setOpenchatbot] = useState(false);
    const [openiconchatbot, setopeniconchatbot] = useState(true);
    const [loinhan, setLoinhan] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingWelcome, setLoadingWelcome] = useState(true);
    const [chat, setChat] = useState([]);
    const endRef = useRef(null);

    // Hàm scroll
    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // Khi chat thay đổi
    useEffect(() => {
        scrollToBottom();
    }, [chat]);
    function openchatbot() {
        setOpenchatbot(true);
        setopeniconchatbot(false);
    }
    function closechatbot() {
        setOpenchatbot(false);
        setopeniconchatbot(true);
    }

    useEffect(() => {

   setTimeout(() => {

      setChat([
         {
            user: null,
            bot: "Xin chào! Tôi sẵn sàng giúp đỡ bạn. Bạn cần gì?",
         },
      ]);

      setLoadingWelcome(false);

   }, 2000);

}, []);

    const sendChat = async () => {
        if (!loinhan.trim()) {
            return;
        }
        // thêm tin nhắn user ngay lập tức
        setChat((prev) => [
            ...prev,
            {
                user: loinhan,
                bot: null,
            },
        ]);
        setLoinhan("");
        setLoading(true)
        try {
            const res = await fetch("https://backend-viv4.onrender.com/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: loinhan,
                }),
            });

            const data = await res.json();
            console.log(data);
            setChat((prev) => [...prev, { user: null, bot: data?.reply }]);
            setLoading(false)
        } catch (err) {
            console.error(err);
            setChat((prev) => [
                ...prev,
                { user: loinhan, bot: "⚠️ Lỗi server hoặc mạng" },
            ]);
        }
    };

    return (
        <>
            {openiconchatbot && (
                <div className="chatbot_parent" onClick={openchatbot}>
                    <div className="ping"></div>
                    <img src="/chatbot.png" alt="" className="chatbot_child" />
                </div>
            )}
            {openChatbot && (
                <div className="chatbox">
                    <div className="chat-header">
                        <div className="cb">
                            <div className="logochatbot">
                                <img src="/chatbot.png" alt="" style={{ width: "100%" }} />
                            </div>
                            <p>Trợ lý AI</p>
                        </div>
                        <button onClick={closechatbot} className="closechatbot">
                            <img src="/close.png" alt="" />
                        </button>
                    </div>
                    <div className="chat-content">
                        {chat.map((c, i) => (
                            <div key={i}>
                                {c.user && <div className="message user">{c.user}</div>}
                                {c.bot && <div className="message bot">{c.bot}</div>}

                                {/* mốc cuối */}
                                <div ref={endRef}></div>
                            </div>
                        ))}

                        {loading && <div className="bot-loading">

                            <img
                                src="/chatbot.png"
                                alt=""
                                className="bot-avatar"
                            />

                            <div className="loading-bubble">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                        </div>}
                    </div>

                    {/* INPUT */}
                    <div className="chat-input">
                        <input
                            placeholder="Nhập tin nhắn..."
                            value={loinhan}
                            onChange={(e) => setLoinhan(e.target.value)}
                        />
                        <button onClick={sendChat}><img src="/send.png" alt="" /></button>
                    </div>
                </div>
            )}
        </>
    );
}
export default ChatBot;
