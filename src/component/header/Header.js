import './header.scss'

export default function Header({ handleBar, bar, stay }) {
    const setbar = handleBar;
    const barBoo = bar;
    const charState = stay;
    return (
        <>
            <div className="header">
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
                <h3>{charState}</h3>
            </div>
        </>
    )
}