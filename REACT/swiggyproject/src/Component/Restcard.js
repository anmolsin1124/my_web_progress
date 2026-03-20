import Restaurant from "./Resturant";
function RestCard({ restInfo }) {
    return (
        <img src={"" + restInfo.info.cloudinaryImageId}></img>
    )


}