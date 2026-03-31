export default function RestInfo({ restData }) {
    return (
        <div className="felx justify-between w-full">
            <div className="w-[70%]">
                <p>{restData.name}</p>
                <p>{restData.defaultPrice}</p>
                <span>{restData.ratings.aggregatedrating.rating}</span>
                <span>{"(" + restData.ratings.aggregatedrating.ratingCountV2 + ")"}</span>
                <p>
                    {restData.description}
                </p>

            </div>
            <div className="w-[70%]">
                <img className="flex"></img>
                <button className="relative"> Add</button>
            </div>

        </div>
    )
}