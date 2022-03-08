import { useEffect, useState } from "react";
import MyprojectDetail from "./MyprojectDetail";
import { API_FIND_PROJECT } from "../../config/API"
import axios from "axios";
const backGround = [
    "https://storage.googleapis.com/jobchat-35964.appspot.com/1646710434922.jpg",
    "https://storage.googleapis.com/jobchat-35964.appspot.com/1646710485299.jpg",
    "https://storage.googleapis.com/jobchat-35964.appspot.com/1646710501787.jpg",
    "https://storage.googleapis.com/jobchat-35964.appspot.com/1646710518364.jpg"
]

function getRandomInt() {
    return Math.floor(Math.random() * backGround.length);
}

export default function MyProject({ active }) {

    const [listProject, setListProject] = useState([])

    const [projectDetail, setPeojectDetail] = useState(false)

    useEffect(() => {
        axios.get(API_FIND_PROJECT, { withCredentials: true })
            .then(rs => {
                console.log(rs.data)
                setListProject(rs.data)
            })
            .catch(err => console.log(err))
        return () => {
            setListProject([])
            setPeojectDetail(false)
        }
    }, [active])

    const handleSetDetailProject = (data) => {
        setPeojectDetail(data)

    }

    return (
        <>
            <div className="myproject__container">
                <div className="myproject__list">
                    {
                        listProject.map((project, index) =>
                            <div
                                key={index} className="myproject__list-item"
                                onClick={() => handleSetDetailProject(project)}
                            >
                                <div className="myproject__list-background">
                                    <img src={project.backGround} alt="" />
                                </div>
                                <span>
                                    {project.name}
                                </span>
                            </div>)
                    }

                </div>

                {
                    projectDetail && <MyprojectDetail
                        projectDetail={projectDetail}
                    />
                }





            </div>
        </>
    )

}