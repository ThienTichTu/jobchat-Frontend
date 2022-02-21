import './myjob_card.scss';
export default function Myjob_Card() {

    return (
        <>
            <div className="myjob__card">
                <div className="flex-2-mj">
                    <span>Tiêu đề</span>
                </div>
                <div className="flex-1-mj">
                    <span>Dự án</span>
                </div>
                <div className="flex-1-mj">
                    <span>Tiến trình</span>
                </div>
                <div className="flex-1-mj">
                    <span>Người thực hiện</span>
                </div>
                <div className="flex-1-mj">
                    <span>Hạn chót</span>
                </div>
            </div>

        </>
    )
}