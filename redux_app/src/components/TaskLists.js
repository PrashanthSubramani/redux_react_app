import React, { useEffect } from 'react'
// import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Row, Col} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import MyVerticallyCenteredModal from './updateTask';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskFromServer, getTaskFromServer, removeTaskFromList, setSelectedTask } from '../slice/taskSlice';

export default function TaskLists() {

    const dispatch = useDispatch();

    const {taskList} = useSelector((state)=>state.tasks);

    const updateTask = (task)=>{
        setModalShow(true);
        dispatch(setSelectedTask(task));
    }

    useEffect(()=>{
      dispatch(getTaskFromServer());
    },[dispatch])

    const deleteTask = (task)=>{
      dispatch(deleteTaskFromServer(task))
      .unwrap()
      .then(()=>{
        dispatch(removeTaskFromList(task));
      })

    }

    const [modalShow, setModalShow] = React.useState(false);

    
  return (
    <>
  <h5> <i className="bi bi-file-earmark-text font-weight-bold fs-4"></i> <b>My Notes</b></h5>
  <p className='text-secondary'>Recently Viewed </p>

  <div className="row">
        <div className="col-lg-12">
          <Row>
            {
              taskList && taskList.map((task, index) => {
                return(
                  <Col lg="4" key={task.id} className="mb-3">
                  <Card className='shadow-sm p-3 mb-1 bg-white rounded-3'>
                    <Card.Body>
                      <div className='d-flex justify-content-between'>
                            <div><h4>{task.title}</h4></div>
                            <div>
                            <a href='javascript:void(0)' className='text-muted ' onClick={() => updateTask(task)}>
                              <i className="bi bi-pencil-square"></i>
                            </a> &nbsp;&nbsp;

                            <a  href='javascript:void(0)' className='text-muted ' onClick={() => deleteTask(task)}>
                              <i className="bi bi-trash"></i>
                            </a>
                            </div>
                      </div>

                      <p>{task.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
                )
              })
            }
          </Row>
        </div>
      </div>
      <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
      />
    </>


  )
}
