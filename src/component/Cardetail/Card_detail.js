import "./Carddetail.scss"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDatVn from "../../config/setDateVn"
import { memo, useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { activeCardDetail, closeCardDetail } from "../../redux/action/Card_detail"
import { socket } from "../../config/Socketio"
import { API_CREATE_CARD } from "../../config/API"

import axios from "axios"

const setting = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
}

const Card_detail = () => {
    const dispatch = useDispatch()
    const cardRef = useRef()
    const data = useSelector(state => state.CardDetailReducers)
    const user = useSelector(state => state.auth.user)

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

    const handleCreateCard = () => {
        const day = formatDatVn(selectDate)

        const newCard = {
            idProcess: data.idColumn.id,
            idProject: data.infor.id,
            nameCard: name,
            maker: listMaker,
            description: description,
            dealine: day || "Kh??ng c??",
            manager: data.infor.manager
        }

        axios({
            method: "POST",
            url: API_CREATE_CARD,
            data: newCard,
            withCredentials: true,
        })
            .then((rs) => {

                newCard.id = rs.data.id
                newCard.chatRoom = rs.data.chat
                dispatch(activeCardDetail(
                    {
                        active: false, column: { id: data.idColumn.id }, infor: {}, data: {
                            ...newCard,
                            state: "create"
                        }

                    }))
                const userMaker = listMaker.filter(item => item.id !== user.id)

                if (userMaker.length !== 0) {
                    socket.emit("Client_createCard", {
                        user: userMaker, content: {
                            manager: user.displayName,
                            project: data.idColumn.name,
                            nameCard: name,
                            project: data.infor.name
                        }
                    })
                }
                setSelectDate("")
                setListMaker([])
                setName("")

            })
            .catch((err) => console.log(err))
    }

    return (
        <div ref={cardRef} className="card-detail">
            <div className="card-detail-header">
                <h2
                    style={{
                        "marginRight": "auto",
                        "paddingLeft": "5px"
                    }}
                >Th??m c??ng vi???c</h2>
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
                    placeholder={`Nh???p t??n c??ng vi???c`}
                    onChange={(e) => setName(e.target.value)}
                />
                <span className="card-name-parent">
                    T??n d??? ??n:  {data.infor.name}
                </span>
                <span className="card-name-parent">
                    T??n ti???n tr??nh : {data.idColumn.name}
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
                    Ng?????i th???c hi???n:
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
                        K???t th??c :
                    </span>
                    <DatePicker selected={selectDate} onChange={(date) => setSelectDate(date)} minDate={new Date()} />
                </div>
                <div className="card-des">
                    <span>M?? t??? c??ng vi???c</span>
                    <textarea
                        name="" id="" cols="30" rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nh???p m?? t??? c??ng vi???c...."
                    ></textarea>
                </div>
            </div>

            <div
                className="card-detail-footer"
                onClick={handleCreateCard}
            >
                <span>T???o c??ng vi???c</span>
            </div>
        </div>
    )

}

export default memo(Card_detail)