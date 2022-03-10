import { useState, useEffect, memo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../../config/Socketio"
import { previewImgChat } from "../../redux/action/globalState"
import { API_UPLOAD_IMGCHAT } from "../../config/API"
import axios from "axios"
function Input_chat({ room }) {
    const [dataSend, setDataSend] = useState("")

    const ChatRooms = useSelector(state => state.ChatRooms)

    const imgPreview = useSelector(state => state.Effect.imgPreviewChat)

    const [imgChat, setImgChat] = useState(false)



    const User = useSelector(state => state.auth.user)

    const dispatch = useDispatch()
    const handleOnSend = () => {
        socket.emit("Client_sendDataChat", {
            type: "text",
            content: dataSend,
            idUserSend: User.id,
            idUserReceive: ChatRooms.UserReceive.id
        })
        setDataSend("")
        console.log(dataSend)
    }
    // useEffect(() => {
    //     window.addEventListener('keydown', function (e) {
    //         if (e.key === 'Enter') {
    //             handleOnSend()
    //         }
    //     }
    //     )

    // }, []);
    const handlePreview = (e) => {
        setImgChat(e.target.files[0])
        const img = URL.createObjectURL(e.target.files[0])
        dispatch(previewImgChat({ active: true, img: img }))

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("img_Chat", imgChat);
        try {
            const response = await axios({
                method: "post",
                url: API_UPLOAD_IMGCHAT,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            socket.emit("Client_sendDataChat", {
                type: "img",
                url: response.data,
                content: dataSend,
                idUserSend: User.id,
                idUserReceive: ChatRooms.UserReceive.id
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        return () => {
            imgChat && URL.revokeObjectURL(imgChat)
        }
    }, [imgChat])

    useEffect(() => {
        if (imgPreview.active === false) {
            setImgChat(false)
        }
    }, [imgPreview])
    return (<>

        {
            ChatRooms.UserReceive.id &&
            <div className="input_chat">
                <form
                    className="input_chat-header"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="file"
                        id="sendChatFile"
                        onChange={(e) => handlePreview(e)}
                    />
                    <label htmlFor="sendChatFile">
                        <i className="fas fa-image imgIcon"></i>
                    </label>
                    <label htmlFor="">
                        <i className="fas fa-file imgIcon"></i>
                    </label>
                    <label htmlFor="">
                        <i className="far fa-dizzy imgIcon"></i>
                    </label>

                </form>

                <div className="input_chat-footer">
                    <input
                        type="text"
                        value={dataSend}
                        onChange={e => setDataSend(e.target.value)}

                    />
                    {
                        imgChat
                            ?
                            <i
                                className="fas fa-caret-square-right chat__send"
                                onClick={handleSubmit}
                            ></i>
                            :
                            <i
                                className="fas fa-caret-square-right chat__send"
                                onClick={handleOnSend}
                            ></i>

                    }


                </div>

            </div>
        }
    </>
    )
}

export default memo(Input_chat);