import "./addfriend.scss"
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import UserFound from "./UserFound"
import { addFriend_Active } from "../../redux/action/togle"
import { API_FIND_USER } from "../../config/API"
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

    }, [active])

    function handleFind() {
        let data = "s"
        if (search !== "") {
            data = search
        }
        axios({
            method: 'get',
            url: `${API_FIND_USER}/${data}`,
            withCredentials: true,
        })
            .then(rs => {

                setUserFounded([...rs.data]);
            })
            .catch(err => console.log(err))
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
                            defaultValue={search}
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
                        userFounded.map((user, index) => {

                            if (user === "skip") {
                                console.log("skip")
                                return (
                                    <div className="add__friend-notfound" key={index}>
                                        <h3>Không tìm thấy người dùng</h3>
                                    </div>
                                )
                            } else {
                                return (
                                    <UserFound

                                        key={index}
                                        idFind={user.id}
                                        displayName={user.displayName}
                                        avatar={user.avatar}
                                    />
                                )
                            }
                        })
                    }




                </div>
            </div>
        </div>
    )
}