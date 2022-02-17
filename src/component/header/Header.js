import './header.scss'
import Kanban from '../workspace/Kanban'
export default function Header({ handleBar, bar, stay }) {
    const setbar = handleBar;
    const barBoo = bar;
    const charState = stay;
    return (
        <>
            <div className="header">
                <div className="header__title">
                    {
                        barBoo ?
                            <div className="header__bar">
                                <i
                                    className="fa-solid fa-bars"
                                    onClick={setbar}
                                ></i>
                            </div>
                            : barBoo
                    }
                    <h2>{charState}</h2>
                </div>
                <div className="header__option">
                    <div className="header__option-search">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Tìm kiếm ...."
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="header__option-mess">
                        <i className="fa-solid fa-bell"></i>
                    </div>
                    <div className="header__option-avatar">
                        <img src="../../../../../../../avatar.jpg" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}