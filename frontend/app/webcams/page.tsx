import MasterLayout from "@/components/layout/MasterLayout";
import Banner from "@/components/sections/Banner";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Webcam from "@/components/sections/Webcam/Webcam";
import Fetch from "@/helper/Fetch";
import { Metadata } from "next";
import React from "react";
const webcamsData = async () => {
  const res = await Fetch("/providers/Webcams");
  const webcams = res?.data?.data?.providers || [];
  const map = res?.data?.data?.map;
  return { webcams, map };
};

// const stripHtml = (html: string) => {
//   return html?.replace(/<\/?[^>]+(>|$)/g, "");
// };
// export async function generateMetadata({params}:{params:{slug:string}}): Promise<Metadata> {
// const res = await Fetch.get("/resorts/"+params?.slug);
// const resort = res?.data?.data || [];
// const title = resort?.name ?? ""
// const description = stripHtml(resort?.description) ?? ""
// const image = process.env.NEXT_PUBLIC_STORAGE_URL + resort?.photo
// return {
//     title: title,
//     description: description,
//     keywords:"tours andorra, andorra tours, travel andorra, travel, explore andorra,",
//     openGraph:{
//         title: title,
//         description: description,
//         images: [image],
//         url:"https://andorra-tours.vercel.app/"
//     },
//     twitter:{
//         title: title,
//         description: description,
//         images: [image],
//         card:"summary"
//     }
// }
// }
export default async function Webcams() {
  const { webcams, map } = await webcamsData();
  return (
    <MasterLayout>
      <>
        <main className="main">
          <section className="box-section block-banner-tourlist block-banner-hotel">
            <div className="container z-3">
              <div className="text-center">
                <h3 className="mb-15">Webcams</h3>
                <h6 className="heading-6-medium">Find you station</h6>
              </div>
            </div>
          </section>
          <section className="box-section block-content-tourlist background-body">
            <div className="container">
              <div className="box-content-main pt-40">
                <div className="content-right">
                  <div className="box-grid-tours wow fadeIn">
                    <div className="row">
                      <Webcam webcamsData={webcams} map={map} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <ExclusiveService/>
        <Banner/>
      </>
    </MasterLayout>
  );
}
