import './Myjob.scss'
import Myjob_Card from '../myjob_Card/Myjob_Card'

export default function Myjob() {
    return (
        <>
            <div className="myjob">
                <div className="myjob__header">
                    <div className="myjob__header-title flex-2-mj">
                        <h3>Tên công việc</h3>
                    </div>
                    <div className="myjob__header-project flex-1-mj">
                        <h3>Dự án</h3>
                    </div>
                    <div className="myjob__header-process flex-1-mj">
                        <h3>Tiến trình</h3>
                    </div>
                    <div className="myjob__header-makewith flex-1-mj">
                        <h3>Người thực hiện</h3>
                    </div>
                    <div className="myjob__header-dealine flex-1-mj">
                        <h3>Hạn chót</h3>
                    </div>

                </div>
                <Myjob_Card />
                <Myjob_Card />
                <Myjob_Card />
                <Myjob_Card />
                <Myjob_Card />

            </div>


        </>

    )
}