import MasterLayout from "@/components/layout/MasterLayout";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Winter from "@/components/sections/Winter";
import Fetch from "@/helper/Fetch";

const getData = async () =>{
    const res = await Fetch.get("/inverano");
    const inverano = res?.data?.data;
    const heading = res?.data?.heading;
    return {inverano, heading}
    
}
export default async function Inverano() {
    const {inverano, heading} = await getData();
    return (
        <MasterLayout>
            <section className="section-box box-banner-hotel-detai-2">
                <div className="box-banner-hotel-detai-2-inner ">
                    <div className="container pt-20 pb-20">
                        <h2 className="color-white mb-20">{heading?.heading}</h2>
                        <h6 className="color-white">{heading?.sub_heading}</h6>
                    </div>
                </div>
            </section>
            <Winter iveranoData={inverano}/>
            <ExclusiveService/>
        </MasterLayout>
    )
}
