
import { socket } from '../../config/Socketio'
import { useSelector } from 'react-redux'
export default function UserFound({ idFind, displayName, avatar, state }) {
    const dataUser = useSelector(state => state.auth.user)
    function handleAdd() {

        const { id, displayName, avatar } = dataUser
        socket.emit("add_friend", {
            idFind: idFind,
            idAdd: id,
            displayName: displayName,
            avatar: avatar
        })
    }
    return (
        <div className="user__found">
            <div className="user__found-avatar">
                <img src={avatar} alt="" />
            </div>
            <div className="user__found-infor">
                <span>
                    {displayName}
                </span>
            </div>
            <div className="user__found-add">
                {
                    state === "not-friend"
                        ? <span
                            onClick={handleAdd}
                        >
                            Thêm bạn bè
                        </span>
                        :
                        <span
                            style={{ "backgroundColor": "#686868" }}
                        >
                            Bạn bè
                        </span>
                }
            </div>
        </div>
    )
}


