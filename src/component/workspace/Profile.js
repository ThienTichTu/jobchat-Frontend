import "./profile.scss"
import { useReducer } from "react"
import { useSelector } from 'react-redux';

import profilePreducers, { initState } from "./Reducer-react/profileReducers"

export default function Profile() {
    const initState = useSelector(state => state.User);

    const setProfile = (type, payload) => {
        return {
            type,
            payload
        }
    }


    const [state, dipatch] = useReducer(profilePreducers, initState);


    return (
        <div className="profile">
            <div className="profile__left">
                <div className="profile-avatar">
                    <img src="../../../../../../avatar.jpg" alt="" />
                </div>
                <div className="profile-infor">
                    <div className="profile__infor-name">
                        <span>{state.name}</span>
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
                            value={state.name}
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
                            value={state.des}
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
                            Sinh nhật:
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.birth}
                            onChange={(e) => dipatch(setProfile("BIRTH", e.target.value))}
                        />
                    </div>
                    <div className="body_item">
                        <span>
                            Tele:
                        </span>
                        <input type="text"
                            className="input_name"
                            value={state.tele}
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

            </div>
        </div >
    )
}