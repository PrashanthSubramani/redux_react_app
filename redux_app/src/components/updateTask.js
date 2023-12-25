import React,{ useState,useEffect }  from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskInList, updateTaskToServer } from '../slice/taskSlice';

export default function MyVerticallyCenteredModal(props) {

  const { selectedTask } = useSelector((state) => state.tasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(0);
  const dispatch = useDispatch();

  const updateTask = () => {
    props.onHide();
    dispatch(updateTaskToServer({id,title,description}));
  }

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title)
      setDescription(selectedTask.description)
      setId(selectedTask.id)
    }
  }, [selectedTask])

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Update Note
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {/* <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Task Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Task" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Task Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </Form.Group>
            </Form> */}

<Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                          type="text"
                          className='border-0 fs-3' // Apply custom class here
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                          as="textarea"
                          className='border-0' // Apply custom class here
                          rows={5}
                          value={description}
                          placeholder="Take a note.."
                          onChange={(e) => setDescription(e.target.value)}
                      />
                  </Form.Group>
              </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" type="submit" onClick={(e)=>updateTask(e)}>
           Update         
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
