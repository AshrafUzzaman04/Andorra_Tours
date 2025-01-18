import { ChevronDown } from "lucide-react";

export default function SkiRentalHeroBanner() {
  return (
    <>
      <section
        className="text-white position-relative bg-dark"
        style={{
          minHeight: "100px",
          background:
            "url('/assets/imgs/persona-haciendo-snowboard-montana-nevada-scaled.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        {/* Background overlay */}
        <div
          className="position-absolute"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}
        ></div>

        {/* Content */}
        <div className="px-4 py-5 text-center position-relative d-flex flex-column align-items-center justify-content-center h-100">
          <h1
            className="mb-4 display-4 fw-bold"
            style={{
              fontFamily: "'Permanent Marker', cursive",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            ALQUILER ESQUÍ + SNOW
          </h1>

          <p
            className="mx-auto mb-5 fs-1 lh-1 fw-light fw-bold"
            style={{ maxWidth: "700px" }}
          >
            Tu aventura en la nieve comienza aquí: alquila tu material de esquí
          </p>

          {/* Animated down arrow */}
          <div className="animate-bounce">
            <ChevronDown className="text-white" size={40} />
          </div>
        </div>
      </section>
    </>
  );
}
