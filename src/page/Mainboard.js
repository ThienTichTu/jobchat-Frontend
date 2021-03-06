import { react, useState, useRef, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navigation from '../component/navigation/Navigation'
import Header from '../component/header/Header'
import Kanban from '../component/workspace/Kanban'
import Myjob from '../component/workspace/Myjob'
import Chat from '../component/workspace/Chat'
import Profile from '../component/workspace/Profile'
import ProjectManager from '../component/projectManager/ProjectManager'
import Card_detail from '../component/Cardetail/Card_detail'
import ToastDelete from "../component/toastMessage/ToastDelete"
import Card_detail_update from "../component/Cardetail/Card_detail_update"
import { socket } from '../config/Socketio'
import { useSelector } from 'react-redux';


export default function Mainboard() {


    const idUser = useSelector(state => state.auth.user);

    const activeBtn = useSelector(state => state.Effect.btn_ActiveNav);
    const barsub = useRef();

    useEffect(() => {
        socket.emit("idClient_Connect", idUser)
    }, [])



    useEffect(() => {
        if (activeBtn) {
            barsub.current.style.marginLeft = '0';

        } else {
            barsub.current.style.marginLeft = '300px';
        }
    }, [activeBtn])
    return (
        <>
            <Router >
                <div>
                    <ToastDelete />
                    <Header />
                    <Navigation />
                    <Card_detail_update />
                    <Card_detail />
                    <ProjectManager />

                    <div ref={barsub} className='barsub_ef'>
                        <Switch>
                            {/* <Route path="/" exact>
                                <Kanban

                                />
                            </Route> */}
                            <Route path="/kanban/:id" exact>
                                <Kanban
                                />
                            </Route>
                            <Route path="/chat" exact >
                                <Chat

                                />
                            </Route>
                            <Route path="/myjob" exact>
                                <Myjob

                                />
                            </Route>
                            <Route path="/canhan" exact>
                                <Profile
                                />
                            </Route>
                        </Switch>
                    </div>

                </div>

            </Router>
        </>

    )
}