import { useEffect } from "react";
import { FetchData } from "./Slicer1";
import { useDispatch, useSelector } from "react-redux";
import CoinCard from "./CoinCard";
export default function CoinCreate() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.Slice1);
    useEffect(() => {
        dispatch(FetchData(20));
    }, [dispatch]);
    if (loading) {
        return (<h1>Data is  Loading</h1>)

    }
    if (error) {
        return (<h1>Data Is Occurred</h1>)
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <h1>Data is Successfully Fetched</h1>
            {data.map((value) => (<CoinCard key={value.id} coin={value}></CoinCard>))}
        </div>
    )
}