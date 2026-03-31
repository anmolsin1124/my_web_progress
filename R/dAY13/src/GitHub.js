import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
export default function GitHub() {
    const data = useParams();
    const [user, setUser] = useState(null);
    console.log(data);
    async function fetchuser(params) {
        const response = await fetch(`https://api.github.com/${data}`)
        const result = await response.json();
        setUser(result);
        // console.log(result);
    }
    useEffect(() => {
        fetchuser();
    }, [])

    return (
        <> <h1>I am  GitHub</h1>
            <div>
                <img src={user.avatar_url}></img>
                <h2>{user.login}</h2>

            </div>
        </>


    )
}