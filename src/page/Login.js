import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { LoginAction } from "../redux/action/auth"
import { API_REGISTER, API_LOGIN } from "../config/API"
import { ToastAcction } from "../redux/action/toast"
import "./login.scss";
const axios = require('axios');
export default function Login() {

    const [username, setUserName] = useState('');
    const [pass, setPass] = useState('');

    const dispatch = useDispatch();

    const [registerName, setRegisterName] = useState('');
    const [registerPass, setRegisterPass] = useState('');
    const [registerPass2, setRegisterPass2] = useState('');
    const [registerDname, setRegisterDname] = useState('');

    const loginref = useRef();
    const registerref = useRef();

    const [step, setStep] = useState('LOG_IN');

    useEffect(() => {

        if (step === 'REGISTER') {
            loginref.current.style.transform = 'translate(-5%, 0)'
            registerref.current.style.transform = 'translate(-5%, 0)'

        } else {
            loginref.current.style.transform = 'translate(50%, 0)'
            registerref.current.style.transform = 'translate(-50%, 0)'

        }

    }, [step])

    // =================================== Dang ki tai khoan ==================================================
    function handleRegister() {
        if (registerName === "" || registerPass === "" || registerDname === "") {
            dispatch(ToastAcction({ type: "warning", mess: "Bạn hãy nhập đầy đủ thông tin!" }))
        } else if (registerPass !== registerPass2) {
            dispatch(ToastAcction({ type: "warning", mess: "Mật khẩu nhập lại không đúng!" }))
        }
        else {
            const newUser = {
                username: registerName,
                password: registerPass,
                displayName: registerDname,

            }
            axios({
                method: 'post',
                url: API_REGISTER,
                data: newUser,
                withCredentials: true,
            })
                .then(rs => {
                    if (rs.data === "create success") {
                        setRegisterName("")
                        setRegisterPass("")
                        setRegisterPass2("")
                        setRegisterDname("")
                        dispatch(ToastAcction({ type: "success", mess: "Bạn đã tạo tài khoản thành công" }))
                        setStep("LOG_IN")
                    } else {
                        dispatch(ToastAcction({ type: "warning", mess: "Tạo tài khoản thất bại" }))

                    }
                })
                .catch(err => console.error(err))

        }

    }
    // =================================== Dang nhap ==================================================

    function handleLogin() {
        const accout = {
            username: username,
            password: pass
        }
        axios({
            method: 'post',
            url: API_LOGIN,
            data: accout,
            withCredentials: true,
        })
            .then(rs => {
                if (rs.data === "mat khau khong dung") {
                    dispatch(ToastAcction({ type: "warning", mess: "Mật khẩu hoặc Tài khoản không đúng" }))

                } else {
                    dispatch(ToastAcction({ type: "success", mess: "Đăng nhập thành công" }))
                    localStorage.setItem('iduser', rs.data.id);
                    dispatch(LoginAction(rs.data))
                }
            })
            .catch(err => console.log(err))
    }




    return (
        <div className="login_containner">
            <div ref={loginref} className="login__form">
                <div className="login__form-input">
                    <input type="text"
                        value={username}
                        placeholder="Tên đăng nhập ...."
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input type="password"
                        value={pass}
                        placeholder="Mật khẩu ...."
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button
                        onClick={handleLogin}

                    >
                        Đăng nhập
                    </button>
                    <button
                        style={{ "backgroundColor": "#4ed74e" }}
                        onClick={() => setStep("REGISTER")}
                    >
                        Đăng kí
                    </button>
                </div>
            </div>
            {/* Dang ki ==================================*/}
            <div ref={registerref} className="sign__form">
                <i
                    className="fa-solid fa-circle-left sign__form-close"
                    onClick={() => setStep("LOG_IN")}
                ></i>
                <h1>Đăng kí</h1>

                <div className="login__form-input">
                    <input type="text"
                        value={registerName}
                        placeholder="Tên đăng nhập ...."
                        onChange={(e) => setRegisterName(e.target.value)}
                    />
                    <input type="text"
                        value={registerPass}
                        placeholder="Mật khẩu ...."
                        onChange={(e) => setRegisterPass(e.target.value)}
                    />
                    <input type="text"
                        value={registerPass2}
                        placeholder="Nhập lại mật khẩu..."
                        onChange={(e) => setRegisterPass2(e.target.value)}
                    />
                    <input type="text"
                        value={registerDname}
                        placeholder="Tên hiển thị ...."
                        onChange={(e) => setRegisterDname(e.target.value)}
                    />

                    <button
                        style={{ "backgroundColor": "#4ed74e" }}
                        onClick={handleRegister}
                    >
                        Tiếp tục
                    </button>
                </div>
            </div>
            <div className="logo-center">
                <img src="../../../../../../metajob.png" alt="" />
            </div>
            <div className="leftBackground">
                <img src="../../../../../../left_background.png" alt="" />
            </div>
            <div className="rightBackground">
                <img src="../../../../../../right-background.png" alt="" />
            </div>
        </div>
    )
}
