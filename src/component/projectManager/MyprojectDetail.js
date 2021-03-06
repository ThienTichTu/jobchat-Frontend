import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios"
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { activeProjectManager, setIdProject } from '../../redux/action/ProjectManager'


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    const dispatch = useDispatch()
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#dbdbdb" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#dbdbdb" }}
            onClick={onClick}
        />
    );
}

function MyprojectDetail({ projectDetail }) {
    const dispatch = useDispatch()

    const [st1, setSt1] = useState({
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    })
    const [st2, setSt2] = useState({
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    })


    const detailRef = useRef()
    useEffect(() => {
        if (projectDetail.name) {
            detailRef.current.style.display = "block";
        }

    }, [projectDetail])

    useEffect(() => {

        if (projectDetail.memberManager.length === 1) {
            const newst1 = { ...st2, slidesToShow: 1 }
            setSt1(newst1)
        }
        if (projectDetail.memberManager.length === 2) {
            const newst1 = { ...st2, slidesToShow: 2 }
            setSt1(newst1)
        }
        if (projectDetail.memberManager.length >= 3) {
            const newst1 = { ...st2, slidesToShow: 3 }
            setSt1(newst1)
        }

        if (projectDetail.memberNomarl.length === 1) {
            const newst2 = { ...st2, slidesToShow: 1 }
            setSt2(newst2)

        }
        if (projectDetail.memberNomarl.length === 2) {
            const newst2 = { ...st2, slidesToShow: 2 }
            setSt2(newst2)

        }
        if (projectDetail.memberNomarl.length >= 3) {
            const newst2 = { ...st2, slidesToShow: 3 }
            setSt2(newst2)

        }
    }, [projectDetail.memberManager.length, projectDetail.memberNomarl.length])

    const handleRedirect = () => {
        dispatch(activeProjectManager(false))
        dispatch(setIdProject(projectDetail.id))
    }
    return (
        <>
            <div ref={detailRef} className="myproject__detail">
                <div className="myproject__detail-name">
                    <span>
                        T??n d??? ??n :  {projectDetail.name}
                    </span>
                </div>
                <div className="myproject__detail-manager">
                    <span className="manager-title">
                        Qu???n tr??? vi??n:
                    </span>
                    <div className="manager-slick">
                        <Slider {...st1}>
                            {
                                projectDetail.memberManager.map((member, index) =>
                                    <div key={index}>
                                        <div className="manager-item">
                                            <div className="manager-item-img">
                                                <img src={member.avatar} alt="" />
                                            </div>
                                            <span>
                                                {member.displayName}
                                            </span>
                                        </div>
                                    </div>

                                )
                            }

                        </Slider>
                    </div>
                </div>
                <div className="myproject__detail-manager">
                    <span className="manager-title">
                        Th??nh vi??n :
                    </span>
                    <div className="manager-slick">
                        <Slider {...st2}>
                            {
                                projectDetail.memberNomarl.map((member, index) =>
                                    <div key={index}>
                                        <div className="manager-item">
                                            <div className="manager-item-img">
                                                <img src={member.avatar} alt="" />

                                            </div>
                                            <span>
                                                {member.displayName}
                                            </span>
                                        </div>
                                    </div>

                                )

                            }
                        </Slider>
                    </div>
                </div>
                <div className="myproject__detail-data">
                    <div className="data-column">
                        <span className="data-column-name">
                            S??? ti???n tr??nh
                        </span>
                        <span className="data-column-number">
                            {projectDetail.columns}
                        </span>
                    </div>
                    <div className="data-card">
                        <span className="data-card-name">
                            S??? task
                        </span>
                        <span className="data-card-number">
                            {projectDetail.cards}

                        </span>
                    </div>
                </div>
                <div className="myproject__footer">
                    <Link to={`/kanban/${projectDetail.id}`}>
                        <span
                            onClick={handleRedirect}
                        >
                            Xem chi ti???t
                        </span>
                    </Link>


                </div>
            </div>


        </>

    )
}
export default MyprojectDetail