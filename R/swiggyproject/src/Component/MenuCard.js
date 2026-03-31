export default function MenuCard(menuItems) {

    return (
        <div className="">
            <p>{menuItems.title}</p>
            <div>
                {
                    menuItems.itemCard.map((items) => <RestInfo key={items.card.info.id} restData={items.card.info}></RestInfo>)

                }
            </div>
        </div>

    )
}