import { useRef, useState } from 'react';
import './card.scss'
import Card_detail from './Card_detail';
import { useDispatch } from 'react-redux';
import { showDetail } from '../../action/card_detail_action';
export default function Card({ card }) {
    const dispatch = useDispatch();

    const handleActiveCard = () => {
        const action = showDetail(card);
        dispatch(action);
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
                        onClick={handleActiveCard}
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
        </>
    )
}