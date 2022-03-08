import './kanban.scss'
// import Colum from '../Colum/Colum';
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Colum from "../Kanban/Colum"

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
    ["colum1"]: {
        name: "Todo",
        item: itemFromBackend
    },
    ["colum2"]: {
        name: "Process",
        item: []
    }
}


export default function Kanban() {

    const [columns, setColumns] = useState(columsFromBackend)

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

    return (
        <>
            <div className="workspace">
                <div className="list__kanban">
                    <span className="list__kanban-item">
                        Thiết kế
                    </span>
                </div>
                <div className="kanban">

                    <DragDropContext onDragEnd={rs => handlePropEnd(rs, columns, setColumns)}>
                        {
                            Object.entries(columns).map(([id, column]) => {

                                return (
                                    <div key={id}
                                        className="kanban-column-warper"
                                    >
                                        <h2 className="kanban-column-name" >{column.name}</h2>
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
                                "marginLeft": "auto"
                            }}
                        >
                            <h2
                                className="kanban-column-name"
                                style={{
                                    "textAlign": "center",
                                    "width": "300px",
                                    "border": "1px dashed #fff",
                                    "backgroundColor": "#88ccf35e",
                                    "cursor": "pointer",
                                }}
                            >Thêm tiến trình</h2>
                        </div>
                    </DragDropContext>
                </div>

            </div>
        </>
    )
}