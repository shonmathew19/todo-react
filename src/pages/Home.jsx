import React from "react";
import '../App.css';
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const Home = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isHovered, setIsHovered] = useState(false);

    const handle = () => {
        alert('hi')
    }

    return (
        <>
            <Container fluid>

                <Row className="row ">
                    
                    <div className="bar">

                    </div>
                    <Col md={3} className="border shadow p-4 columnOne">
                        <h3>Menu</h3>
                        <input type="text" className="form-control" placeholder="search" />
                        <div className="mt-2">
                            <h6>TASKS</h6>
                            <ul >
                                <li onClick={handle} style={{
                                    color: isHovered ? 'rgb(255, 255, 255)' : 'green', fontWeight: 'bold',
                                    backgroundColor: isHovered ? 'green' : 'initial',
                                }}

                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                ><i class="fa-solid fa-thumbs-up me-1 "></i>
                                    Completed
                                </li>
                                <li onClick={handle}><i className="fa-solid fa-forward me-1"></i> Upcoming</li>
                                <li ><i className="fa-solid fa-bars me-1"></i> Today</li>
                                <li ><i className="fa-regular fa-calendar-days me-1"></i> Calander</li>
                                <li ><i className="fa-solid fa-note-sticky me-1"></i> Sticky Wall</li>
                            </ul>
                        </div>
                        <div>
                            <h6>LISTS</h6>
                            <ul>
                                <li>Personal</li>
                                <li>Work</li>
                                <li>List 1</li>
                                <li>+ Add new list </li>
                            </ul>
                        </div>
                        {/* <div className="tag">
                            <span>TAGS</span>
                            <div >
                                <ul className=" d-flex">
                                    <li>Tag1</li>
                                    <li>Tag2</li>
                                    <li>Tag3</li>
                                </ul>

                            </div>
                        </div> */}
                        <div className="d-flex flex-column">
                            <span className="menu-button">Settings</span>
                            <span className="menu-button">Sign out</span>
                        </div>
                    </Col>
                    <Col md={9} className="columnTwo pt-4">
                        <h1>Today {new Date().getDate()} <i className="fa-regular fa-calendar-days"></i></h1>
                        <div className="d-flex">
                            <input type="text" className="w-100 form-control me-3" placeholder="Add new task" />
                            <button className="btn me-2" style={{ backgroundColor: '#E74646', color: 'white' }}>ADD</button>
                        </div>
                        <p className="message">Click on any to-do task to modify.</p>

                        <h3 className="text-center ">TASKS</h3>
                        <ul className="mt-3 ">
                            <li onClick={handleShow}> <i class="fa-solid fa-check me-2"></i>Research content ideas </li>
                            <li onClick={handleShow}> <i class="fa-solid fa-check me-2"></i>Create a database</li>
                            <li onClick={handleShow}> <i class="fa-solid fa-check me-2"></i>Learn MongoDB</li>
                            <li onClick={handleShow}> <i class="fa-solid fa-check me-2"></i>Learn Angular</li>
                            <li onClick={handleShow}> <i class="fa-solid fa-check me-2"></i>Learn MERN</li>
                        </ul>

                    </Col>
                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Make changes to your TO-DO</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                        <Modal.Footer className="d-flex justify-content-center">
                            <Button className="modal-button" variant="outline-secondary" onClick={handleClose}>
                                Move to Later
                            </Button>
                            <Button className="modal-button" variant="outline-secondary" onClick={handleClose}>
                                Edit
                            </Button>
                            <Button className="modal-button" variant="outline-primary" onClick={handleClose}>
                                Completed
                            </Button>
                            <Button className="modal-button" variant="danger" onClick={handleClose}>
                                Remove
                            </Button>
                            <Button className="modal-button" variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>

                    </Modal>
                </Row>
            </Container>
        </>
    )
};

export default Home;
