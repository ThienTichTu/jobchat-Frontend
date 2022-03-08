import './App.scss';
import Mainboard from './page/Mainboard'
import Login from './page/Login';
import PreviewImg from "./component/PreviewImg/PreviewImg"
import ToastMessage from "./component/toastMessage/ToastMessage"
import AddFriend from './component/addFriend/AddFriend';
import MessSocket from './component/messSocket/MessSocket'
import ProjectManager from './component/projectManager/ProjectManager'
import axios from "axios"

import { LogoutAction, LoginAction } from "./redux/action/auth"
import { increaseMess } from "./redux/action/globalState"
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

					dispatch(LogoutAction(false))
				} else {

					dispatch(LoginAction(rs.data))

					const Message = [...rs.data.Message]
					const messcout = Message.reduce((init, curentValue) => {
						if (curentValue.state === "chua xem") {
							return init + 1
						} else {
							return init
						}
					}, 0)
					dispatch(increaseMess(messcout))
				}
			})
			.catch(err => console.log(err))
	}, [islogin])

	return (
		<div className="App">
			<MessSocket />
			<AddFriend />
			<ToastMessage />
			<PreviewImg />
			<ProjectManager />
			{
				islogin
					? <Mainboard />
					: <Login />

			}


		</div>
	);
}

export default App;
