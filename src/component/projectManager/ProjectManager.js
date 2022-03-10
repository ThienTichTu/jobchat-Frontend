import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { activeProjectManager } from '../../redux/action/ProjectManager'
import AddProject from "./AddProject"
import MyProject from "./MyProject"
import "./projectManager.scss"
export default function ProjectManager() {

    const [headerToggle, setHeaderToggle] = useState("Thêm mới dự án")

    const dispatch = useDispatch();

    const active = useSelector(state => state.ProjectManager.active)

    const addProjectRef = useRef()
    const myProjectRef = useRef()
    const ManagerProjectRef = useRef()

    useEffect(() => {

        if (headerToggle === "Thêm mới dự án") {
            addProjectRef.current.style.backgroundColor = "rgb(228, 228, 228)"
            myProjectRef.current.style.backgroundColor = "#fff"

        } else {
            myProjectRef.current.style.backgroundColor = "rgb(228, 228, 228)"
            addProjectRef.current.style.backgroundColor = "#fff"
        }

        if (active) {
            ManagerProjectRef.current.style.display = "flex"
        } else {
            ManagerProjectRef.current.style.display = "none"
        }


    }, [headerToggle, active])

    const handleSetToggle = (e) => {
        setHeaderToggle(e)
    }

    return (
        <div
            ref={ManagerProjectRef} className="project__manager"
        >
            <div
                className="project__manager-container"

            >
                <div className="project__manager-header">
                    <div
                        className="header-item"
                        onClick={() => setHeaderToggle("Thêm mới dự án")}
                        ref={addProjectRef}
                    >
                        Thêm mới dự án
                    </div>
                    <div className="header-item"
                        onClick={() => setHeaderToggle("Dự án của bạn")}
                        ref={myProjectRef}

                    >

                        Dự án của bạn
                    </div>
                    <div className="project__manager-close">
                        <i className="fa-solid fa-xmark"
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(activeProjectManager(false))

                            }}

                        ></i>
                    </div>
                </div>
                <div className="project__manager-body">
                    {
                        headerToggle === "Thêm mới dự án"
                            ?
                            <AddProject
                                active={active}
                                handleSetToggle={handleSetToggle}
                            />
                            :
                            <MyProject
                                active={active}
                            />
                    }
                </div>
            </div>
        </div>




    )
}