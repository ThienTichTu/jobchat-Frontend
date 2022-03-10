import { useState, useEffect } from "react"
import axios from "axios"
import { API_GET_FRIEND, API_CREATE_PROJECT } from '../../config/API'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { ToastAcction } from "../../redux/action/toast"

import _ from "lodash"
export default function AddProject({ active, handleSetToggle }) {
    const dispatch = useDispatch()

    const userManager = useSelector(state => state.auth.user)

    const [nameProject, setNameProject] = useState("")

    const [listFriend, setListFriend] = useState([])

    const [listMember, setListMember] = useState([])

    useEffect(() => {
        console.log(active)
        if (active) {
            axios
                .get(API_GET_FRIEND, { withCredentials: true })
                .then((rs) => {
                    setListFriend(rs.data)
                })
                .catch((error) => console.log(error))
        }
        setListMember([{
            displayName: userManager.displayName,
            avatar: userManager.avatar,
            id: userManager.id,
            role: "Quản trị viên"
        }])
        return () => {
            setListFriend([])
        }
    }, [active])

    const handleSetMember = (user) => {
        if (!_.find(listMember, { id: user.id })) {
            setListMember([
                ...listMember,
                {
                    displayName: user.displayName,
                    avatar: user.avatar,
                    id: user.id,
                    role: "Thành viên"
                }
            ])
        }
    }

    const handleRemoveMember = (user, index) => {
        listMember.splice(index, 1)
        setListMember([...listMember])
    }

    const handleSetRole = (member, index) => {
        const newRole = member.role === "Quản trị viên" ? "Thành viên" : "Quản trị viên"
        const newMember = {
            ...member,
            role: newRole
        }
        listMember.splice(index, 1, newMember)
        setListMember([...listMember])
    }

    const handleCreateProject = () => {
        const newListMember = listMember.map((member) => {
            return {
                id: member.id,
                role: member.role
            }
        })
        const newProject = {
            name: nameProject,
            member: newListMember
        }
        axios({
            method: 'POST',
            url: API_CREATE_PROJECT,
            data: newProject,
            withCredentials: true,
        })
            .then(rs => {
                if (rs.data === "create success") {
                    dispatch(ToastAcction({ type: "success", mess: "Bạn đã tạo dự án thành công" }))
                    handleSetToggle("Dự án của bạn")
                }
            })
            .catch((err) => console(err))
    }

    return (
        <>
            <div className="add_project-name">
                <span>
                    Tên dự án :
                </span>
                <input
                    type="text"
                    value={nameProject}
                    onChange={(e) => setNameProject(e.target.value)}
                />
            </div>
            <div className="add_project-member">
                <span>
                    Thành viên của dự án :
                </span>
                <div className="member-container">
                    <div className="member-list-choose">
                        {
                            listMember.map((member, index) => (
                                <div
                                    key={index} className="member-item-choose"
                                    onClick={(e) => {

                                        if (index !== 0) {
                                            return handleRemoveMember(member, index)
                                        }
                                    }}
                                >
                                    <div className="member-item-avatar">
                                        <img src={member.avatar} alt="" />
                                    </div>
                                    <span className="member-item-name">
                                        {member.displayName}
                                    </span>
                                    <span
                                        className="member-item-role"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            if (index !== 0)
                                                handleSetRole(member, index)
                                        }
                                        }
                                    >
                                        {member.role}
                                    </span>

                                </div>

                            ))
                        }


                    </div>
                    <div className="member-list-friend">
                        {
                            listFriend.map((item, index) => (
                                <div
                                    key={index} className="member-item-friend"
                                    onClick={() => handleSetMember(item)}
                                >
                                    <div className="member-item-avatar">
                                        <img src={item.avatar} alt="" />
                                    </div>
                                    <span className="member-item-name">
                                        {item.displayName}
                                    </span>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
            <div
                className="add_project-footer"
                onClick={handleCreateProject}
            >
                <span>
                    Tạo dự án
                </span>
            </div>
        </>
    )

}