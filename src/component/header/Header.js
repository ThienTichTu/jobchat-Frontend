import './header.scss'
import { API_LOGOUT } from "../../config/API"
import { ChangeBbtn } from "../../redux/action/globalState"
import { LogoutAction } from "../../redux/action/auth"
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
export default function Header() {

    const activeBtn = useSelector(state => state.Effect.btn_ActiveNav);
    const pageName = useSelector(state => state.Effect.pageName);
    const img = useSelector(state => state.auth.user.avatar);
    const [logoutActive, setLogoutActive] = useState(true)
    const dispatch = useDispatch();
    console.log(img)
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
                    localStorage.removeItem('iduser');
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
                            placeholder="Tìm kiếm ...."
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="header__option-mess">
                        <i className="fa-solid fa-bell"></i>
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
                    <span>Đăng xuất</span>
                </div>
            </div>
        </>
    )
}