import './App.scss';
import Mainboard from './page/Mainboard'
import Login from './page/Login';
import ToastMessage from "./component/toastMessage/ToastMessage"
import axios from "axios"

import { LogoutAction, LoginAction } from "./redux/action/auth"
import { API_AUTH } from "./config/API"
import './library/lib.js'
import './library/lib.css'
import './library/font_icon/css/all.css'
import { useSelector, useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';



function App() {

	const islogin = useSelector(state => state.auth.login);
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		axios.get(API_AUTH, { withCredentials: true })
			.then(rs => {

				if (rs.data === "auth fail") {
					console.log(rs.data)
					dispatch(LogoutAction(false))
				} else {
					console.log(rs.data)
					dispatch(LoginAction(rs.data))

				}
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<div className="App">
			<ToastMessage />
			{
				islogin
					? <Mainboard />
					: <Login />

			}


		</div>
	);
}

export default App;
