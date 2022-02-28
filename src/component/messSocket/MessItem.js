
export default function MessItem({ type, data }) {

    return (
        <div className="messsocket-item">
            {
                type === "add friend"
                    ? <>
                        <div className="messsocket-item-addfriend">
                            <div className="messsocket-item-avatar">
                                <img src={data.avatar} alt="" />
                            </div>
                            <span className="messsocket-item-name">{data.name} </span>
                            <span> Vừa gửi lời mời kết bạn </span>
                            <button className="messsocket-item-ido">
                                Đồng ý
                            </button>
                        </div>
                    </>
                    : <>
                        <div className="messsocket-item-mess">
                            <span>
                                thong bao
                            </span>

                            <button className="messsocket-item-seen">
                                Đã xem
                            </button>
                        </div>

                    </>
            }
        </div>
    )
}