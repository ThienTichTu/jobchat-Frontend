import "./PreviewImg.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef } from "react"
import { getDataPreview } from "../../redux/action/globalState"

export default function PreviewImg() {

    const state = useSelector(state => state.Effect.imgPreview)

    const dispatch = useDispatch()

    const preview = useRef()
    useEffect(() => {

        if (state.active) {
            preview.current.style.display = 'flex'
        } else {
            preview.current.style.display = 'none'

        }

    }, [state])


    return (
        <div ref={preview} className="Preview__container">
            <i
                className="fa-solid fa-xmark"
                onClick={() => dispatch(getDataPreview({
                    active: false,
                    img: ""
                }))}
            ></i>
            <div className="Preview__wapper">
                <img src={state.img} alt="" />
            </div>
        </div>
    )
}