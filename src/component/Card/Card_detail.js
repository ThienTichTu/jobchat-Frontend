import { useRef, useEffect } from "react"
import Cardchat from './Cardchat'
import { useSelector, useDispatch } from 'react-redux';
import { closeDetail } from '../../action/card_detail_action';

import './card.scss'
export default function Card_detail({ boo, card }) {
    const cardetail = useRef();
    const data = useSelector(state => state.Card);
    const dispatch = useDispatch();

    const handleCloseCard = () => {
        const action = closeDetail(card);
        dispatch(action);
    }

    useEffect(() => {
        if (data.active) {
            cardetail.current.style.marginRight = '500px';
            cardetail.current.style.zIndex = '10000';
        } else {
            cardetail.current.style.marginRight = '0px';

        }
    }, [data.active])


    return (

        <div ref={cardetail} className="card__detail">
            <div className="card__detail-header">
                <h2>{data.card.id}</h2>
                <h2>{data.card.title}</h2>
                <div
                    onClick={handleCloseCard}
                    className="card__detail-close"
                >
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="card__detail-body">
                <div className="card__detail-project">
                    <span>Dự án: </span>
                    <span
                        className="project-name"
                    >
                        {data.card.project}
                    </span>
                </div>
                <div className="card__detail-listuser">
                    <h4>Người thực hiện:</h4>
                    {data.card.users.map((user, index) =>
                        <div key={index} className='card__detail-listuser-item'>
                            <i className="fa-solid fa-user"></i>
                            <span>{user.name}</span>
                        </div>
                    )
                    }
                </div>
                <div className="card__detail-property">
                    {
                        data.card.property.map((element, index) => (
                            <div key={index} className="property-tag-item">
                                <span>{element}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="card__detail-columTilte">
                    <i className="fas fa-angle-double-left"></i>
                    <input className="namecolum" type="text"
                        value='Công việc 1'
                    />
                    <i className="fas fa-angle-double-right"></i>

                </div>
                <div className="card__detail-chitiet">
                    <h5>Chi tiết công việc:</h5>
                    <textarea
                        name="detail" id="detail" cols="30" rows="10"
                        placeholder='Chi tiết công việc...'
                    >
                    </textarea>
                </div>
                <Cardchat />
            </div>
        </div >
    )
}