import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../slices/chat/thunks";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handlesendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        dispatch(sendMessage(message))
        setMessage("");
    };

    return (
        <div className="input-group">
            <input onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Message..."
                value={message}
            />
            <div className="input-group-append">
                <button onClick={(e) => handlesendMessage(e)}
                    className="btn btn-primary"
                    type="button">Send</button>
            </div>
        </div>
    );
};

export default MessageInput;