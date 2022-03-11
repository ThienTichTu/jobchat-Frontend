import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MessDelete } from "../../redux/action/togle"
import axios from "axios"
import { API_DELETE_PROCESS } from "../../config/API"
import "./toastMessage.scss"

export default function ToastDelete() {

    const toggle = useSelector(state => state.togle.messDelete)
    const toastRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        if (toggle.active) {
            toastRef.current.style.display = "flex"
        } else {
            toastRef.current.style.display = "none"

        }
    }, [toggle.active])
    const handleDelete = (option) => {
        if (option === "yes") {
            axios({
                method: "POST",
                url: API_DELETE_PROCESS,
                data: {
                    id: toggle.id,
                },
                withCredentials: true,
            })
                .then(rs => {
                    dispatch(MessDelete({ active: false, id: "", idProject: "", data: toggle.id }))
                })
                .catch(err => console.error(err))
        } else {
            dispatch(MessDelete({ active: false, id: "", idProject: "", data: false }))

        }

    }

    return (

        <div ref={toastRef} className="toast__delete">
            <div className="toast__delete-container">
                <span className="toast__delete-text">Bạn có chắc chắn muốn xóa không </span>
                <span
                    className="toast__delete-btn"
                    onClick={() => handleDelete("yes")}
                >Có</span>
                <span
                    className="toast__delete-btn"
                    onClick={() => handleDelete("no")}

                >Không</span>
            </div>

        </div>

    )
}