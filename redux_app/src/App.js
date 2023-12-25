import './App.css';
import AddTask from './components/AddTask';
import {Row, Col} from "react-bootstrap";
import TaskLists from './components/TaskLists';
import SideBar from './components/sideBar';

function App() {
  return (
<div className="container-fluid bg-body-secondary">
<div className="row">
    
  <SideBar></SideBar>
  <div className="col" id="page-content-wrapper ">
    <div className="container-fluid  " >
      <div className="row ">
        <div className="col-lg-12">
            <Row>
              <Col lg="12">
                  <AddTask></AddTask>
                  <TaskLists></TaskLists>
              </Col>
            </Row>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
}

export default App;
