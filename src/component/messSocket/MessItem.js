import { useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { socket } from '../../config/Socketio'

export default function MessItem({ type, state, data }) {

    const intemRef = useRef()
    const idUser = useSelector(state => state.auth.user.id)
    useEffect(() => {
        if (state === "chua xem") {
            intemRef.current.style.backgroundColor = "#eeeeee"
        } else {
            intemRef.current.style.backgroundColor = "#ffff"

        }
    }, [state])

    function handleAprove() {
        socket.emit("aprove_friend", {
            idUserAdd: data.idAdd,
            idUser: idUser
        })
    }

    function handleSeen() {
        socket.emit("seen_mess", {
            type: type,
            content: data,
            idUser: idUser
        })
    }

    return (
        <div ref={intemRef} className="messsocket-item">
            {
                type === "add friend"
                    ? <>
                        <div className="messsocket-item-addfriend">
                            <div className="messsocket-item-avatar">
                                <img src={data.avatar} alt="" />
                            </div>
                            <span className="messsocket-item-name">{data.name} </span>
                            <span> Vừa gửi lời mời kết bạn </span>
                            {
                                state === "da xem"
                                    ? <>
                                    </>
                                    :
                                    <button
                                        className="messsocket-item-ido"
                                        onClick={handleAprove}
                                    >
                                        Đồng ý
                                    </button>
                            }
                        </div>
                    </>
                    : <>
                        <div className="messsocket-item-mess">
                            <span>
                                {data}
                            </span>

                            {
                                state === "chua xem"
                                &&
                                <div
                                    className="messsocket-item-seen"
                                    onClick={handleSeen}

                                >

                                </div>
                            }
                        </div>

                    </>
            }
        </div>
    )
}