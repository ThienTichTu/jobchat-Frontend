import "./messSocket.scss"
import MessItem from "./MessItem"
import { useSelector, useDispatch } from "react-redux"
import { Mess_Active } from "../../redux/action/togle"
import { useEffect, useRef } from "react"
import { socket } from '../../config/Socketio'
import { useState } from "react"
import axios from "axios"
import { API_GET_MESS } from "../../config/API"
import { increaseMess } from "../../redux/action/globalState"

export default function MessSocket() {

    const MessActive = useSelector(state => state.togle.messHeader)
    const messCout = useSelector(state => state.Effect.messCout)
    const messsocketRef = useRef()
    const dispatch = useDispatch()
    const [messArray, setMessArray] = useState([])

    useEffect(() => {

        if (MessActive) {
            messsocketRef.current.style.display = "block"
        } else {
            messsocketRef.current.style.display = "none"

        }



    }, [MessActive])

    useEffect(() => {
        if (MessActive) {
            axios({
                method: 'get',
                url: API_GET_MESS,
                withCredentials: true,
            })
                .then(rs => {
                    console.log(rs.data)
                    setMessArray([...rs.data])
                })
                .catch(err => console.log(err))
        }

        return () => {
            setMessArray([])
        }
    }, [MessActive, messCout])

    socket.on("Server-send-Rendermess", (data) => {
        setMessArray([...data])
        const messcout = data.reduce((init, curentValue) => {
            if (curentValue.state === "chua xem") {
                return init + 1
            } else {
                return init
            }
        }, 0)
        dispatch(increaseMess(messcout))

    })

    return (
        <div ref={messsocketRef} className="messsocket">
            <div className="messsocket-container">
                <div className="messsocket-header">
                    <h3>Thông báo</h3>
                    <i
                        className="fa-solid fa-xmark"
                        onClick={() => dispatch(Mess_Active(false))}


                    >
                    </i>

                </div>
                <div className="messsocket-body">
                    {
                        messArray.map((message, index) => (
                            <MessItem
                                key={index}
                                type={message.type}
                                data={message.data}
                                state={message.state}
                            />
                        ))
                    }


                </div>
            </div>
        </div>

    )
}