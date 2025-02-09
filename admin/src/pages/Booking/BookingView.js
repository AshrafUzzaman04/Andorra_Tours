import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { ArrowLeft, Calendar, Users, MountainSnow, MapPin, Mail, Phone, ShoppingCart, User, CircleDollarSign, HandCoins } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import callFetch from 'helpers/callFetch';
import { NumericFormat } from 'react-number-format';
import { Divider } from '@mui/material';
import { number } from 'prop-types';
import Cookies from 'js-cookie';

// This is a mock function to simulate fetching booking data
// In a real application, you would replace this with an actual API call
const fetchBookingData = async (id) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id,
    guest: 'John Doe',
    checkIn: '2023-12-15',
    checkOut: '2023-12-20',
    status: 'confirmed',
    total: '$750',
    skiPackage: 'Advanced',
    groupSize: 2,
    location: 'Whistler Blackcomb, Canada',
    equipment: ['Skis', 'Boots', 'Poles'],
    instructor: 'Not Included',
    paymentStatus: 'Paid',
    specialRequests: 'Early check-in requested'
  };
};

const BookingView = () => {
  const params = useParams();
  const [booking, setBooking] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [loadingButton, setLoadingButton] = useState({ paymentSend: false, cancelOrder: false });
  const [loadingPdfBtn, setLoadingPdfBtn] = useState(false);

  useEffect(() => {
    fetchBookingData(545454).then(data => {
      setBooking(data);
      //setLoading(false);
    });
  }, [0]);
  useEffect(() => {
    if (params?.id) {
      callFetch("bookings/" + params?.id, "GET", []).then((response) => {
        setBookingData(response?.data);
        setLoading(false);
      })
    }
  }, [params?.id, refresh]);
  const products = JSON.parse(bookingData?.products || '[]');

  const canceledBooking = () => {
    setLoadingButton({ ...loadingButton, cancelOrder: true })
    callFetch('booking/canceled/' + params?.id, "POST", []).then((res) => {
      if (!res.ok) return;
      setRefresh(refresh + 1)
      setLoadingButton({ ...loadingButton, cancelOrder: false })
    })
  }

  const paymentLinkSend = () => {
    setLoadingButton({ ...loadingButton, paymentSend: true })
    callFetch('booking/payment-link/' + params?.id, "POST", []).then((res) => {
      if (!res.ok) return;
      setRefresh(refresh + 1)
      setLoadingButton({ ...loadingButton, paymentSend: false })
    })
  }

  const downloadPdf = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    setLoadingPdfBtn(true);

    try {
      const response = await fetch(`${apiUrl}booking/${bookingData.id}/invoice/download`, {
        method: "GET",
        headers: {
          "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
          "Authorization": `Bearer ${Cookies.get("token")}`, // Add the Bearer token to the header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      // Convert response to a Blob
      const blob = await response.blob();

      // Create a downloadable link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf"; // Set file name
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setLoadingPdfBtn(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!bookingData) {
    return <div className="d-flex justify-content-center align-items-center vh-100">Booking not found</div>;
  }

  return (
    <div className="">
      <div className="mb-4">
        <Link to="/booking-management/bookings">
          <Button variant="btn btn-icon btn-primary">
            <ArrowLeft className="me-2" size={18} />
            Back to Bookings
          </Button>
        </Link>
        <button disabled={loadingPdfBtn} type='button' onClick={downloadPdf} className="ms-3 btn btn-success">
          {loadingPdfBtn ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>Downloading...
            </>
          ) : (
            "Download PDF"
          )}
        </button>
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Booking Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <ShoppingCart className="me-2" size={18} />
                <div className="d-flex justify-content-between w-100">
                  <span className="fw-bold">Order ID:</span>
                  <span>{bookingData?.order_id}</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <User className="me-2" size={18} />
                <div className="d-flex justify-content-between w-100">
                  <span className="fw-bold">Client Name:</span>
                  <span>{bookingData?.customer?.name + " " + bookingData?.customer?.last_name}</span>
                </div>
              </div>
              {/* <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Status:</span>
                <Badge bg={booking.status === 'confirmed' ? 'success' : 'secondary'}>
                  {booking.status}
                </Badge>
              </div> */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <CircleDollarSign className="me-2" size={18} />
                <div className="d-flex justify-content-between w-100">
                  <span className="fw-bold">Total Cost:</span>
                  <span className="fs-5 fw-bold">
                    <NumericFormat
                      value={bookingData?.price}
                      displayType="text"
                      thousandSeparator={","}
                      decimalSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      suffix=' €'
                    />
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <HandCoins className="me-2" size={18} />
                <div className="d-flex justify-content-between w-100">
                  <span className="fw-bold">Payment Status:</span>
                  <Badge bg={
                    bookingData?.status === "Processing" ? "info"
                      :
                      bookingData?.status === "Awaiting" ? "secondary"
                        : bookingData?.status === "Paid" ? "success"
                          : bookingData?.status === "Cancelled" && "danger"}>
                    {bookingData.status}
                  </Badge>
                </div>
              </div>
              {/* <div className="d-flex justify-content-between">
                <span className="fw-bold">Payment Status:</span>
                <Badge bg="light" text="dark">{booking.paymentStatus}</Badge>
              </div> */}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Rental Information</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="mb-3 d-flex align-items-center">
                <Calendar className="me-2" size={18} />
                <span className="fw-bold me-2">Created:</span>
                <span>{bookingData?.created_at}</span>
              </div>
              {/* <div className="mb-3 d-flex align-items-center">
                <MountainSnow className="me-2" size={18} />
                <span className="fw-bold me-2">Ski Package:</span>
                <span>{booking.skiPackage}</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <Users className="me-2" size={18} />
                <span className="fw-bold me-2">Group Size:</span>
                <span>{booking.groupSize}</span>
              </div> */}
              <div className="mb-3 d-flex align-items-center">
                <Mail className="me-2" size={18} />
                <span className="fw-bold me-2">Email:</span>
                <span>{bookingData?.customer?.email}</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <Phone className="me-2" size={18} />
                <span className="fw-bold me-2">Phone:</span>
                <span>{bookingData?.customer?.phone}</span>
              </div>
              <div className="d-flex align-items-center">
                <MapPin className="me-2" size={18} />
                <span className="fw-bold me-2">Location:</span>
                <span>{bookingData?.customer?.address}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title>Equipment and Services</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <ul className="list-unstyled mt-2">
                  {products?.map((item, index) => (
                    <Fragment key={index}>
                      <li>
                        <div>
                          <div className="fw-bold">{item?.title}</div>
                          {
                            item.services &&
                            item.services.map((service, index) => (
                              <div key={index} className='d-flex justify-content-between'>
                                <span className="w-50">{service.title}</span>
                                <span>x{service.quantity}</span>
                                <span><NumericFormat
                                  value={service.price * service.quantity}
                                  displayType="text"
                                  thousandSeparator={","}
                                  decimalSeparator="."
                                  decimalScale={2}
                                  fixedDecimalScale
                                  suffix=' €'
                                /></span>
                              </div>
                            ))
                          }
                        </div>
                      </li>
                      <li>
                        <div className="mb-2">
                          <div className="fw-bold">Location Shop: </div>

                          {
                            item.extra_services &&
                            item.extra_services.map((extra_service, index) => (
                              <div key={index} className='d-flex justify-content-between'>
                                <span>{extra_service.title}</span>
                                <span><NumericFormat
                                  value={extra_service.price}
                                  displayType="text"
                                  thousandSeparator={","}
                                  decimalSeparator="."
                                  decimalScale={2}
                                  fixedDecimalScale
                                  suffix=' €'
                                /></span>
                              </div>
                            ))
                          }
                        </div>
                      </li>
                    </Fragment>
                  ))}
                </ul>

                <Divider />
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Sub Total:</span>
                  <span className="ms-2 fw-bold">
                    <NumericFormat
                      value={Number(bookingData?.price || 0) + Number(bookingData?.discounted_price || 0)}
                      displayType="text"
                      thousandSeparator={","}
                      decimalSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      suffix=' €'
                    />
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Discount:</span>
                  <span className="ms-2 fw-bold text-danger">
                    -{bookingData?.discounted_price ? bookingData?.discounted_price : 0} €
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Total:</span>
                  <span className="ms-2 fw-bold">
                    <NumericFormat
                      value={bookingData?.price}
                      displayType="text"
                      thousandSeparator={","}
                      decimalSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      suffix=' €'
                    />
                  </span>
                </div>
              </div>
              <Divider />
              <div className="mt-4 d-flex justify-content-end">
                <Button disabled={loadingButton?.cancelOrder || bookingData?.status === "Cancelled"} variant={loadingButton?.cancelOrder ? "light" : "danger"} className="me-2" onClick={canceledBooking}>
                  {
                    loadingButton?.cancelOrder ?
                      <div>Canceling... <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div></div> : "Cancel Booking"
                  }

                </Button>
                <Button disabled={loadingButton?.paymentSend} variant={loadingButton?.paymentSend ? "light" : "success"} onClick={paymentLinkSend}>
                  {
                    loadingButton?.paymentSend ?
                      <div>Link Sending... <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div></div> : "Send Payment Link"
                  }
                </Button>
              </div>
            </Card.Body>

          </Card>
        </Col>

        {/* <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Additional Information</Card.Title>
            </Card.Header>
            <Card.Body>
              <div>
                <span className="fw-bold">Notes:</span>
                <span className="ms-2">{products?.notes}</span>
              </div>
              <div>
                <span className="fw-bold">Special Requests:</span>
                <p className="mt-2">{booking.specialRequests || 'None'}</p>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>


    </div>
  )
}

export default BookingView