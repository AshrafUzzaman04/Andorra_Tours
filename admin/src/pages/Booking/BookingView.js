import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { ArrowLeft, Calendar, Users, MountainSnow, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import callFetch from 'helpers/callFetch';

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
  }, [params?.id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!booking) {
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
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Booking Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Order ID:</span>
                <span>{bookingData?.order_id}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Client Name:</span>
                <span>{bookingData?.customer?.name + " " + bookingData?.customer?.last_name}</span>
              </div>
              {/* <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Status:</span>
                <Badge bg={booking.status === 'confirmed' ? 'success' : 'secondary'}>
                  {booking.status}
                </Badge>
              </div> */}
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total Cost:</span>
                <span className="fs-5 fw-bold">{booking.total}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
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
                <span className="fw-bold me-2">Check-in:</span>
                <span>{booking.checkIn}</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <Calendar className="me-2" size={18} />
                <span className="fw-bold me-2">Check-out:</span>
                <span>{booking.checkOut}</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <MountainSnow className="me-2" size={18} />
                <span className="fw-bold me-2">Ski Package:</span>
                <span>{booking.skiPackage}</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <Users className="me-2" size={18} />
                <span className="fw-bold me-2">Group Size:</span>
                <span>{booking.groupSize}</span>
              </div>
              <div className="d-flex align-items-center">
                <MapPin className="me-2" size={18} />
                <span className="fw-bold me-2">Location:</span>
                <span>{booking.location}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Equipment and Services</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <span className="fw-bold">Equipment:</span>
                <ul className="list-unstyled mt-2">
                  {booking.equipment.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="fw-bold">Instructor:</span>
                <span className="ms-2">{booking.instructor}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Additional Information</Card.Title>
            </Card.Header>
            <Card.Body>
              <div>
                <span className="fw-bold">Special Requests:</span>
                <p className="mt-2">{booking.specialRequests || 'None'}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 d-flex justify-content-end">
        <Button variant="outline-primary" className="me-2">Edit Booking</Button>
        <Button variant="danger">Cancel Booking</Button>
      </div>
    </div>
  )
}

export default BookingView