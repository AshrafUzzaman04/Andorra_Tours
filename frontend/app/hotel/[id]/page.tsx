import HotelDetail2 from "@/app/hotel-detail-2/page";
import MasterLayout from "@/components/layout/MasterLayout";

export default function HotelDetails(){
    return (
        <MasterLayout headerStyle={1} footerStyle={5}>
            <HotelDetail2/>
        </MasterLayout>
    )
}