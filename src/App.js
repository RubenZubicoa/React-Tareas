import React, { useState, useEffect } from 'react';
import { TaskRow } from './components/TaskRow'
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';

function App() {

  const [userName, setUserName] = useState('Ruben')
  const [taskItems, setTaskItems] = useState([])

  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if(data != null){
      setTaskItems(JSON.parse(data));
    }else{
      setTaskItems([
        { name: 'Task One', done: false },
        { name: 'Task Two', done: false },
        { name: 'Task Three', done: true },
        { name: 'Task Four', done: false },
      ])
      setShowCompleted(true);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  const createNewTask = taskName =>{
    if(!taskItems.find(t => t.name === taskName)){
      setTaskItems([...taskItems, {name: taskName, done:false}])
    }
  }

  const deleteTask = task => {
    taskItems.splice(taskItems.indexOf(task), 1);
    setTaskItems(taskItems.filter(t => t.name != task.name))
  }

  const toggleTaskt = task => 
  setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)));

  const TaskTableRows = (doneValue) =>
    taskItems
    .filter(task => task.done === doneValue)
    .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTaskt} deleteTask={deleteTask} />
    ));

  return (
    <div className="App">
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator createNewTask={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {TaskTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Completed task"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {TaskTableRows(true)}
            </tbody>
          </table>
        )
      }

    </div>
  );
}

export default App;
