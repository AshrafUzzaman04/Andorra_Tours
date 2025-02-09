import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { ArrowLeft, Calendar, Users, MountainSnow, MapPin, Mail, Phone, ShoppingCart, User, CircleDollarSign, HandCoins } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import callFetch from 'helpers/callFetch';
import { NumericFormat } from 'react-number-format';


const ServiceNewsletterView = () => {
    const params = useParams();
    const [newsletterData, setNewsletterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (params?.id) {
            callFetch("service-newsletter/" + params?.id, "GET", []).then((response) => {
                setNewsletterData(JSON.parse(response?.data?.form_data));
                setLoading(false);
            })
        }
    }, [params?.id, refresh]);


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (!newsletterData) {
        return <div className="d-flex justify-content-center align-items-center vh-100">Booking not found</div>;
    }

    return (
        <div className="">
            <div className="mb-4">
                <Link to="/service-newsletter">
                    <Button variant="btn btn-icon btn-primary">
                        <ArrowLeft className="me-2" size={18} />
                        Back to Service Newsletters
                    </Button>
                </Link>
            </div>

            <Row className="g-4">
                {Object.entries(newsletterData).map(([step, data], index) => (
                    <Col md={6} key={index}>
                        <Card>
                            <Card.Header>
                                <Card.Title>Step {index + 1}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {Object.entries(data).map(([key, value], id) => (
                                    <div className="mb-3 d-flex justify-content-between" key={id}>
                                        <span className="fw-bold">{key}:</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>


        </div>
    )
}

export default ServiceNewsletterView