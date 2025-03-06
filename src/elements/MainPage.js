import { Link } from "react-router-dom";

export default function MainPage() {
    return (
        <div>
            <h1>MainPage</h1>
            <Link to='/escaping'>Escaping</Link>
            <Link to='/ranking'>Ranking</Link>
            <Link to='/dressing'>Dressing</Link>
        </div>
    )
}