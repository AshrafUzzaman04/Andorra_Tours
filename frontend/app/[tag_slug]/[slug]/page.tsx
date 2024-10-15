import MasterLayout from "@/components/layout/MasterLayout";
import Banner from "@/components/sections/Banner";
import ExclusiveService from "@/components/sections/ExclusiveService";
import HotelGrid from "@/components/sections/hotel-grid";
import Fetch from "@/helper/Fetch";
const getData = async (slug:string) =>{
    const res = await Fetch.get("top-hotels/"+slug);
    const hotels = res?.data?.data?.category
    const locationBase = res?.data?.data?.locations_count || []
    const hotelTypeBase = res?.data?.data?.hotel_types_count || [];
    const reviewsBase = res?.data?.data?.reviews_count || [];
    return {hotels, locationBase, hotelTypeBase, reviewsBase} ;
}
export default async function SulgHotes({params}:{params:{slug:string}}) {
    const {hotels, locationBase, hotelTypeBase, reviewsBase} = await getData(params?.slug);
    return (
        <MasterLayout headerStyle={1} footerStyle={5}>
            <HotelGrid hotelData={hotels} slug={params?.slug} locationBase={locationBase} hotelTypeBase={hotelTypeBase} reviewsBase={reviewsBase}/>
            <ExclusiveService/>
            <Banner/>
        </MasterLayout>
    )
}
