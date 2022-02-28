import { API_ADD_USER } from "../../config/API"
import axios from "axios"
import { socket } from '../../config/Socketio'
import { useSelector } from 'react-redux'
export default function UserFound({ idFind, displayName, avatar }) {
    const dataUser = useSelector(state => state.auth.user)
    function handleAdd() {
        // axios({
        //     method: 'post',
        //     url: API_ADD_USER,
        //     data: {
        //         idUser: id
        //     },
        //     withCredentials: true,
        // })
        //     .then(rs => {
        //         console.log(rs.data)
        //     })
        //     .catch(err => console.log(err))

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
                <span
                    onClick={handleAdd}
                >
                    Thêm bạn bè
                </span>
            </div>
        </div>
    )
}


