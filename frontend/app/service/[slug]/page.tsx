import MultiStepFrom from "@/components/elements/MultiStepFrom";
import MasterLayout from "@/components/layout/MasterLayout";
import Banner from "@/components/sections/Banner";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Fetch from "@/helper/Fetch";
import Link from "next/link";
const getData = async (slug: string) => {
    const res = await Fetch.get("/services/" + slug);
    return res?.data?.data;
}
export default async function Service({ params }: { params: { slug: string } }) {
    const service = await getData(params?.slug);
    const parsedForm = JSON.parse(service?.form?.form || "[]");
    return (
        <MasterLayout>
            <section className="section-box box-banner-hotel-detai-2">
                <div className="box-banner-hotel-detai-2-inner ">
                    <div className="container pt-20 pb-20">
                        <h2 className="color-white mb-20">{service?.service_name}</h2>
                        {/* <h6 className="color-white">{heading?.sub_heading}</h6> */}
                    </div>
                </div>
            </section>
            <MultiStepFrom parsedForm={parsedForm}/>

            <ExclusiveService />

            <Banner/>
        </MasterLayout>
    )
}
