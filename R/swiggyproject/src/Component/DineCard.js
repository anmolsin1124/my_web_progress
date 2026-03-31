export default function DineCard(RestData) {
    return (
        <div className="max-w-sm flex-none ">
            <div className="relative">
                <img className=" w-80 h-50 object-cover" src="www.google.com"></img>
                <p className="absolute bottom-4 left-4">{RestData?.info?.name}</p>
                <p className="absolute bottom-4 left-4"> {RestData?.info?.rating?.value}</p>


            </div>
        </div>
    )
}