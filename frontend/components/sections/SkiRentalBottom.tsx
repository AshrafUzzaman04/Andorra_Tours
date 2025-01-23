export default function SkirentalBottom() {
  return (
    <>
      <section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          style={{ height: "30px", width: "100%" }}
        >
          <path
            class="elementor-shape-fill"
            d="M500,98.9L0,6.1V0h1000v6.1L500,98.9z"
            style={{ fill: "#3D436A" }}
          ></path>
        </svg>
        <div className="container py-5">
          <div
            style={{ flexDirection: "column" }}
            className="mb-5 text-center d-flex justify-content-center align-items-center"
          >
            <div>
              <img
                src="/assets/imgs/template/light_tours_andorra.png"
                alt="Tours Andorra Logo"
                width={200}
                height={100}
              />
            </div>
            <button
              className="mb-5 btn"
              style={{
                background: "#3D436A",
                color: "white",
                borderRadius: "6px",
              }}
            >
              Servicios exclusivos...
            </button>
          </div>
          <div className="row g-4">
            {/* First Row */}
            <a href="#" className="col-6 col-md-3">
              <div className="text-center border-0 card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <img src="https://toursandorra.com/wp-content/uploads/2023/04/groups-1-1.png"></img>
                  </div>
                  <span
                    className="card-title fw-bold text-decoration-underline"
                    style={{ fontSize: "22px" }}
                  >
                    Grupos
                  </span>
                </div>
              </div>
            </a>

            <a href="#" className="col-6 col-md-3">
              <div className="text-center border-0 card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <img src="https://toursandorra.com/wp-content/uploads/2023/04/groups-1-1.png"></img>
                  </div>
                  <span
                    className="card-title fw-bold text-decoration-underline"
                    style={{ fontSize: "22px" }}
                  >
                    Discotecas
                  </span>
                </div>
              </div>
            </a>

            <a href="#" className="col-6 col-md-3">
              <div className="text-center border-0 card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <img src="https://toursandorra.com/wp-content/uploads/2023/04/groups-1-1.png"></img>
                  </div>
                  <span
                    className="card-title fw-bold text-decoration-underline"
                    style={{ fontSize: "22px" }}
                  >
                    Servicios V.I.P
                  </span>
                </div>
              </div>
            </a>

            <a href="#" className="col-6 col-md-3">
              <div className="text-center border-0 card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <img src="https://toursandorra.com/wp-content/uploads/2023/04/groups-1-1.png"></img>
                  </div>
                  <span
                    className="card-title fw-bold text-decoration-underline"
                    style={{ fontSize: "22px" }}
                  >
                    Jet privados
                  </span>
                </div>
              </div>
            </a>

            {/* Second Row */}
            <a href="#" className="col-6 col-md-3">
              <div className="text-center border-0 card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <img src="https://toursandorra.com/wp-content/uploads/2023/04/groups-1-1.png"></img>
                  </div>
                  <span
                    className="card-title fw-bold text-decoration-underline"
                    style={{ fontSize: "22px" }}
                  >
                    Residencias
                  </span>
                </div>
              </div>
            </a>

            <a href="#" className="col-6 col-md-3">
              <div className="text-center border-0 card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <img src="https://toursandorra.com/wp-content/uploads/2023/04/groups-1-1.png"></img>
                  </div>
                  <span
                    className="card-title fw-bold text-decoration-underline"
                    style={{ fontSize: "22px" }}
                  >
                    Chalet & Villas
                  </span>
                </div>
              </div>
            </a>

            <a href="#" className="col-6 col-md-3">
              <div className="text-center border-0 card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <img src="https://toursandorra.com/wp-content/uploads/2023/04/groups-1-1.png"></img>
                  </div>
                  <span
                    className="card-title fw-bold text-decoration-underline"
                    style={{ fontSize: "22px" }}
                  >
                    Transfers
                  </span>
                </div>
              </div>
            </a>

            <a href="#" className="col-6 col-md-3">
              <div className="text-center border-0 card h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <img src="https://toursandorra.com/wp-content/uploads/2023/04/groups-1-1.png"></img>
                  </div>
                  <span
                    className="card-title fw-bold text-decoration-underline"
                    style={{ fontSize: "22px" }}
                  >
                    Filmmaker
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
