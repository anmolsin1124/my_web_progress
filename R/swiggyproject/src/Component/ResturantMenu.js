import React, { use, useEffect, useState } from "react";
import ReactDOM from 'react-dom/client'
import MenuCard from "./MenuCard";
const [RestData, setRestData] = useState(null);
useEffect(() => {
    async function fetchData() {
        const ProxyServer = "";
        const SweggyAPI = "";
        const response = await fetch(ProxyServer + SweggyAPI);
        const data = await response.json();
        const tempData = data?.data.card[5].groupCard.cardGroupMAp.REGULAR.cards;
        const filterData = tempData.filter((items) => "tittle" in items.card.card);
        setRestData(filterData);



    }
    fetchData();
}, [])
return (
    <div className="">
        {
            RestData.map((menuItem) => <MenuCard key={menuItem.card.card.tiitle} menuItem={menuItem?.card?.card?.card} ></MenuCard>)
        }
    </div>
)


