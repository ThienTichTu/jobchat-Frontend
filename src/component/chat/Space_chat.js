export default function Space_chat() {

    return (
        <div className="space_chat">
            <div
                style={{
                    "alignSelf": "end",
                }}
                className="space_chat-item"
            >
                <span className="space_chat-me">
                    Tell me about your self
                </span>
            </div>
            <div
                style={{ "alignSelf": "start" }}
                className="space_chat-item"
            >
                <span className="space_chat-friend">
                    hello
                </span>
            </div>

        </div>
    )
}