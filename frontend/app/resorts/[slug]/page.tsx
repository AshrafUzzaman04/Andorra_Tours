"use server"

import MasterLayout from "@/components/layout/MasterLayout"
import Fetch from "@/helper/Fetch"
import parse from 'html-react-parser';
import { Mountain, ArrowUp } from 'lucide-react'
import { Metadata } from "next";
async function getSlugData(slug: string) {
    const res = await Fetch("/resorts/" + slug);
    const resort = res?.data?.data;
    return resort;
}
const stripHtml = (html: string) => {
    return html?.replace(/<\/?[^>]+(>|$)/g, "");
};
export async function generateMetadata({params}:{params:{slug:string}}): Promise<Metadata> {
  const res = await Fetch.get("/resorts/"+params?.slug);
  const resort = res?.data?.data || [];
  const title = resort?.name ?? ""
  const description = stripHtml(resort?.description) ?? ""
  const image = process.env.NEXT_PUBLIC_STORAGE_URL + resort?.photo
  return {
      title: title,
      description: description,
      keywords:"tours andorra, andorra tours, travel andorra, travel, explore andorra,",
      openGraph:{
          title: title,
          description: description,
          images: [image],
          url:"https://andorra-tours.vercel.app/"
      },
      twitter:{
          title: title,
          description: description,
          images: [image],
          card:"summary"
      }
  }
}
export default async function SlugBaseResort({ params }: { params: { slug: string } }) {
    const resort = await getSlugData(params.slug);
    return (
        <MasterLayout>
            <>
                <main className="main">
                    <section className="box-section block-banner-tourlist block-banner-hotel" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_STORAGE_URL + resort?.photo})` }}>
                        <div className="container z-3">
                            <div className="text-center">
                                <h3 className="mb-15 text-uppercase">{resort?.name}</h3>
                            </div>
                        </div>
                    </section>
                    <section className="box-section block-content-tourlist background-body">
                        <div className="container">
                            <div className="box-content-main pt-40">
                                <div className="content-right">
                                    <div className="box-grid-tours wow fadeIn">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h6 className="heading-6-medium neutral-1000 fw-bold">
                                                    {
                                                        resort?.details_title !== null ? resort.details_title : "Alquiler de esquí " + params?.slug
                                                    }
                                                </h6>

                                                <div className="neutral-1000 mt-20 resort-description">
                                                    {
                                                        parse(resort?.description)
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-4">

                                                <div className="card pricing-card p-4 rounded-lg shadow-sm">
                                                    <div className="text-center mb-4">
                                                        <img className="img-fluid w-25" src="/assets/imgs/mountain.png"/>
                                                        <p className="neutral-1000 text-md fw-bold">Altura</p>
                                                        <p className="text-muted text-md">{resort?.height}</p>
                                                    </div>

                                                    {(resort?.alpine_skiing !== "null" || null) &&<div className="text-center mb-4">
                                                        <img className=" img-fluid w-25" src="/assets/imgs/alpine.png"/>
                                                        {/* <Ski className="icon mb-2" /> */}
                                                        <p className="neutral-1000 text-md fw-bold">ESQUÍ ALPINO</p>
                                                        <p className="text-muted text-md">{resort?.alpine_skiing}</p>
                                                    </div>}

                                                    {(resort?.ski_lifts !== "null" || null) &&<div className="text-center mb-4">
                                                        <img className=" img-fluid w-25" src="/assets/imgs/skiing.png"/>
                                                        <p className="neutral-1000 text-md fw-bold">REMONTES MECÁNICOS</p>
                                                        <p className="text-muted text-md">{resort?.ski_lifts}</p>
                                                    </div>}

                                                    {(resort?.clues !== "null" || null) && <div className="text-center pistas-section">
                                                        <p className="neutral-1000 text-md fw-bold">PISTAS</p>
                                                        <p className="text-muted text-md">{resort?.clues}</p>
                                                    </div>}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        </MasterLayout>

    )
}
