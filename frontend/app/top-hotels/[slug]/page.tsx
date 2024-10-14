import MasterLayout from "@/components/layout/MasterLayout";
import CategoryWiseHotels from "@/components/sections/CategoryWiseHotels";

export default function TopHotels({params}:{params:{slug:string}}) {
    return (
        <MasterLayout headerStyle={1} footerStyle={5}>
            <CategoryWiseHotels />
        </MasterLayout>
    )
}
