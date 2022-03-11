
export default function Card({ data }) {

    const handleSenddetail = () => {
        console.log(data)
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

                        <div className="kanban-card-img">
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