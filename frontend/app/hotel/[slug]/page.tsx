import HotelDetail2 from "@/app/hotel-detail-2/page";
import MasterLayout from "@/components/layout/MasterLayout";
import CategoryWiseHotels from "@/components/sections/CategoryWiseHotels";

export default function HotelDetails(){
    return (
        <MasterLayout headerStyle={1} footerStyle={5}>
            <CategoryWiseHotels/>
        </MasterLayout>
    )
}