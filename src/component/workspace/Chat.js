import '../../component/chat/chat.scss'

import Space_chat from "../../component/chat/Space_chat"
import Input_chat from "../../component/chat/Input_chat"
import Nav_friend from "../../component/chat/Nav_friend"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { socket } from "../../config/Socketio"
export default function Chat() {



    return (
        <div className="chat__container">
            <Space_chat

            />
            <Input_chat

            />
            <Nav_friend

            />
        </div>
    )
}