import React, { useState, useEffect } from "react";
import '../App.css';
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, completedTodo } from "../redux/todoSlice";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [task, setTask] = useState('');
    const [editingTask, setEditingTask] = useState('');

    const todos = useSelector(state => state.todos.todos);
    const completedTodos = useSelector(state => state.todos.completedState);
    const dispatch = useDispatch();

   
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];

 
        if (todos.length === 0) {
            savedTodos.forEach(todo => dispatch(addTodo(todo.text)));
        }

        if (completedTodos.length === 0) {
            savedCompletedTodos.forEach(todo => dispatch(completedTodo(todo)));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }, [todos, completedTodos]);

    const handleInput = (e) => {
        setTask(e.target.value);
    };

    const handleEditInput = (e) => {
        setEditingTask(e.target.value);
    };

    const handleTodo = () => {
        if (task.trim()) {
            dispatch(addTodo(task));
            setTask('');
        }
    };

    const removeTodo = (id) => {
        dispatch(deleteTodo(id));
        setShowEditModal(false);
    };

    const handleShowEditModal = (todo) => {
        setSelectedTodo(todo);
        setEditingTask(todo.text);
        setShowEditModal(true);
        setTask('');
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedTodo(null);
    };

    const handleMoveItem = () => {
        if (selectedTodo) {
            dispatch(completedTodo({ id: selectedTodo.id, text: editingTask }));
            setShowEditModal(false);
            setSelectedTodo(null);
            setEditingTask('');
        }
    };

    const handleShowCompletedModal = () => {
        setShowCompletedModal(true);
    };

    const handleCloseCompletedModal = () => {
        setShowCompletedModal(false);
    };

    return (
        <>
            <div className="bar m-0"></div>
            <Container fluid>
                <Row className="row">
                    <Col md={3} className="border shadow p-4 columnOne">
                        <h3>Menu</h3>
                        <input type="text" className="form-control" placeholder="search" />
                        <div className="mt-2">
                            <h6>TASKS</h6>
                            <ul>
                                <li className="text-success" onClick={handleShowCompletedModal}><i className="fa-solid fa-thumbs-up me-1"></i> Completed</li>
                                <li onClick={handleShow}><i className="fa-regular fa-calendar-days me-1"></i> Calendar</li>
                                <li className="disabled"><i className="fa-solid fa-star me-1"></i> Important </li>
                                <li className="disabled"><i className="fa-solid fa-note-sticky me-1"></i> Sticky Wall </li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="disabled">LISTS</h6>
                            <ul className="disabled">
                                <li>Personal</li>
                                <li>Work</li>
                                <li>List 1</li>
                                <li>+ Add new list</li>
                            </ul>
                        </div>
                        <div className="d-flex flex-column disabled">
                            <span className="menu-button">Settings</span>
                            <span className="menu-button">Sign out</span>
                        </div>
                    </Col>
                    <Col md={9} className="columnTwo pt-4">
                        <h1>Today {new Date().getDate()} <i className="fa-regular fa-calendar-days"></i></h1>
                        <div className="d-flex">
                            <input type="text" className="w-100 form-control me-3" placeholder="Add new task" value={task} onChange={handleInput} />
                            <button className="btn me-2" style={{ backgroundColor: '#E74646', color: 'white' }} onClick={handleTodo}>ADD</button>
                        </div>
                        <p className="message">Click on any to-do task to modify.</p>

                        <h3 className="text-center">TASKS</h3>
                        <ul className="mt-3 mb-5">
                            {
                                todos.length > 0 ?
                                    todos.map(todo => (
                                        <li key={todo.id} onClick={() => handleShowEditModal(todo)} >
                                            <i className="fa-solid fa-check me-2"></i>{todo.text}
                                        </li>
                                    )) :
                                    <h4 className="text-center mt-5">No pending tasks😒</h4>
                            }
                        </ul>

                        <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Make changes to your TO-DO</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="p-4">
                                {selectedTodo && (
                                    <>
                                        <label htmlFor="inputBox" className="form-label">TASK:</label>
                                        <input
                                            type="text"
                                            id="inputBox"
                                            className="form-control"
                                            value={editingTask}
                                            onChange={handleEditInput}
                                            readOnly
                                        />
                                        <div className="mb-3  ">
                                            <label htmlFor="actions" className="form-label mt-2">Choose an action: <span className="upcoming">(coming soon**)</span></label>
                                            <select id="actions" name="actions" className="form-select" >
                                                <option className="text-secondary disabled" selected value="blank">select any to modify</option>
                                                <option value="upcoming" className="upcoming" >Important * </option>
                                                <option value="today" className="upcoming" >StickyWall *</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center">
                                <Button className="modal-button" variant="danger" onClick={() => removeTodo(selectedTodo.id)}>
                                    Remove
                                </Button>
                                <Button className="modal-button" variant="primary" onClick={handleMoveItem}>
                                    Move to Completed
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showCompletedModal} onHide={handleCloseCompletedModal}>
                            <Modal.Body>
                                <h3 className="text-center">COMPLETED TASKS</h3>
                                <ul>
                                    {completedTodos.length > 0 ? (
                                        completedTodos.map((item) => (
                                            <li key={item.id}>{item.text}</li>
                                        ))
                                    ) : (
                                        <h4 className="text-center mt-5">No completed tasks😒</h4>
                                    )}
                                </ul>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseCompletedModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Plan your days</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="d-flex align-items-center justify-content-center mt-3" >
                                    <Calendar />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default Home;
