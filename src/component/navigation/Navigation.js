import './Navigation.scss'
import Header from '../header/Header.js'
import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
export default function Navigation({ handleStay, handleBoo, boo }) {
    const barDom = useRef();
    const barsub = useRef();
    const [bar, setBar] = useState(false);
    const [stay, setStay] = useState('Trang chủ');

    function handleBar() {
        setBar(!bar);
        handleBoo(bar)
    }
    if (boo !== bar) {
        setBar(boo);
    }

    useEffect(() => {
        if (bar) {
            barDom.current.style.marginLeft = '-300px';

        } else {
            barDom.current.style.marginLeft = '0';

        }
    }, [bar])

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
                            onClick={() => handleStay("Cá nhân")}

                        >
                            <i className="fa-solid fa-house"></i>
                            <span>    Cá nhân</span>
                        </div>
                    </NavLink>
                    <NavLink to="/kanban">
                        <div
                            className="nav__element"
                            onClick={() => handleStay("Tiến Trình")}

                        >
                            <i className="fa-solid fa-house"></i>
                            <span>    Tiến Trình</span>
                        </div>
                    </NavLink>

                    <NavLink to="/myjob" >
                        <div
                            className="nav__element"
                            onClick={() => handleStay("Công việc của tôi")}
                        >
                            <i className="fa-solid fa-circle-check"></i>
                            <span>    Công việc của tôi</span>
                        </div>
                    </NavLink>
                    <NavLink to='/chat'>
                        <div
                            className="nav__element"
                            onClick={() => handleStay(" Tin nhắn")}
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