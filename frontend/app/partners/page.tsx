import MasterLayout from "@/components/layout/MasterLayout";
import Banner from "@/components/sections/Banner";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Partners from "@/components/sections/Partners/Partners";
import Fetch from "@/helper/Fetch";
const pageData = async () => {
  const res = await Fetch.get("promotion-partners");
  const partners = res?.data?.data;
  return partners;
};
export default async function Page() {
  const partners = await pageData();
  return (
    <MasterLayout>
      <>
        <main className="main">
          <section className="box-section block-banner-tourlist block-banner-hotel">
            <div className="container z-3">
              <div className="text-center">
                <h3 className="mb-15">PARTNERS</h3>
                <h6 className="heading-6-medium">Choose your package</h6>
              </div>
            </div>
          </section>

          <section className="box-section block-content-tourlist background-body">
            <div className="container">
              <div className="box-content-main pt-40">
                <div className="content-right">
                  <div className="box-grid-tours wow fadeIn">
                    <div className="row">
                      <Partners partners={partners} />
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
