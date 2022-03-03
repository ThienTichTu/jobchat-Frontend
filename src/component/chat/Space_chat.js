import { API_GET_CHATROOM } from "../../config/API"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { socket } from "../../config/Socketio"
import { setChatRender } from "../../redux/action/ChatRooms"
import { useSelector, useDispatch } from "react-redux"
function Space_chat() {
    const messageEl = useRef(null);
    const ChatRooms = useSelector(state => state.ChatRooms)
    const dispatch = useDispatch()
    const User = useSelector(state => state.auth.user)
    const [active, setActive] = useState(true)
    const idRecive = useRef("")
    useEffect(() => {

        axios({
            method: 'post',
            url: API_GET_CHATROOM,
            data: {
                idFriend: ChatRooms.UserReceive.id,
                idUser: User.id
            },
            withCredentials: true,
        })
            .then(rs => {
                dispatch(setChatRender(rs.data))
            })
            .catch(err => console.log(err))

        idRecive.current = ChatRooms.UserReceive.id

    }, [ChatRooms.UserReceive, active])

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'auto' });
            });
        }
    }, [ChatRooms])


    socket.on("Server_send_DataChat-1", (data) => {
        setActive(!active)
    })

    socket.on("Server_send_DataChat-2", (data) => {
        console.log(data)
        if (data.idUserSend == idRecive.current) {
            setActive(!active)
        }

    })

    return (
        <div className="space_chat" ref={messageEl}>
            {
                ChatRooms.dataChat.map((data, index) => {
                    if (data.type === "start") {
                        return (
                            <div key={index} className="space_chat-start">
                                <h3>Hello</h3>
                            </div>
                        )
                    } else if (data.type === "text") {
                        if (data.idsend === User.id) {
                            return (
                                <div key={index} className="space_chat-user">

                                    <div className="space_chat-user-data">
                                        <span>
                                            {data.content}
                                        </span>
                                        <span className="space_chat-user-dataTime">
                                            {data.time}
                                        </span>
                                    </div>
                                    <div className="user-avatar">
                                        <img src={User.avatar} alt="" />
                                    </div>

                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="space_chat-friend">
                                    <div className="friend-avatar">
                                        <img src={ChatRooms.UserReceive.avatar} alt="" />
                                    </div>

                                    <div className="space_chat-friend-data">
                                        <span>
                                            {data.content}
                                        </span>
                                        <span className="space_chat-friend-dataTime">
                                            {data.time}
                                        </span>
                                    </div>
                                </div>
                            )
                        }
                    }
                })
            }




        </div>

    )
}

export default Space_chat