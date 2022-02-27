import "./profile.scss"
import { useReducer } from "react"
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { API_UPDATE_USER } from '../../config/API'
import { ToastAcction } from "../../redux/action/toast"
import { LoginAction } from "../../redux/action/auth"

import profilePreducers from "./Reducer-react/profileReducers"

export default function Profile() {

    const userInfor = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    const setProfile = (type, payload) => {
        return {
            type,
            payload
        }
    }


    const [state, dipatch] = useReducer(profilePreducers, userInfor);
    const handleUpdate = () => {
        console.log(userInfor)
        axios({
            method: 'post',
            url: API_UPDATE_USER,
            data: state,
            withCredentials: true,
        })
            .then(rs => {
                if (rs.data === "update succesfuly") {
                    console.log("Cập nhật thành công")
                    dispatch(LoginAction(state))
                    dispatch(ToastAcction({ type: "success", mess: "Cập nhật thành Công" }))
                }
            })
            .catch(err => console.error(err))
    }


    return (
        <div className="profile">
            <div className="profile__left">
                <div className="profile-avatar">
                    <img src={userInfor.avatar} alt="" />
                </div>
                <div className="profile-infor">
                    <div className="profile__infor-name">
                        <span>{state.displayName}</span>
                    </div>
                    <div className="profile__infor-phone">
                        <span>{state.phone}</span>
                    </div>
                </div>
                <div className="profile__left-footer">

                    <div className="footer-item">
                        <a href={state.face}>
                            <i className="fab fa-facebook-square"></i>
                            <span>
                                Face book
                            </span>
                        </a>
                    </div>


                    <div className="footer-item">
                        <a href={state.twitter}>
                            <i className="fab fa-twitter"></i>
                            <span>
                                Twitter
                            </span>
                        </a>
                    </div>

                    <div className="footer-item">
                        <a href={state.tele}>
                            <i className="fab fa-telegram"></i>
                            <span>
                                telegram
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="profile__form">
                <div className="profile__form-header">
                    <span>Thông tin cá nhân</span>
                </div>
                <div className="profile__form-body">
                    <div className="body_item">
                        <span>
                            Tên :
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.displayName}
                            onChange={(e) => dipatch(setProfile("NAME", e.target.value))}
                        />
                    </div>
                    <div className="body_item">
                        <span>
                            Số điện thoại :
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.phone}
                            onChange={(e) => dipatch(setProfile("PHONE", e.target.value))}
                        />
                    </div>
                    <div className="body_item-des">
                        <span>
                            Về tôi:
                        </span>
                        <textarea type="text"
                            className="input_name"
                            value={state.decriptions}
                            onChange={(e) => dipatch(setProfile("DES", e.target.value))}

                        >
                        </textarea>
                    </div>
                    <div className="body_item">
                        <span>
                            Công Ty:
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.company}
                            onChange={(e) => dipatch(setProfile("COMPANY", e.target.value))}
                        />
                    </div>
                    <div className="body_item">
                        <span>
                            Địa chỉ:
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.address}
                            onChange={(e) => dipatch(setProfile("ADDRESS", e.target.value))}

                        />
                    </div>

                    <div className="body_item">
                        <span>
                            Tele:
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.telegram}
                            onChange={(e) => dipatch(setProfile("TELE", e.target.value))}
                        />
                    </div>
                    <div className="body_item">

                        <span>
                            Face:
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.face}
                            onChange={(e) => dipatch(setProfile("FACE", e.target.value))}
                        />

                    </div>

                    <div className="body_item">
                        <span>
                            Twitter:
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.twitter}
                            onChange={(e) => dipatch(setProfile("TWITTER", e.target.value))}
                        />
                    </div>
                </div>

                <div className="update_profile">
                    <span
                        onClick={handleUpdate}
                    >
                        Cập nhật</span>
                </div>

            </div>
        </div >
    )
}