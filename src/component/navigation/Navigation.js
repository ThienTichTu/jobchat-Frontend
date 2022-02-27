import './Navigation.scss'
import { ChangeBbtn, ChangePageName } from "../../redux/action/globalState"
import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
export default function Navigation({ handleStay, handleBoo, boo }) {
    const barDom = useRef();

    const activeBtn = useSelector(state => state.Effect.btn_ActiveNav);

    const dispatch = useDispatch();
    function handleBar() {
        dispatch(ChangeBbtn(true));
    }

    function handlePageName(name) {
        dispatch(ChangePageName(name));
    }

    useEffect(() => {

        if (activeBtn) {
            barDom.current.style.marginLeft = '-300px';

        } else {
            barDom.current.style.marginLeft = '0';

        }
    }, [activeBtn])

    return (
        <>

            <div className="nav__container" ref={barDom}>
                <div className="nav__title ">
                    <div className="nav__title-logo">
                        <img src="../../../../../../logo-main.ico" alt="" />
                    </div>
                    <div
                        className="nav__title-icon"
                        onClick={handleBar}
                    >

                        <i className="fa-solid fa-bars"></i>
                    </div>

                </div>
                <div>
                    <NavLink to="/canhan">
                        <div
                            className="nav__element"
                            onClick={() => handlePageName("Cá Nhân")}

                        >
                            <i className="fa-solid fa-house"></i>
                            <span>    Cá nhân</span>
                        </div>
                    </NavLink>
                    <NavLink to="/kanban">
                        <div
                            className="nav__element"
                            onClick={() => handlePageName("Tiến Trình")}


                        >
                            <i className="fa-solid fa-house"></i>
                            <span>    Tiến Trình</span>
                        </div>
                    </NavLink>

                    <NavLink to="/myjob" >
                        <div
                            className="nav__element"
                            onClick={() => handlePageName("Công Việc Của Tôi")}

                        >
                            <i className="fa-solid fa-circle-check"></i>
                            <span>    Công việc của tôi</span>
                        </div>
                    </NavLink>
                    <NavLink to='/chat'>
                        <div
                            className="nav__element"
                            onClick={() => handlePageName("Tin Nhắn")}

                        >
                            <i className="fa-solid fa-message"></i>
                            <span>    Tin nhắn</span>
                        </div>
                    </NavLink>
                </div>

                <div className="nav__feature">
                    <div className="nav__feature-element">
                        <i className="fa-solid fa-plus"></i>
                        <span>    Tạo Dự Án</span>
                    </div>
                    <div className="nav__feature-element">
                        <i className="fa-solid fa-plus"></i>
                        <span>    Tạo nhóm chat</span>
                    </div>
                    <div className="nav__feature-element">
                        <i className="fa-solid fa-plus"></i>
                        <span>    Thêm bạn bè</span>
                    </div>
                </div>
            </div>

        </>
    )
}