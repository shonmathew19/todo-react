import React, { useState, useEffect } from "react";
import '../App.css';
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, completedTodo, markAsImportant, updateTodo } from "../redux/todoSlice";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [showImportantModal, setShowImportantModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [task, setTask] = useState('');
    const [editingTask, setEditingTask] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const todos = useSelector(state => state.todos.todos);
    const completedTodos = useSelector(state => state.todos.completedState);
    const importantTodos = useSelector(state => state.todos.importantState);
    const dispatch = useDispatch();
    console.log('selected actions', selectedAction);
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;


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
            dispatch(addTodo(`${task}`));
            setTask('');
            toast.success('Task added successfully')
        }
    };

    const removeTodo = (id) => {
        dispatch(deleteTodo(id));
        setShowEditModal(false);
        toast.warning('Task deleted successfully')
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
            dispatch(updateTodo({ id: selectedTodo.id, text: editingTask }));
            if (selectedAction === "completed") {
                dispatch(completedTodo({ id: selectedTodo.id, text: editingTask }));
                setShowEditModal(false);
                setSelectedTodo(null);
                setEditingTask('');
                toast.success('Task moved to "completed tasks"')
            } else if (selectedAction === "important") {
                dispatch(markAsImportant({ id: selectedTodo.id, text: editingTask }));
                toast.success('Task moved to  "important tasks"');
            }
            setShowEditModal(false);
            setSelectedTodo(null);
            setEditingTask('');
            setSelectedAction('');
        }
    };

    const handleShowCompletedModal = () => {
        setShowCompletedModal(true);
    };

    const handleCloseCompletedModal = () => {
        setShowCompletedModal(false);
    };


    const handleShowImportantModal = () => {
        setShowImportantModal(true)
    }
    const handleCloseImportantModal = () => {
        setShowImportantModal(false)
    }
    return (
        <>
            <div className="bar m-0"></div>
            <Container fluid>
                <Row className="row">
                    <Col md={3} className="border shadow p-4 columnOne">
                        <h3>Menu</h3>
                        <input type="text" className="form-control disabled" placeholder="search" />
                        <div className="mt-2">
                            <h6>TASKS</h6>
                            <ul>
                                <li className="text-success" onClick={handleShowCompletedModal}><i className="fa-solid fa-thumbs-up me-1"></i> Completed</li>
                                <li onClick={handleShowImportantModal}> <i className="fa-solid fa-star me-1" style={{ color: 'gold' }}></i> Important </li>
                                <li onClick={handleShow}><i className="fa-regular fa-calendar-days fa-fade me-1"></i> Calendar</li>
                                <li className="disabled"><i className="fa-solid fa-note-sticky me-1"></i> Sticky Wall </li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="disabled">LISTS</h6>
                            <ul className="disabled">
                                <li>Personal</li>
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
                                        <>
                                            <li key={todo.id} className="d-flex justify-content-between align-items-center" onClick={() => handleShowEditModal(todo)}>
                                                <div>
                                                    <i className="fa-solid fa-check me-2 text-success"></i>{todo.text}
                                                </div>
                                                <div className="text-secondary shadow  ">
                                                    <span className="text-primary  me-2">Time:</span>{formattedDate}
                                                </div>

                                            </li>
                                            <hr />



                                        </>

                                    )) :
                                    <h4 className="text-center mt-5">No pending tasks😊</h4>
                            }
                        </ul>

                        <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Make changes to your TO-DO</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="p-4">
                                {selectedTodo && (
                                    <>
                                        <label htmlFor="inputBox" className="form-label">TASK: <span style={{ color: 'red' }}>(click on task name to edit)</span></label>
                                        <input
                                            type="text"
                                            id="inputBox"
                                            className="form-control"
                                            value={editingTask}
                                            onChange={handleEditInput}


                                        />
                                        <div className="mb-3  ">
                                            <label htmlFor="actions" className="form-label mt-2">Choose an action: </label>
                                            <select id="actions" name="actions" className="form-select"
                                                onChange={(e) => setSelectedAction(e.target.value)}
                                            >
                                                <option className="text-secondary disabled" selected value="blank">-select any to modify-</option>
                                                <option value="completed"  >Completed</option>
                                                <option value="important"  >Important </option>

                                            </select>
                                        </div>
                                    </>
                                )}
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center">
                                <Button className="modal-button" variant="danger" onClick={() => removeTodo(selectedTodo.id)}>
                                    Remove
                                </Button>
                                <Button className="modal-button" variant="primary" onClick={handleMoveItem}>SAVE</Button>

                            </Modal.Footer>
                        </Modal>

                        {/* Completed MODAL */}

                        <Modal show={showCompletedModal} onHide={handleCloseCompletedModal}>
                            <Modal.Body>
                                <h3 className="text-center">COMPLETED TASKS</h3>
                                <ul>
                                    {completedTodos.length > 0 ? (
                                        completedTodos.map((item) => (
                                            <>
                                            <li key={item.id} className="d-flex justify-content-between align-items-center">
                                                <div>{item.text}</div>
                                                <div className="text-secondary shadow">
                                                    <span className="text-primary me-2">Time:</span>{formattedDate}
                                                </div>
                                                
                                            </li>
                                            <hr/>
                                            </>

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

                        {/* Important MODAL */}
                        <Modal show={showImportantModal} onHide={handleCloseImportantModal}>
                            <Modal.Body>
                                <h3 className="text-center">IMPORTANT TASKS</h3>
                                <ul>
                                    {importantTodos.length > 0 ? (
                                        importantTodos.map((item) => (
                                            <>
                                                <li key={item.id} className="d-flex justify-content-between align-items-center">
                                                    <div>{item.text}</div>
                                                    <div className="text-secondary shadow">
                                                        <span className="text-primary me-2">Time:</span>{formattedDate}
                                                    </div>
                                                </li>
                                                <hr />

                                            </>
                                        ))
                                    ) : (
                                        <h4 className="text-center mt-5">No Important tasks😒</h4>
                                    )}
                                </ul>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseImportantModal}>
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

            <ToastContainer position="top-center" />

        </>
    );
};

export default Home;
