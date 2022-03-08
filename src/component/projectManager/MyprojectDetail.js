import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios"
import { useEffect, useRef, useState } from "react";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
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


    return (
        <>
            <div ref={detailRef} className="myproject__detail">
                <div className="myproject__detail-name">
                    <span>
                        Tên dự án :  {projectDetail.name}
                    </span>
                </div>
                <div className="myproject__detail-manager">
                    <span className="manager-title">
                        Quản trị viên:
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
                        Thành viên :
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
                            Số tiến trình
                        </span>
                        <span className="data-column-number">
                            10
                        </span>
                    </div>
                    <div className="data-card">
                        <span className="data-card-name">
                            Số task
                        </span>
                        <span className="data-card-number">
                            10
                        </span>
                    </div>
                </div>
                <div className="myproject__footer">
                    <span>Xem chi tiết</span>
                </div>
            </div>


        </>

    )
}
export default MyprojectDetail