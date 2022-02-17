import { useRef, useEffect } from "react"
import Cardchat from './Cardchat'
import './card.scss'
export default function Card_detail({ boo, card, handleCard_detail }) {
    const cardetail = useRef();
    useEffect(() => {
        if (boo) {
            cardetail.current.style.transform = 'translateX(0px)';
            cardetail.current.style.zIndex = '10000';

        } else {
            cardetail.current.style.transform = 'translateX(500px)';
        }
    }, [boo])
    return (

        <div ref={cardetail} className="card__detail">
            <div className="card__detail-header">
                <h2>{card.id}</h2>
                <h2>{card.title}</h2>
                <div
                    onClick={handleCard_detail}
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
                    >Free Land </span>
                </div>
                <div className="card__detail-listuser">
                    <h4>Người thực hiện:</h4>
                    {card.users.map((user, index) =>
                        <div key={index} className='card__detail-listuser-item'>
                            <i className="fa-solid fa-user"></i>
                            <span>{user.name}</span>
                        </div>
                    )
                    }
                </div>
                <div className="card__detail-property">
                    {
                        card.property.map((element, index) => (
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