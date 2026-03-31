import { useParams } from "react-router";

export default function GitHub() {
    const { name } = useParams();

    return (
        <div>
            <h1>GitHub Profile</h1>
            <p>Username: {name}</p>
        </div>
    );
}
