import { useRef, useEffect } from "react"
import "./toastMessage.scss"
import { ToastRefesh } from "../../redux/action/toast"
import { useSelector, useDispatch } from "react-redux"

export default function ToastMessageItem(prop) {

    const MessRef = useRef();
    const dispatch = useDispatch();
    const toast = useSelector(state => state.toast)
    const timeout1 = useRef()
    const timeout2 = useRef()
    useEffect(() => {
        if (toast.type === "success" && toast.active) {
            console.log(toast.type, toast.active)
            MessRef.current.classList.add("toastMessage_item-success")
            MessRef.current.style.transform = "translateX(0px)"
            timeout1.current = setTimeout(() => {
                MessRef.current.style.transform = "translateX(360px)"
                timeout2.current = setTimeout(() => {
                    dispatch(ToastRefesh())
                }, 500)
            }, 2000)
        }
        if (toast.type === "warning" && toast.active) {
            console.log(toast.type, toast.active)
            timeout1.current = MessRef.current.classList.add("toastMessage_item-warning")
            MessRef.current.style.transform = "translateX(0px)"
            timeout1.current = setTimeout(() => {
                MessRef.current.style.transform = "translateX(360px)"
                timeout1.current = setTimeout(() => {
                    dispatch(ToastRefesh())
                }, 500)
            }, 2000)

        }
        return () => {
            clearTimeout(timeout1.current)
            clearTimeout(timeout2.current)
        }
    }, [toast.active])

    return (
        <div ref={MessRef} className=" toastMessage_item">
            <i className="fa-solid fa-bell"></i>
            <span>
                {toast.mess}
            </span>
        </div>
    )
}