import { useEffect, useState } from "react";
import MyprojectDetail from "./MyprojectDetail";
import { API_FIND_PROJECT } from "../../config/API"
import axios from "axios";


export default function MyProject({ active }) {

    const [listProject, setListProject] = useState([])

    const [projectDetail, setProjectDetail] = useState(false)

    useEffect(() => {
        axios.get(API_FIND_PROJECT, { withCredentials: true })
            .then(rs => {
                console.log(rs.data)
                setListProject(rs.data)
            })
            .catch(err => console.log(err))
        return () => {
            setListProject([])
            setProjectDetail(false)
        }
    }, [active])

    const handleSetDetailProject = (data) => {
        setProjectDetail(data)

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