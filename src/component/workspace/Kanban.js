import './kanban.scss'
import Colum from '../Colum/Colum';
import { useRef, useEffect } from 'react'
export default function Kanban({ boo }) {

    const colums = [
        {
            id: '1',
            cards: [
                {
                    title: 'Làm Poster',
                    id: '#1',
                    users: [
                        {
                            name: 'Từ Tích Thiện',
                            img: '../../../../../../../avatar.jpg'
                        },
                        {
                            name: 'Võ Quang Huy',
                            img: '../../../../../../../avatar.jpg'
                        },
                        {
                            name: 'Võ Quang Huy',
                            img: '../../../../../../../avatar.jpg'
                        },

                    ],
                    property: [
                        'Gấp',
                        'Đã Cọc'
                    ]
                }
            ]
        },
        {
            id: '2',
            cards: [
                {
                    title: 'Làm logo cho khách',
                    id: '#3',
                    users: [
                        {
                            name: 'Thiện Tích Từ',
                            img: '../../../../../../../avatar.jpg'
                        }
                    ],
                    property: [
                        'Gấp',
                        'Làm lại'
                    ]
                },
            ],

        },

    ]


    return (
        <>
            <div className="workspace">
                <div className="content">
                    {
                        colums.map(colum => <Colum
                            key={colum.id}
                            card={colum.cards}
                        />)
                    }
                    <div className="addProcess">
                        <span>
                            Thêm công việc
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}