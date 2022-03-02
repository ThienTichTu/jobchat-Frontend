import { API_GET_FRIEND } from "../../config/API"
import axios from "axios"
import { useSelector, dispatch } from "react-redux"
import { useEffect, useState } from "react"
import { socket } from "../../config/Socketio"
export default function Nav_friend() {

    const [listFriend, setListFriend] = useState([]);
    const [listFriendOnline, setListFriendOnline] = useState([]);

    const messCout = useSelector(state => state.Effect.messCout)

    useEffect(() => {
        axios
            .get(API_GET_FRIEND, { withCredentials: true })
            .then((rs) => {
                console.log(rs.data)
                setListFriend([...rs.data])
                const listFriends = rs.data.map(user => user.id)

                socket.emit("Client_getFriend-online", listFriends)


            })
            .catch((error) => console.log(error))
        return () => {
            setListFriend([])
        }
    }, [messCout])

    socket.on("Server_getFriend-online", (data) => {
        setListFriendOnline([...data])
    })


    socket.on("Server_getClient-offline", (data) => {
        let rs = listFriendOnline.filter(e => e !== data);
        setListFriendOnline([...rs])
    })

    socket.on("Server_Mess_Useronline", data => {
        setListFriendOnline([...listFriendOnline, data])
    })
    return (
        <div className="nav_friend">
            {

                listFriend.map((user, index) =>

                    <div key={index} className="nav_friend-item">
                        <div className="nav_friend-avatar">
                            <img src={user.avatar} alt="" />
                        </div>
                        <div>
                            <span className="nav_friend-name">
                                {user.displayName}
                            </span>

                        </div>

                        {
                            listFriendOnline.includes(user.id)
                                ?
                                <span
                                    className="nav_friend-state"
                                    style={{ "color": "rgb(58, 179, 2)" }}
                                >
                                    online
                                </span>
                                :
                                <span
                                    className="nav_friend-state"
                                    style={{ "color": "rgb(194, 185, 185)" }}
                                >
                                    offline
                                </span>

                        }

                    </div>
                )
            }


        </div>
    )
}