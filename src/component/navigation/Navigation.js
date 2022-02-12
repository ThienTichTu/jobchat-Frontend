import './Navigation.scss'
import Header from '../header/Header.js'
import { useState, useRef, useEffect } from 'react'
export default function Navigation() {
    const barDom = useRef();
    const [bar, setBar] = useState(false);
    const [stay, setStay] = useState('Trang chủ');

    function handleBar() {
        setBar(!bar);
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
                    <div
                        className="nav__element active"
                        onClick={() => setStay("Trang chủ")}

                    >
                        <i className="fa-solid fa-house"></i>
                        <span>    Trang Chủ</span>
                    </div>
                    <div
                        className="nav__element"
                        onClick={() => setStay("Công việc của tôi")}
                    >
                        <i className="fa-solid fa-circle-check"></i>
                        <span>    Công việc của tôi</span>
                    </div>
                    <div
                        className="nav__element"
                        onClick={() => setStay(" Tin nhắn")}
                    >
                        <i className="fa-solid fa-message"></i>
                        <span>    Tin nhắn</span>
                    </div>
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
            <Header
                handleBar={handleBar}
                bar={bar}
                stay={stay}
            />
        </>
    )
}