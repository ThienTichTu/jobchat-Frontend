import { activeCardDetailUpdate } from "../../redux/action/Card_detail"
import { useDispatch } from "react-redux"

export default function Card({ data, index }) {
    const dispatch = useDispatch();
    const handleSenddetail = () => {
        dispatch(activeCardDetailUpdate({
            card: data,
            index: index
        }))
    }
    return (
        <>
            <span
                className="kanban-card-name"
                onClick={handleSenddetail}
            >{data.nameCard}</span>
            <div className="kanban-card-maker">
                {
                    data.maker.map((item, index) =>

                        <div key={index} className="kanban-card-img">
                            <img src={item.avatar} alt="" />
                        </div>
                    )
                }

            </div>
            <div className="kanban-card-des">
                <span>
                    {data.description}
                </span>

            </div>
            {
                data.dealine === "Không có"
                    ?
                    <div
                        className="kanban-card-footer"
                        style={{ color: "green" }}
                    >
                        <span>
                            Deadline : {data.dealine}
                        </span>
                    </div>
                    :
                    <div className="kanban-card-footer">
                        <span>
                            Deadline : {data.dealine}
                        </span>
                    </div>
            }

        </>

    )

}