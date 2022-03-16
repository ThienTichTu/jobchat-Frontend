import axios from "axios"
import _ from "lodash"
import { API_GETCHAT_CARD, API_UPLOAD_IMGCHATCARD } from "../../config/API"
import { socket } from "../../config/Socketio"
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDataPreview } from "../../redux/action/globalState"

const Card_detailChat = ({ idRoom, listMember, manager, nameCard }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const [dataChat, setDataChat] = useState([])
    const [inputChat, setInputChat] = useState('')
    const [previewsImg, setPreviewsImg] = useState("")
    const [imgChat, setImgChat] = useState()
    const messageEl = useRef()

    useEffect(() => {
        console.log("render >>.", idRoom)
        if (idRoom) {
            axios({
                method: 'post',
                url: API_GETCHAT_CARD,
                data: { id: idRoom },
                withCredentials: true,
            })
                .then(rs => {
                    const chat = rs.data.data

                    const newChat = chat.map((item, index) => {
                        const newIdSend = listMember.filter(m => m.id === item.idsend)
                        return {
                            ...item,
                            idsend: newIdSend[0]
                        }
                    })

                    console.log(newChat)
                    setDataChat(newChat)
                })
                .catch(err => console.log(err))
        }
        return () => {
            setDataChat([])

        }
    }, [idRoom])

    const handleSend = () => {
        if (inputChat !== "") {
            socket.emit("client_send_cardchat", {
                idRoom: idRoom,
                idUserSend: user.id,
                content: inputChat,
                type: "text",
                nameCard: nameCard,
                manager: manager
            })
            setInputChat('')
        } else {
            console.log("send")
        }

        socket.on("server_send-cardchat", data => {
            const newDataChat = [...dataChat]
            console.log(data)
            const newIdSend = listMember.filter(item => item.id === data.id)
            data.idsend = newIdSend[0]
            newDataChat.push(data)

            setDataChat(newDataChat)
        })
        console.log("send")

    }

    const handleSubmit = async (event) => {

        event.preventDefault()
        const formData = new FormData();
        formData.append("img_Chatcard", imgChat);
        try {
            const response = await axios({
                method: "post",
                url: API_UPLOAD_IMGCHATCARD,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            socket.emit("client_send_cardchat", {
                idRoom: idRoom,
                idUserSend: user.id,
                content: inputChat,
                type: "img",
                nameCard: nameCard,
                manager: manager,
                img: response.data
            })
            setInputChat('')
            setPreviewsImg(false)
            URL.revokeObjectURL(previewsImg)
            setImgChat(false)

            socket.on("server_send-cardchat", data => {

                const newDataChat = [...dataChat]
                const newIdSend = listMember.filter(item => item.id === data.id)
                data.idsend = newIdSend[0]

                newDataChat.push(data)

                setDataChat(newDataChat)
            })

        } catch (error) {
            console.log(error)
        }
        console.log("sumit")
    }


    useEffect(() => {
        messageEl.current.scrollTo(0, messageEl.current.scrollHeight)
    }, [dataChat])

    const handlePreview = (event) => {
        setImgChat(event.target.files[0])
        const img = URL.createObjectURL(event.target.files[0])
        setPreviewsImg(img)
        console.log(img)
    }
    const handleclosePreviews = () => {
        setPreviewsImg(false)
        URL.revokeObjectURL(previewsImg)
        setImgChat(false)

    }
    socket.on("server_send-cardchat2", (data) => {

        if (data.room === idRoom) {
            if (data.room === idRoom && data.newData.id !== user.id) {
                const newDataChat = [...dataChat]
                const newIdSend = listMember.filter(item => item.id === data.newData.id)
                data.newData.idsend = newIdSend[0]

                newDataChat.push(data.newData)

                setDataChat(newDataChat)

            }
        }

    })
    return (
        <>
            <div ref={messageEl} className="card-activity-warper">
                {
                    dataChat.map((item, index) => {
                        if (!item.idsend.id) {
                            return <span key={index} >ko co id</span>
                        }
                        if (item.idsend.id === user.id) {

                            if (item.type === "text") {
                                return (
                                    <div
                                        key={index} className="card-activity-item item-right"
                                    >
                                        <div className="card-activity-avatar">
                                            <img src={item.idsend.avatar} alt="" />
                                        </div>
                                        <span className="me">
                                            {item.content}
                                        </span>
                                        <span className="time">
                                            {item.time}
                                        </span>
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        key={index}
                                        className="card-activity-item item-right"

                                        style={{ minHeight: "200px" }}
                                    >
                                        <div className="card-activity-avatar">
                                            <img src={item.idsend.avatar} alt="" />
                                        </div>
                                        <span className="me img-chat"
                                            onClick={() => dispatch(getDataPreview({
                                                active: true,
                                                img: item.img

                                            }))}

                                        >
                                            <img src={item.img} alt="" />
                                        </span>
                                        <span
                                            style={{ right: '300px' }}
                                            className="time">
                                            {item.time}
                                        </span>
                                    </div>
                                )
                            }


                        } else {
                            if (item.type === "text") {
                                return (
                                    <div key={index} className="card-activity-item item-left">
                                        <div className="card-activity-avatar">
                                            <img src={item.idsend.avatar} alt="" />
                                        </div>
                                        <span className="you">
                                            {item.content}
                                        </span>
                                        <span
                                            style={{ left: '50px' }}
                                            className="time">
                                            {item.time}
                                        </span>
                                    </div>

                                )
                            } else {
                                return (
                                    <div key={index} className="card-activity-item item-left"
                                        style={{ minHeight: "200px" }}
                                    >
                                        <div className="card-activity-avatar">
                                            <img src={item.idsend.avatar} alt="" />
                                        </div>
                                        <span className="you img-chat"
                                            onClick={() => dispatch(getDataPreview({
                                                active: true,
                                                img: item.img

                                            }))}

                                        >
                                            <img src={item.img} alt="" />
                                        </span>

                                        <span
                                            className="time"
                                            style={{

                                                left: "300px",

                                            }}
                                        >
                                            {item.time}
                                        </span>
                                    </div>

                                )
                            }
                        }
                    })
                }









            </div>
            <div
                className="card-activity-chat"
            >
                <form

                    onSubmit={handleSubmit}
                >
                    <input
                        type="file"
                        id="activity-img"
                        onChange={(e) => handlePreview(e)}
                    />
                    <label htmlFor="activity-img">
                        <i
                            className="fas fa-image imgIcon"
                            style={{ fontSize: "30px", lineHeight: "40px", marginRight: "10px" }}

                        ></i>
                    </label>
                </form>

                <input
                    type="text"
                    className="input-activity"
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                />
                {
                    imgChat
                        ?
                        <i
                            className="fas fa-caret-square-right activity-send"
                            style={{ fontSize: "30px", lineHeight: "40px", marginLeft: "10px" }}
                            onClick={handleSubmit}
                        ></i>
                        :
                        <i
                            className="fas fa-caret-square-right activity-send"
                            style={{ fontSize: "30px", lineHeight: "40px", marginLeft: "10px" }}
                            onClick={handleSend}
                        ></i>
                }


            </div>
            {
                previewsImg &&
                <div className="previews-imgchat" >
                    <i
                        className="fa-solid fa-xmark"
                        onClick={handleclosePreviews}
                    ></i>
                    <img src={previewsImg} alt="" />
                </div>
            }
        </>
    )

}
export default Card_detailChat