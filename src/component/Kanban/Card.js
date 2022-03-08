
export default function Card({ data }) {

    return (
        <div className="Kanban-card">
            <h1>{data.content}</h1>
        </div>

    )

}