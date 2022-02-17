import { useRef, useState } from 'react';
import './card.scss'
import Card_detail from './Card_detail';
export default function Card({ card }) {
    const [cardTogle, setCardTogle] = useState(false)
    function handleCard_detail() {
        setCardTogle(!cardTogle)
    }
    return (

        <>
            <div className="card">
                <div className="card-id">
                    <span>{card.id}</span>
                    <div>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                </div>
                <div className="card-title">
                    <span
                        onClick={handleCard_detail}
                    >
                        {card.title}
                    </span>
                </div>
                <div className="card-tag">
                    {
                        card.users.map((user, index) => (
                            <div key={index} className="card-tag-item">
                                <div className="card-tag-user">
                                    <img src={user.img} alt="" />
                                </div>
                                <span>{user.name}</span>
                            </div>
                        ))
                    }

                    <div className="card-tag-property">
                        {
                            card.property.map((element, index) => (
                                <div key={index} className="property-item">
                                    <span>{element}</span>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className="card-footer">
                    <span>Thứ 2 14/2</span>
                </div>
            </div>
            {
                cardTogle && <Card_detail
                    card={card}
                    boo={cardTogle}
                    handleCard_detail={handleCard_detail}
                />
            }
        </>
    )
}