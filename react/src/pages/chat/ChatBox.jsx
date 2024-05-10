import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessage } from "../../slices/chat/thunks.js";

const ChatBox = () => {
    const { userData } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { messages } = useSelector(state => state.chat);
    const scroll = useRef();
    const [message, setMessage] = useState("");

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const webSocketChannel = `channel_for_everyone`;

    // const connectWebSocket = () => {
    //     window.Echo.private(webSocketChannel)
    //         .listen('GotMessage', async (e) => {
    //             // e.message
    //             await dispatch(getMessages());
    //         });
    // }

    // const connectWebSocket = () => {
    //     window.Echo.private(webSocketChannel)
    //         .listen('GotMessage', async (e) => {
    //             const newMessage = e.message; // Obtener el nuevo mensaje del evento
    //             dispatch(getMessages());
    //             // dispatch({ type: 'ADD_MESSAGE', payload: newMessage }); // Agregar el nuevo mensaje a la lista de mensajes local
    //             setTimeout(scrollToBottom, 0); // Desplazarse hacia abajo para mostrar el nuevo mensaje
    //         });
    // }

    const connectWebSocket = () => {
        const ws = new WebSocket(`ws://0.0.0.0`);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const newMessage = JSON.parse(event.data); // Suponiendo que el servidor envía los mensajes en formato JSON
            dispatch(getMessages());
            // dispatch({ type: 'ADD_MESSAGE', payload: newMessage }); // Agregar el nuevo mensaje a la lista de mensajes local
            setTimeout(scrollToBottom, 0); // Desplazarse hacia abajo para mostrar el nuevo mensaje
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };
    };

    const handleMessageSend = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        dispatch(sendMessage(message)).then(() => {
            dispatch(getMessages());
            setMessage("");
            setTimeout(scrollToBottom, 0);
        });
    };

    useEffect(() => {
        dispatch(getMessages()).then(() => {
            setTimeout(scrollToBottom, 0);
        })
        connectWebSocket();
        console.log(messages)
        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Chat Box</div>
                    <div className="card-body"
                        style={{ height: "500px", overflowY: "auto" }}>
                        {userData && messages && messages.map((message) => (
                            <Message key={message.id}
                                userId={userData.id}
                                message={message}
                            />
                        ))}
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <div className="input-group">
                            <input onChange={(e) => setMessage(e.target.value)}
                                autoComplete="off"
                                type="text"
                                className="form-control"
                                placeholder="Message..."
                                value={message}
                            />
                            <div className="input-group-append">
                                <button onClick={(e) => handleMessageSend(e)}
                                    className="btn btn-primary"
                                    type="button">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;