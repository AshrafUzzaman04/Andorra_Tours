import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import callFetch from "helpers/callFetch";
import dateFormat from "dateformat";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
const BookingForm = ({ formData }) => {
  const { register, handleSubmit, setError, setValue, getValues, errors } = formData;
  const [editorContent, setEditorContent] = useState("");
  const [answers, setAnswers] = useState([]);
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(0);
  const [times, setTimes] = useState([]);
  const [services, setServices] = useState([]);
  const [addExtra, setAddExtra] = useState([]);
  const flatPickerOptions = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    disableMobile: "true",
    appendTo: document.body,
    position: 'auto',
  }
  useEffect(() => {
    if (times?.length === 0) {
      setTimes([{ id: 0, time: "" }])
    }
    if (services?.length === 0) {
      setServices([{ id: 0, service_name: "", price: 0, quantity: 0 }])
    }
    if (addExtra?.length === 0) {
      setAddExtra([{ id: 0, extra_service_name: "", price: 0 }])
    }
  }, [0])

  useEffect(() => {
    const jsonDetails = getValues("times");
    if (jsonDetails?.length > 0) {
      setTimes(JSON.parse(jsonDetails))
    }
    const jsonservices = getValues("services");
    if (jsonservices?.length > 0) {
      setServices(JSON.parse(jsonservices))
    }
    const jsonadd_extra = getValues("add_extra");
    if (jsonadd_extra?.length > 0) {
      setAddExtra(JSON.parse(jsonadd_extra))
    }
  }, [0,formData?.params?.id])


  function deleteProduct() {
    var titems = [];
    times.map((t) => {
      if (!t)
        return;
      titems.push(t);
    });
    setTimes(titems);
    setRefresh(refresh + 1);
    setValue("times", JSON.stringify(times))
  }

  function deleteProductService() {
    var titems = [];
    services.map((t) => {
      if (!t)
        return;
      titems.push(t);
    });
    setServices(titems);
    setRefresh(refresh + 1);
    setValue("services", JSON.stringify(services))
  }

  function deleteExtraService() {
    var titems = [];
    addExtra.map((t) => {
      if (!t)
        return;
      titems.push(t);
    });
    setAddExtra(titems);
    setRefresh(refresh + 1);
    setValue("add_extra", JSON.stringify(addExtra))
  }

  return (
    <>
      <div className="row g-3">
        <div className="col-md-12">
          <div class="form-group">
            <label>{t("Form Title")} *</label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder={t("Booking Form")}
              {...register("form_title")}
            />
            <div className="invalid-feedback">
              {errors.form_title && errors.form_title.message}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {
          times && times.map((time, i) => (
            <div key={i} className="col-md-4">
              <div className="d-flex align-items-center w-100">
                <div class="form-group w-100">
                  <label>{t("Time")} *</label>
                  <Flatpickr
                    className="form-control"
                    options={flatPickerOptions}
                    data-enable-time
                    value={time?.time}
                    onChange={([date]) => {
                      const timeOnly = date.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      });
                      times[i].id = i + 1;
                      times[i].time = timeOnly;
                      setTimes(times)
                      setValue("times", JSON.stringify(times))
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.times && errors.times.message}
                  </div>
                </div>
                &nbsp;
                <i className="fa-solid fa-circle-xmark text-danger cursor-pointer mt-3" data-key={i} onClick={() => { delete times[i]; deleteProduct(); }}></i>
              </div>
            </div>
          ))
        }
        <div className="col-md-12">
          <button type="button" className="btn btn-sm btn-primary" onClick={() => setTimes([...times, { id: 0, time: "" }])}>Add <i class="fas fa-plus"></i> </button>
        </div>
      </div>


      <div className="row g-3">
        <div className="col-md-12">
          <div class="form-group">
            <label>{t("Service Title")} *</label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder={t("Ticket")}
              {...register("service_title")}
            />
            <div className="invalid-feedback">
              {errors.service_title && errors.service_title.message}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-12">
          <div className="row">
            {
              services && services.map((service, i) => (
                <>
                  <div key={i} className="col-md-6">
                    <div className="d-flex align-items-center w-100">
                      <div class="form-group w-100">
                        <label>{t("Service Name")} *</label>
                        <input
                          type="text"
                          className="form-control mb-4"
                          placeholder={t("Ticket")}
                          defaultValue={service?.service_name}
                          onChange={(e) => {
                            services[i].id = i + 1;
                            services[i].service_name = e.target.value;
                            setServices(services)
                            setValue("services", JSON.stringify(services))
                          }}
                        />
                        <div className="invalid-feedback">
                          {errors.service_name && errors.service_name.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center w-100">
                      <div class="form-group w-100">
                        <label>{t("Price")} *</label>
                        <input
                          type="text"
                          className="form-control mb-4"
                          placeholder={t("00.00")}
                          defaultValue={service?.price}
                          onChange={(e) => {
                            services[i].id = i + 1;
                            services[i].price = e.target.value;
                            setServices(services)
                            setValue("services", JSON.stringify(services))
                          }}
                        />
                        <div className="invalid-feedback">
                          {errors.price && errors.price.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center w-100">
                      <div class="form-group w-100">
                        <label>{t("Quantity")} *</label>
                        <input
                          type="number"
                          className="form-control mb-4"
                          placeholder={t("1000")}
                          defaultValue={service?.quantity}
                          onChange={(e) => {
                            services[i].id = i + 1;
                            services[i].quantity = e.target.value;
                            setServices(services)
                            setValue("services", JSON.stringify(services))
                          }}
                        />
                        <div className="invalid-feedback">
                          {errors.quantity && errors.quantity.message}
                        </div>
                      </div>
                      &nbsp;
                      <i className="fa-solid fa-circle-xmark text-danger cursor-pointer" data-key={i} onClick={() => { delete services[i]; deleteProductService(); }}></i>
                    </div>
                  </div>
                </>

              ))
            }
          </div>

        </div>
        <div className="col-md-12">
          <button type="button" className="btn btn-sm btn-primary" onClick={() => setServices([...services, { id: 0, service_name: "", price: 0, quantity: 0 }])}>Add <i class="fas fa-plus"></i> </button>
        </div>
      </div>


      <div className="row g-3">
        <div className="col-md-12">
          <div class="form-group">
            <label>{t("Extra Service Title")} *</label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder={t("Add Extra Service")}
              {...register("add_extra_title")}
            />
            <div className="invalid-feedback">
              {errors.add_extra_title && errors.add_extra_title.message}
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-md-12">
          <div className="row">
            {
              addExtra && addExtra.map((service, i) => (
                <>
                  <div key={i} className="col-md-6">
                    <div className="d-flex align-items-center w-100">
                      <div class="form-group w-100">
                        <label>{t("Extra Service Name")} *</label>
                        <input
                          type="text"
                          className="form-control mb-4"
                          placeholder={t("Ticket")}
                          defaultValue={service?.service_name}
                          onChange={(e) => {
                            addExtra[i].id = i + 1;
                            addExtra[i].service_name = e.target.value;
                            setAddExtra(addExtra)
                            setValue("add_extra", JSON.stringify(addExtra))
                          }}
                        />
                        <div className="invalid-feedback">
                          {errors.service_name && errors.service_name.message}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-center w-100">
                      <div class="form-group w-100">
                        <label>{t("Price")} *</label>
                        <input
                          type="number"
                          className="form-control mb-4"
                          placeholder={t("1000")}
                          defaultValue={service?.price}
                          onChange={(e) => {
                            addExtra[i].id = i + 1;
                            addExtra[i].price = e.target.value;
                            setAddExtra(addExtra)
                            setValue("add_extra", JSON.stringify(addExtra))
                          }}
                        />
                        <div className="invalid-feedback">
                          {errors.quantity && errors.quantity.message}
                        </div>
                      </div>
                      &nbsp;
                      <i className="fa-solid fa-circle-xmark text-danger cursor-pointer" data-key={i} onClick={() => { delete addExtra[i]; deleteExtraService(); }}></i>
                    </div>
                  </div>
                </>

              ))
            }
          </div>

        </div>
        <div className="col-md-12">
          <button type="button" className="btn btn-sm btn-primary" onClick={() => setAddExtra([...addExtra, { id: 0, extra_service_name: "", price: 0 }])}>Add <i class="fas fa-plus"></i> </button>
        </div>
      </div>

    </>
  )
}

export default BookingForm