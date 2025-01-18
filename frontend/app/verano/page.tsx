import MasterLayout from "@/components/layout/MasterLayout";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Summer from "@/components/sections/Summer";
import Fetch from "@/helper/Fetch";

const getVeranoData = async () => {
  const res = await Fetch.get("/verano");
  const veranoData = res?.data?.data;
  const heading = res?.data?.heading;
  return { veranoData, heading };
};
export default async function Verano() {
  const { veranoData, heading } = await getVeranoData();
  return (
    <MasterLayout>
      <section className="section-box box-banner-hotel-detai-2">
        <div className="box-banner-hotel-detai-2-inner ">
          <div className="container pt-20 pb-20">
            <h2 className="mb-20 color-white">{heading?.heading}</h2>
            <h6 className="color-white">{heading?.sub_heading}</h6>
          </div>
        </div>
      </section>
      <Summer veranoData={veranoData} />
      <ExclusiveService />
    </MasterLayout>
  );
}
