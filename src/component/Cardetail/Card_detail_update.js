import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Carddetail.scss"
import { socket } from "../../config/Socketio"

import Card_detailChat from "./Card_detailChat"
import { memo, useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { closeCardDetailUpdate, activeCardDetail } from "../../redux/action/Card_detail"
import { API_DATAUPDATE_CARD, API_DELETE_CARD } from "../../config/API"
import formatDatVn from "../../config/setDateVn"
import axios from "axios";

function Card_detail_update() {
    const data = useSelector(state => state.CardDetailUpdate)
    console.log(data)
    const listMember = useSelector(state => state.ProjectManager.Members)
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const [listMaker, setListMaker] = useState([])
    const [selectDate, setSelectDate] = useState();
    const [newDate, setNewDate] = useState("")
    const [description, setDescription] = useState("")
    const cardRef = useRef()
    const [dataChat, setDataChat] = useState([])

    useEffect(() => {
        if (data.active) {
            cardRef.current.style.display = "block"
            setNewDate(data.data.dealine)
            setDescription(data.data.description)
            setListMaker(data.data.maker)
            setName(data.data.nameCard)
        } else {
            cardRef.current.style.display = "none"
        }
    }, [data.active, data.data])

    useEffect(() => {

    })

    const handleSetList = (user, op, index) => {
        if (!listMaker.includes(user) && op === "add") {
            setListMaker([...listMaker, user])
        } else if (listMaker.includes(user) && op === "remove") {
            listMaker.splice(index, 1)
            setListMaker([...listMaker])
        }
    }
    const handleUpdate = () => {

        const newlist = listMaker.map(item => item.id)
        const newCard = {
            nameCard: name,
            dealine: newDate,
            description: description,
            id: data.data.id,
            idProcess: data.data.idProcess,
            idProject: data.data.idProject,
            maker: newlist,
        }
        axios({
            method: "POST",
            url: API_DATAUPDATE_CARD,
            data: {
                card: newCard
            },
            withCredentials: true,
        })
            .then(rs => {
                newCard.maker = listMaker
                dispatch(activeCardDetail(
                    {
                        active: false, column: { id: data.data.idProcess }, infor: {}, data: {
                            ...newCard,
                            state: "update",
                            index: data.index,
                        }
                    }))
            })
            .catch(err => console.log(err))

    }

    const handleDelete = () => {

        axios({
            method: "POST",
            url: API_DELETE_CARD,
            data: {
                id: data.data.id,
                idRoom: data.data.chatRoom
            },
            withCredentials: true,
        })
            .then(rs => {
                if (rs.data === "ok") {
                    dispatch(activeCardDetail(
                        {
                            active: false, column: { id: data.data.idProcess }, infor: {}, data: {
                                state: "delete",
                                index: data.index,
                                id: data.data.id,
                                idProcess: data.data.idProcess
                            }
                        }))
                    dispatch(closeCardDetailUpdate(false))
                }
            })
            .catch(err => console.log(err))

    }



    return (

        <div ref={cardRef} className="card-detail-update" >
            <div className="card-detail-header2">

                <h3>Chi tiết công việc</h3>


                <div>
                    <i
                        style={{ marginRight: "30px" }}
                        className="fa-solid fa-trash"
                        onClick={() => handleDelete()}
                    ></i>
                    <i
                        className="fa-solid fa-xmark"
                        onClick={() => dispatch(closeCardDetailUpdate(false))}
                    ></i>
                </div>
            </div>
            <div className="card-detail-body2">
                <input
                    type="text"
                    className="card-detail-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="body2-process">
                    <span>
                        Tên tiến trình: Hoàn Thành
                    </span>
                </div>
                <div className="body2-listmember">
                    {
                        listMember.map((member, index) =>
                            <div
                                key={index}
                                className="body2-listmember-item"
                                onClick={() => handleSetList(member, "add")}
                            >
                                <img src={member.avatar} alt="" />
                            </div>
                        )
                    }

                </div>

                <span style={{ "marginTop": "20px", "marginBottom": "10px" }}>
                    Người thực hiện:
                </span>
                <div className="body2-listmaker">
                    {
                        listMaker.map((item, index) =>
                            <div
                                key={index}
                                className="body2-listmaker-item"
                                onClick={() => handleSetList(item, "remove", index)}

                            >
                                <div className="body2-listmember-item">
                                    <img src={item.avatar} alt="" />
                                </div>
                                <span>
                                    {item.displayName}
                                </span>
                            </div>
                        )
                    }

                </div>

                <div
                    className="card-deline"

                >

                    <i className="fa-solid fa-clock"></i>
                    <span>
                        Kết thúc :
                    </span>
                    <div>
                        <DatePicker selected={selectDate} onChange={(date) => {
                            setSelectDate(date)
                            const day = formatDatVn(date)
                            setNewDate(day)

                        }} minDate={new Date()} />

                    </div>
                    <span
                        style={{
                            "fontWeight": "bold",
                            "marginLeft": "10px",
                            "color": newDate === "Không có" ? "green" : "red"
                        }}
                    >
                        {newDate}
                    </span>
                    <i
                        className="fa-solid fa-xmark"
                        style={{
                            "cursor": "pointer"
                        }}
                        onClick={() => setNewDate("Không có")}
                    ></i>

                </div>
                <div className="card-des">
                    <span>Mô tả công việc</span>
                    <textarea

                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả công việc...."
                    ></textarea>
                </div>
                <span style={{ marginTop: "20px", fontSize: "18px", marginBottom: "5px" }} >Hoạt động:</span>
                {/* activity */}

                <Card_detailChat
                    idRoom={data.data.chatRoom}
                    listMember={listMember}
                    manager={data.data.manager}
                    nameCard={data.data.nameCard}
                />
            </div>

            <div
                className="card-detail-footer"
                style={{
                    "backgroundColor": "#10cf10",

                }}
                onClick={handleUpdate}
            >
                <span>Lưu</span>
            </div>
        </div>
    )
}

export default Card_detail_update