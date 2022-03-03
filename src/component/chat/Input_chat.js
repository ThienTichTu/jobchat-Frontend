import { useState } from "react"
import { useSelector } from "react-redux"
import { socket } from "../../config/Socketio"
export default function Input_chat({ room }) {
    const [dataSend, setDataSend] = useState("")
    const ChatRooms = useSelector(state => state.ChatRooms)
    const User = useSelector(state => state.auth.user)

    const handleOnSend = () => {
        socket.emit("Client_sendDataChat", {
            type: "text",
            content: dataSend,
            idUserSend: User.id,
            idUserReceive: ChatRooms.UserReceive.id
        })
        setDataSend("")
    }

    return (
        <div className="input_chat">
            <div className="input_chat-header">
                <i className="fas fa-image imgIcon"></i>
                <i className="fas fa-file imgIcon"></i>
                <i className="far fa-dizzy imgIcon"></i>
            </div>
            <input
                type="text"
                value={dataSend}
                onChange={e => setDataSend(e.target.value)}

            />
            <i
                className="fas fa-caret-square-right chat__send"
                onClick={handleOnSend}
            ></i>

        </div>
    )
}