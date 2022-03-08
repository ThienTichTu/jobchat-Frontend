import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Card from "./Card"
export default function Colum({ column, id }) {

    return (
        <Droppable droppableId={id} >
            {
                (provided, snapshot) => {

                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={"kanban-column"}

                        >
                            {
                                column.item.map((item, index) => {
                                    return (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {
                                                (provided, snapshot) => {
                                                    return (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={"kanban-card"}

                                                        >
                                                            <Card
                                                                data={item}
                                                            />
                                                        </div>

                                                    )
                                                }
                                            }

                                        </Draggable>
                                    )

                                })
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            }

        </Droppable>
    )
}