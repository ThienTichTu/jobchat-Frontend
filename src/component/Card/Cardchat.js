

export default function Cardchat() {

    return (
        <>

            <div className="Cardchat__container">
                <h5>Chat </h5>
            </div>
            <div style={{
                "display": "flex",
                "alignItem": "center"
            }}>
                <input type="text" placeholder="chat..." className="Cardchat__input" />
                <div className="Cardchat__send">
                    <i className="fas fa-caret-square-right"></i>
                </div>
            </div>
        </>
    )
}