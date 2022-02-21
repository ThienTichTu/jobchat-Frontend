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
import Card_detail from '../component/Card/Card_detail'

export default function Mainboard() {


    const [stay, setStay] = useState('Trang chủ');

    const [boo, setBoo] = useState(false);
    const barsub = useRef();
    function handleStay(char) {
        setStay(char)
    }

    function handleBoo(char) {
        setBoo(!char);
    }


    useEffect(() => {
        if (boo) {
            barsub.current.style.marginLeft = '0';

        } else {
            barsub.current.style.marginLeft = '300px';
        }
    }, [boo])
    return (
        <>
            <Router >
                <div>
                    <Header
                        stay={stay}
                        bar={boo}
                        handleBar={handleBoo}
                    />
                    <Navigation
                        handleStay={handleStay}
                        handleBoo={handleBoo}
                        boo={boo}
                    />

                    <div ref={barsub} className='barsub_ef'>
                        <Switch>
                            <Route path="/" exact>
                                <Kanban
                                    boo={boo}
                                />
                            </Route>
                            <Route path="/kanban">
                                <Kanban
                                    boo={boo}
                                />
                            </Route>
                            <Route path="/chat" >
                                <Chat
                                    boo={boo}
                                />
                            </Route>
                            <Route path="/myjob">
                                <Myjob
                                    boo={boo}
                                />
                            </Route>
                            <Route path="/canhan" >
                                <Profile
                                    boo={boo}
                                />
                            </Route>
                        </Switch>
                    </div>
                    <Card_detail />
                </div>



            </Router>
        </>

    )
}