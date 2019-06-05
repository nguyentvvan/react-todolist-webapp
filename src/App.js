import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
// import _ from 'lodash';
import { findIndex } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateRandomId(),
        name: 'Learning Angular',
        status: true,
      },{
        id: this.generateRandomId(),
        name: 'Learning ReactJS',
        status: false,
      },{
        id: this.generateRandomId(),
        name: 'Learning NextJS',
        status: true,
      },
    ];
    this.setState({
      tasks: tasks
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  s4(){
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateRandomId(){
    return this.s4() + '-' + this.s4() + this.s4() + this.s4() + '-' + this.s4() + this.s4() + this.s4() + this.s4();
  }

  onToggleForm = () => {
    if (this.state.taskEditing) {
      this.setState({
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm
      });
    }
  }
  
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id) {
      var index = this.findIndex(data.id);
      if (index !== -1) {
        tasks[index].name = data.name;
        tasks[index].status = data.status;
      }
    } else {
      data.id = this.generateRandomId();
      tasks.push(data);
    }
    
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onDeleteTask = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    // var index = _.findIndex(tasks, (task) => {
    //   return task.id === id;
    // });
    var index = findIndex(tasks, (task) => {
      return task.id === id;
    });
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    this.onCloseForm();
  }

  onEditTask = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      var taskEditing = tasks[index];
      this.setState({
        taskEditing: taskEditing,
      });
      this.onShowForm();
    }
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase()
    });
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue
      }
    });
  }

  render(){
    var { tasks, isDisplayForm, filter, keyword, sort } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }

      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });

      if (keyword) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(keyword) !== -1;
        });
      }
    }
    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else if (sort.by === 'status') {
      tasks.sort((a, b) => {
        if (a.status > b.status) return sort.value;
        else if (a.status < b.status) return -sort.value;
        else return 0;
      });
    }

    return (
      <div className="container">
          <div className="text-center">
            <h1>QUẢN LÝ CÔNG VIỆC</h1>
            <hr/>
          </div>
          
          <div className="row">
            {
              isDisplayForm ? 
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} taskEditing={this.state.taskEditing} />
                </div>
                :
                null
            }
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button type="button" className="btn btn-primary" onClick={this.onToggleForm}><span className="fa fa-plus mr-5"></span>Thêm công việc</button>
              <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}><span className="fa fa-plus mr-5"></span>Thêm data mẫu</button>
              <Control onSearch={this.onSearch} onSort={this.onSort}/>
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList tasks={tasks} onDeleteTask={this.onDeleteTask} 
                      onEditTask={this.onEditTask} onUpdateStatus={this.onUpdateStatus}
                      onFilter={this.onFilter} />
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }  
}

export default App;
