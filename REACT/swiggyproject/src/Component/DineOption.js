import { dineoutRestaurants } from './Utils/DineData'
import DineCard from './DineCard'
export default function DineOption() {
    return (
        <div className="w-[80%] mx-auto mt-20">
            <p className='text-bold  text-2xl font-serif'>Discover best resturant on DineOut</p>
            <div className=" flex flex-nowrap overflow-x-auto mt-5 gap-4 mb-20"></div>
            {
                dineoutRestaurants.map((RestData) => <DineCard key={RestData?.info?.id} RestData={RestData}></DineCard>)
            }
        </div>

    )
}