import './kanban.scss'
// import Colum from '../Colum/Colum';
import { useState, useEffect, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
// import { activeProjectManager } from '../../redux/action/ProjectManager'
import { API_GET_PROJECT, API_ADD_PROCESS } from "../../config/API"
import _ from 'lodash'
import Colum from "../Kanban/Colum"
import axios from 'axios'
import { setIdProject, setProjectMember } from '../../redux/action/ProjectManager'
import { useDispatch } from 'react-redux'
import { ToastAcction } from "../../redux/action/toast"
import { activeCardDetail } from "../../redux/action/Card_detail"
import { MessDelete } from "../../redux/action/togle"
import { useSelector } from "react-redux"
import { API_LOCATION_CARD } from "../../config/API"
const setting = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}
const itemFromBackend = [
    { id: "1", content: "First task" },
    { id: "2", content: "secontask task" },
    { id: "3", content: "thirt task" },
    { id: "4", content: "thirt task" },
    { id: "5", content: "thirt task" },
    { id: "6", content: "thirt task" },
]
const columsFromBackend =
{
    "colum1": {
        name: "Todo",
        item: itemFromBackend
    },
    "colum2": {
        name: "Process",
        item: []
    },

}


export default function Kanban() {
    let { id } = useParams();
    const addprojetRef = useRef()
    const dispatch = useDispatch()
    const [columns, setColumns] = useState({})
    const [inforProject, setInforProject] = useState({})
    const [members, setMembers] = useState([])
    const [nameProcess, setNameProcess] = useState("")
    const [manager, setManager] = useState([])
    const dataAddCard = useSelector(state => state.CardDetailReducers)

    const deleteColumn = useSelector(state => state.togle.messDelete)

    const toggle = useSelector(state => state.togle.messDelete)
    useEffect(() => {

        if (id) {
            axios.get(`${API_GET_PROJECT}/${id}`, { withCredentials: true })
                .then(rs => {
                    const { name, backGround, date_create, memberNomarl, memberManager, id, column } = rs.data.infor
                    setInforProject({ name, backGround, date_create, id })
                    var member = _.concat(memberNomarl, memberManager);
                    setManager(memberManager)
                    setColumns(rs.data.columns)
                    setMembers(member)
                    dispatch(setIdProject(id))
                    dispatch(setProjectMember(member))

                })
                .catch(err => console.log(err))
        }
    }, [id])

    const handlePropEnd = (data, columns, setColumns) => {
        const { source, destination } = data;

        if (source.droppableId !== destination.droppableId) {
            const column = columns[destination.droppableId]
            const coppieitem = column.item
            const columnSource = columns[source.droppableId]
            const coppiesItemSource = columnSource.item
            const [remove] = coppiesItemSource.splice(source.index, 1)
            coppieitem.splice(destination.index, 0, remove)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...columnSource,
                    item: coppiesItemSource
                },
                [destination.droppableId]: {
                    ...column,
                    item: coppieitem
                }
            })
            const dataLocation = {
                source: source.droppableId,
                des: destination.droppableId,
                item: remove
            }
            axios({
                method: 'post',
                url: API_LOCATION_CARD,
                data: dataLocation,
                withCredentials: true,
            })
                .then((rs) => {

                })
                .catch(err => console.error(err))

        } else {
            const column = columns[source.droppableId]
            const coppiesItem = column.item
            const [remove] = coppiesItem.splice(source.index, 1)
            coppiesItem.splice(destination.index, 0, remove)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    item: coppiesItem
                }
            })

        }
    }



    const handleSlideAdd = () => {

        if (addprojetRef.current.style.display === "block") {
            addprojetRef.current.style.display = "none"
        } else {
            addprojetRef.current.style.display = "block"
        }
    }
    // API_ADD_PROCESS
    const handleAddProcess = () => {
        axios({
            method: "POST",
            url: API_ADD_PROCESS,
            data: {
                id,
                name: nameProcess
            },
            withCredentials: true,
        })
            .then(rs => {
                setColumns({
                    ...columns,
                    ...rs.data
                })
                addprojetRef.current.style.display = "none"
                dispatch(ToastAcction({ type: "success", mess: "T???o b???n v???a t???o m???i m???t ti???n tr??nh" }))
            })
            .catch(err => console.error(err))

    }

    const handleAddCard = (id, name) => {
        dispatch(activeCardDetail(
            {
                active: true, column: { id, name: name }, infor: { ...inforProject, members, manager }, data: false

            }))
    }

    const handleDeleteColumn = (idProcess) => {
        dispatch(MessDelete({ active: true, id: idProcess, idProject: id }))
    }

    useEffect(() => {
        if (toggle.data) {
            const newColumns = { ...columns }
            delete newColumns[toggle.data]
            setColumns(newColumns)
            dispatch(ToastAcction({ type: "success", mess: "X??a ti???n tr??nh th??nh c??ng !" }))

        }
    }, [toggle.data])

    useEffect(() => {
        if (dataAddCard.data.state === "create") {

            columns[dataAddCard.data.idProcess].item.unshift(dataAddCard.data)
            const newColumns = { ...columns }
            setColumns(newColumns)
            dispatch(ToastAcction({ type: "success", mess: "T???o c??ng vi???c m???i th??nh c??ng !" }))

        } else {
            if (dataAddCard.data.state === "update") {
                const { state, index, ...newcard } = dataAddCard.data;
                if (index || index === 0) {

                    columns[dataAddCard.data.idProcess].item.splice(index, 1)
                    columns[dataAddCard.data.idProcess].item.splice(index, 0, newcard)
                    const newColumns = { ...columns }
                    setColumns({ ...newColumns })
                }
            }
            if (dataAddCard.data.state === "delete") {
                const { state, index } = dataAddCard.data;

                if (index || index === 0) {
                    columns[dataAddCard.data.idProcess].item.splice(index, 1)
                    const newColumns = { ...columns }
                    setColumns({ ...newColumns })
                }
            }
        }

    }, [dataAddCard.data, dataAddCard.data.state])

    return (
        <>
            <div className="workspace">
                <div className="list__kanban">
                    <div className="list__kanban-infor">
                        <div className="kanban-infor-background">
                            {inforProject.backGround && <img src={inforProject.backGround} alt="" />}
                        </div>
                        <div className="kanban-infor-name">
                            <span>
                                {inforProject.name}
                            </span>
                        </div>
                        <span>
                            Ng??y t???o {inforProject.date_create}
                        </span>

                    </div>
                    <div className="member-slide">
                        {
                            members.map((member, index) =>

                                <div key={index} className="member-item">
                                    <div className="member-item-img">
                                        <img src={member.avatar} alt="" />
                                    </div>
                                </div>

                            )
                        }
                    </div>
                </div>
                <div className="kanban">

                    <DragDropContext onDragEnd={rs => handlePropEnd(rs, columns, setColumns)}>
                        {
                            Object.entries(columns).map(([id, column]) => {

                                return (
                                    <div key={id}
                                        className="kanban-column-warper"
                                    >
                                        <div className="kanban-column-header">
                                            <h2 className="kanban-column-name" >{column.name}</h2>
                                            <div className="kanban-column-addcard">
                                                <i
                                                    className="fa-solid fa-plus"
                                                    onClick={() => handleAddCard(id, column.name)}
                                                ></i>

                                                <i
                                                    style={{ "marginLeft": "10px" }}
                                                    className="fa-solid fa-trash"
                                                    onClick={() => handleDeleteColumn(id)}
                                                ></i>
                                            </div>
                                        </div>
                                        <Colum
                                            column={column}
                                            id={id}
                                        />
                                    </div>
                                )
                            })
                        }
                        <div
                            className="kanban-column-warper"
                            style={{
                                "marginLeft": "20px",
                                "position": "relative",

                            }}
                        >
                            <h2
                                style={{
                                    "textAlign": "center",
                                    "width": "300px",
                                    "border": "1px dashed #fff",
                                    "backgroundColor": "#88ccf35e",
                                    "cursor": "pointer",
                                    "height": "50px",
                                    "lineHeight": "50px",

                                }}

                                onClick={handleSlideAdd}
                            >Th??m ti???n tr??nh</h2>

                            <div ref={addprojetRef} className="kanban-addprocess">

                                <input
                                    type="text"
                                    value={nameProcess}
                                    onChange={(e) => setNameProcess(e.target.value)}
                                />
                                <span
                                    className="kanban-addprocess-btn"
                                    onClick={handleAddProcess}
                                >
                                    T???o ti???n tr??nh m???i
                                </span>

                            </div>
                        </div>
                    </DragDropContext>
                </div>

            </div>

        </>
    )
}