import { useEffect } from "react";
const [restData, setRestData] = useEffect([]);

export default function Restaurant() {

    useEffect(() => {
        async function FetchData() {
            const proxyServer = "";
            const swiggyAPI = "";
            const response = await fetch(proxyServer + swiggyAPI);
            const data = await response.json();
            setRestData(data.data.cards[0].card.card.gridElemnts.infoWithStyle.restaurants);
        }
    }, [])
    return (<>
        {/* <h1>Hello My Anme Is anmol Singh</h1> */}
        <div className="flex flex-wrap w-[80%] mx-auto mt-20">
            {
                restData.map((restInfo) => <RestCard key={restInfo.info.id} restInfo={restInfo}></RestCard>)
            }


        </div>
    </>)
}