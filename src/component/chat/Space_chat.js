import { API_GET_CHATROOM } from "../../config/API"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { socket } from "../../config/Socketio"
import { setChatRender } from "../../redux/action/ChatRooms"
import { getDataPreview } from "../../redux/action/globalState"
import { useSelector, useDispatch } from "react-redux"
function Space_chat() {
    const messageEl = useRef(null);
    const ChatRooms = useSelector(state => state.ChatRooms)
    const dispatch = useDispatch()
    const User = useSelector(state => state.auth.user)
    const [active, setActive] = useState(true)
    const idRecive = useRef("")

    const styleChat = {
        "marginTop": "10px",
        "color": "#000",
        "backgroundColor": "#6392cc",
        "padding": "5px",
        "borderRadius": "5px",
        "color": "#fff"
    }
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
        messageEl.current.scrollTo(0, messageEl.current.scrollHeight)
    }, [ChatRooms])




    socket.on("Server_send_DataChat-1", (data) => {
        setActive(!active)
    })

    socket.on("Server_send_DataChat-2", (data) => {
        console.log(data)
        if (data.idUserSend === idRecive.current) {
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
                    } else if (data.type === "img") {

                        if (data.idsend === User.id) {
                            return (
                                <div
                                    className="space_chat-user"
                                >

                                    <div
                                        className="space_chat-user-data"

                                        style={{
                                            "display": "flex",
                                            "flexDirection": "column",
                                            "maxWidth": "500px",
                                            "backgroundColor": "#f2f3f4",
                                            "justifyContent": "end"
                                        }}
                                    >
                                        <div className="chat-img"
                                            onClick={() => dispatch(getDataPreview({
                                                active: true,
                                                img: data.url
                                            }))}
                                        >
                                            <img src={data.url} alt="" />
                                        </div>
                                        {data.content &&
                                            <span
                                                style={{ ...styleChat, "marginLeft": "auto" }}
                                            >
                                                {data.content}
                                            </span>
                                        }
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
                                <div
                                    className="space_chat-friend"
                                >
                                    <div className="friend-avatar">
                                        <img src={ChatRooms.UserReceive.avatar} alt="" />
                                    </div>

                                    <div
                                        className="space_chat-friend-data"

                                        style={{
                                            "display": "flex",
                                            "flexDirection": "column",
                                            "maxWidth": "500px",
                                            "backgroundColor": "#f2f3f4"
                                        }}
                                    >
                                        <div className="chat-img"
                                            onClick={() => dispatch(getDataPreview({
                                                active: true,
                                                img: data.url
                                            }))}
                                        >
                                            <img src={data.url} alt="" />
                                        </div>
                                        {data.content &&
                                            <span
                                                style={styleChat}
                                            >
                                                {data.content}
                                            </span>
                                        }

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
            {/* <div
                className="space_chat-friend"
            >
                <div className="friend-avatar">
                    <img src="../../../../../../avatar.jpg" alt="" />
                </div>

                <div
                    className="space_chat-friend-data"

                    style={{
                        "display": "flex",
                        "flexDirection": "column",
                        "maxWidth": "500px",
                        "backgroundColor": "#f2f3f4"
                    }}
                >
                    <div className="chat-img"
                        onClick={() => dispatch(getDataPreview({
                            active: true,
                            img: "../../../../../../avatar.jpg"
                        }))}
                    >
                        <img src="../../../../../../avatar.jpg" alt="" />
                    </div>
                    <span
                        style={styleChat}
                    >
                        Ghi chus
                    </span>
                    <span className="space_chat-friend-dataTime">
                        tme
                    </span>

                </div>

            </div> */}




        </div>

    )
}

export default Space_chat