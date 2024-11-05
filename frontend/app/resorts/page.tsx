"use server"
import MasterLayout from "@/components/layout/MasterLayout"
import Banner from "@/components/sections/Banner"
import ExclusiveService from "@/components/sections/ExclusiveService"
import ResortsClient from "@/components/sections/Resorts/ResortsClient"
import ResortsCard from "@/components/sections/Resorts/RsortsCard"
import Fetch from "@/helper/Fetch"
import { Metadata } from "next"
async function ResortData(){
  const res = await Fetch("/providers/Resorts");
  const resorts = res?.data?.data?.providers || [];
  const map = res?.data?.data?.map;
  return { resorts, map };
}
// export async function generateMetadata({params}:{params:{slug:string}}): Promise<Metadata> {
//   const res = await Fetch.get("top-hotels/"+params?.slug);
//   const hotels = res?.data?.data?.category|| [];
//   const title = hotels?.title ?? ""
//   const description = hotels?.sub_title ?? ""
//   const image = process.env.NEXT_PUBLIC_STORAGE_URL + hotels?.image
//   return {
//       title: title,
//       description: description,
//       keywords:"tours andorra, andorra tours, travel andorra, travel, explore andorra,",
//       openGraph:{
//           title: title,
//           description: description,
//           images: [image],
//           url:"https://andorra-tours.vercel.app/"
//       },
//       twitter:{
//           title: title,
//           description: description,
//           images: [image],
//           card:"summary"
//       }
//   }
// }
export default async function Resorts() {
  const { resorts, map } = await ResortData();
  return (
    <MasterLayout>
        <>
        <main className="main">
          <section className="box-section block-banner-tourlist block-banner-hotel">
            <div className="container z-3">
              <div className="text-center">
                <h3 className="mb-15">Find  your station</h3>
                {/* <h6 className="heading-6-medium">Find you station</h6> */}
              </div>
            </div>
          </section>
          <section className="box-section block-content-tourlist background-body">
            <div className="container">
              <div className="box-content-main pt-40">
                <div className="content-right">
                  <div className="box-grid-tours wow fadeIn">
                    <div className="row">
                      <ResortsClient resorts={resorts} map={map}/>
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
  )
}
