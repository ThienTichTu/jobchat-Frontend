import "./addfriend.scss"
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import UserFound from "./UserFound"
import { addFriend_Active } from "../../redux/action/togle"
import { API_FIND_USER } from "../../config/API"
import { ToastAcction } from "../../redux/action/toast"

export default function AddFriend() {

    const [search, setSearch] = useState("")
    const addFriendRef = useRef();
    const dispatch = useDispatch();
    const [userFounded, setUserFounded] = useState([])
    const active = useSelector(state => state.togle.addFriend);
    useEffect(() => {
        if (active) {
            addFriendRef.current.style.display = "block"
        } else {
            addFriendRef.current.style.display = "none"
        }
        return () => {
            setUserFounded([])
            setSearch("")
        }
    }, [active])

    function handleFind() {

        if (search.length !== 0) {
            axios({
                method: 'get',
                url: `${API_FIND_USER}/${search}`,
                withCredentials: true,
            })
                .then(rs => {
                    if (rs.data.length === 0)
                        setUserFounded(["notfound"]);
                    else
                        setUserFounded([...rs.data]);

                    console.log(rs.data)
                })
                .catch(err => console.log(err))

        } else {
            dispatch(ToastAcction({ type: "warning", mess: "Bạn chưa nhập từ khóa tìm kiếm !!" }))
        }
        setSearch("")
    }

    return (
        <div
            ref={addFriendRef} className="add__friend"
        >
            <div
                className="add__friend-container"
            >
                <div className="add__friend-header">
                    <i
                        className="fa-solid fa-xmark add__friend-close "
                        onClick={() => dispatch(addFriend_Active(false))}

                    ></i>
                    <div className="add__friend-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <i
                            className="fa-solid fa-caret-right"
                            onClick={handleFind}
                        ></i>
                    </div>
                </div>

                <div className="add__friend-body">
                    {
                        userFounded[0] === "notfound"
                            ?
                            <div className="add__friend-notfound">
                                <h3>Không tìm thấy người dùng</h3>
                            </div>
                            :
                            userFounded.map((user, index) =>
                                <UserFound

                                    key={index}
                                    idFind={user.id}
                                    displayName={user.displayName}
                                    avatar={user.avatar}
                                    state={user.state}
                                    key={index}
                                />
                            )
                    }






                </div>
            </div>
        </div>
    )
}