import Fetch from "@/helper/Fetch";
import style from "@/public/assets/css/SkiRentalDesc.module.css";
// import parse from 'html-react-parser';


const getDescData = async () => {
const res = await Fetch("/category/ski-rental/details");
const details = res?.data?.data; // Accessing details correctly
return {details};
};

export default async function SkiRentalDesc() {
  const {details} = await getDescData();

  return (
    <>
      <section
        className="container py-3 py-md-4 background-100"
        style={{ color: "#7a7a7a", fontSize: "15px" }}
      >
        {/* { parse(details?.category_desc)} */}
      {details ? (
        <div className={style['ski-rental-desc']} dangerouslySetInnerHTML={{ __html: details?.category_desc }} />
      ) : (
        <p>No details found.</p>
        )}
      </section>
    </>
  );
}
