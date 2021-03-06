import './header.scss'
import { API_LOGOUT } from "../../config/API"
import { ChangeBbtn } from "../../redux/action/globalState"
import { LogoutAction } from "../../redux/action/auth"
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mess_Active } from "../../redux/action/togle"


import axios from "axios"
import { socket } from "../../config/Socketio"
export default function Header() {


    const activeBtn = useSelector(state => state.Effect.btn_ActiveNav);

    const pageName = useSelector(state => state.Effect.pageName);

    const messCout = useSelector(state => state.Effect.messCout);

    const img = useSelector(state => state.auth.user.avatar);
    const idUser = useSelector(state => state.auth.user.id);

    const [logoutActive, setLogoutActive] = useState(true)
    const dispatch = useDispatch();

    function handleBar() {
        dispatch(ChangeBbtn(false));
    }

    function logOut() {


        axios({
            method: 'get',
            url: API_LOGOUT,
            withCredentials: true,
        })
            .then(rs => {
                if (rs.data === "logout ok") {
                    socket.emit("idClient_disconnet", idUser)
                    dispatch(LogoutAction(false));

                }

            })
            .catch(err => console.log(err))

    }


    const logOutActive = useRef();

    useEffect(() => {

        logoutActive ? logOutActive.current.style.right = "-200px" : logOutActive.current.style.right = " 10px"

    }, [logoutActive])

    return (
        <>

            <div className="header">
                <div className="header__title">

                    {activeBtn &&
                        <div className="header__bar">
                            <i
                                className="fa-solid fa-bars"
                                onClick={handleBar}
                            ></i>
                        </div>
                    }



                    <h2>{pageName}</h2>
                </div>
                <div className="header__option">
                    <div className="header__option-search">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="T??m ki???m ...."
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div
                        className="header__option-mess"
                        onClick={() => dispatch(Mess_Active(true))}
                    >
                        <i className="fa-solid fa-bell"></i>

                        {
                            messCout !== 0 && <>
                                <span>
                                    {messCout}
                                </span>
                            </>
                        }

                    </div>
                    <div
                        className="header__option-avatar"
                        onClick={() => setLogoutActive(!logoutActive)}
                    >
                        <img src={img} alt="" />
                    </div>
                </div>
                <div
                    onClick={() => logOut()}
                    ref={logOutActive} className="log__out"

                >
                    <span>????ng xu???t</span>
                </div>
            </div>
        </>
    )
}