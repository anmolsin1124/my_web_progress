import { useEffect, useState } from "react";
function Body() {
    const [Profile, setProfile] = useState([]);
    async function generateProfile(count) {
        const since = Math.floor(Math.random() * 10000);
        try {
            const response = await fetch(`https://api.github.com/users?since=${since}&per_page=${count}`);
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }
    ////add acroding to seach name or id create it

    useEffect(() => {
        generateProfile(10);
    }, [])
    const [numerofprofile, setNumerofprofile] = useState('');
    return (
        <div className="but">

            <input type="text" className="inpu" placeholder="Enter User Name Or ID" value={numerofprofile} onChange={(e) => setNumerofprofile(e.target.value)}></input>
            <button className="butt" onClick={() => generateProfile(Number(numerofprofile))}> Search Profile</button>
            <div>
                {Profile.map((value) => {
                    return (
                        <div className="card" key={value.id}>
                            <img src={value.avatar_url} alt="avatar" />
                            <h3>{value.login}</h3>
                            <a href={value.html_url} target="_blank" rel="noopener noreferrer">
                                View Profile
                            </a>
                        </div>
                    );
                })}
            </div>
        </div >
    )
}
export default Body;