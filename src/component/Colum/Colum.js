import './Colum.scss'
import Card from '../Card/Card'
export default function Colum({ card }) {
    return (

        <>
            <div className="kanban__colum">
                <div className="kanban__colum-header">
                    <h2>Công Việc</h2>
                    <div className="colum__add">
                        <div className="add-warper">
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="kanban__colum-body">
                    {
                        card.map((item, index) => <Card
                            key={index}
                            card={item}
                        />)
                    }
                </div>

            </div>
        </>
    )
}