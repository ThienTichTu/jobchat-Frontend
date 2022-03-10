import "./Carddetail.scss"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { memo, useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { activeCardDetail, closeCardDetail } from "../../redux/action/Card_detail"

const setting = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
}

const Card_detail = () => {
    const dispatch = useDispatch()
    const cardRef = useRef()
    const data = useSelector(state => state.CardDetailReducers)

    const [name, setName] = useState("")
    const [listmember, setListmember] = useState([])

    const [listMaker, setListMaker] = useState([])

    const [selectDate, setSelectDate] = useState()

    const [description, setDescription] = useState("")


    useEffect(() => {
        if (data.activeCreate) {
            cardRef.current.style.display = "block"
        } else {
            cardRef.current.style.display = "none"
        }
        const newMember = data.infor.members || []
        setListmember(newMember)
        return () => {
            setSelectDate("")
            setListMaker([])
        }
    }, [data.activeCreate])

    const handleSetMaker = (user, op, index) => {
        if (!listMaker.includes(user) && op === "add") {
            setListMaker([...listMaker, user])
        } else if (listMaker.includes(user) && op === "remove") {
            listMaker.splice(index, 1)
            setListMaker([...listMaker])
        }
    }

    return (
        <div ref={cardRef} className="card-detail">
            <div className="card-detail-header">
                <h2
                    style={{
                        "marginRight": "auto",
                        "paddingLeft": "5px"
                    }}
                >Thêm công việc</h2>
                <i
                    className="fa-solid fa-xmark"
                    onClick={() => dispatch(closeCardDetail(false))}
                ></i>
            </div>
            <div className="card-detail-body">
                <input
                    type="text"
                    value={name}
                    className="card-detail-name"
                    placeholder={`Nhập tên công việc`}
                    onChange={(e) => setName(e.target.value)}
                />
                <span className="card-name-parent">
                    Tên dự án:  {data.infor.name}
                </span>
                <span className="card-name-parent">
                    Tên tiến trình : {data.idColumn.name}
                </span>
                <div className="card-list-member">

                    {
                        listmember.map((member, index) =>

                            <div key={index}>
                                <div className="card-list-item">
                                    <div
                                        className="itemImg"
                                        onClick={() => handleSetMaker(member, "add")}
                                    >
                                        <img src={member.avatar} alt="" />
                                    </div>
                                </div>

                            </div>
                        )

                    }

                </div>
                <span className="card-title">
                    Người thực hiện:
                </span>
                <div className="card-list-maker">
                    {
                        listMaker.map((member, index) => (
                            <div
                                key={index}
                                className="card-list-item"
                                style={{ "marginTop": "10px" }}
                                onClick={() => handleSetMaker(member, "remove", index)}
                            >
                                <div className="itemImg">
                                    <img src={member.avatar} alt="" />
                                </div>
                                <span>
                                    {member.displayName}
                                </span>
                            </div>
                        ))
                    }

                </div>

                <div className="card-deline">

                    <i className="fa-solid fa-clock"></i>
                    <span>
                        Kết thúc :
                    </span>
                    <DatePicker selected={selectDate} onChange={(date) => setSelectDate(date)} />
                </div>
                <div className="card-des">
                    <span>Mô tả công việc</span>
                    <textarea
                        name="" id="" cols="30" rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả công việc...."
                    ></textarea>
                </div>
            </div>

            <div className="card-detail-footer">
                <span>Tạo công việc</span>
            </div>
        </div>
    )

}

export default memo(Card_detail)