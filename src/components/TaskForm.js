import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            status: true
        };
    }

    onChange = (event) => {
        event.preventDefault();
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if (name === "status"){
            value = value === "true" ? true : false;
        }

        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: null,
            name: '',
            status: true
        });
    }

    componentWillMount() {
        if (this.props.taskEditing){
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEditing){
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status,
            });
        } else {
            this.setState({
                id: null,
                name: '',
                status: true
            });
        }
    }

    render(){
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{ this.props.taskEditing ? "Sửa công việc" : "Thêm công việc" }</h3>
                    <span className="fa fa-times-circle text-right" onClick={this.props.onCloseForm}></span>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên: </label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                    </div>
                    
                    <label>Trạng thái: </label>
                    <select name="status" className="form-control" value={this.state.status} onChange={this.onChange}>
                        <option value={true}>Kích hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select><br/>
                    
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning"><span className="fa fa-plus mr-5"></span>Lưu lại</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onClear}><span className="fa fa-close mr-5"></span>Hủy bỏ</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
