import MasterLayout from "@/components/layout/MasterLayout";
import Banner from "@/components/sections/Banner";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Webcam from "@/components/sections/Webcam/Webcam";
import Fetch from "@/helper/Fetch";
import React from "react";
const webcamsData = async () => {
  const res = await Fetch("/providers/Webcams");
  const webcams = res?.data?.data?.providers;
  const map = res?.data?.data?.map;
  return { webcams, map };
};
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
