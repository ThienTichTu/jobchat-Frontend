import './kanban.scss'
import Colum from '../Colum/Colum';
import { useRef, useEffect } from 'react'

export default function Kanban() {




    return (
        <>
            <div className="workspace">
                <div className="list__kanban">
                    <span className="list__kanban-item">
                        Thiết kế
                    </span>
                </div>
                <div className="kanban">
                    <div className="kanban-colum">


                    </div>



                </div>

            </div>
        </>
    )
}