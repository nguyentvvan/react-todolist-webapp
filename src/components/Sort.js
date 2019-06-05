import React, { Component } from 'react';

class Sort extends Component {
    constructor(props){
        super(props);
        this.state = {
            sort: {
                by: 'name',
                value: 1
            }
        };
    }

    onClick = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        });

        this.props.onSort(sortBy, sortValue);
    }

    render(){
        return (
            <div className="drop-down">
                <button type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" className="btn btn-primary dropdown-toggle">
                    Sắp xếp <span className="fa fa-caret-square-down ml-5"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick={ () => this.onClick('name', 1) }>
                        <a role="button">
                            <span className="fa fa-sort-alpha-down pr-5"> Tên A-Z { this.state.sort.by === 'name' && this.state.sort.value === 1 ? <i className="fas fa-check"></i> : null }</span>
                        </a>
                    </li>
                    <li onClick={ () => this.onClick('name', -1) }>
                        <a role="button">
                            <span className="fa fa-sort-alpha-up pr-5"> Tên Z-A { this.state.sort.by === 'name' && this.state.sort.value === -1 ? <i className="fas fa-check"></i> : null }</span>
                        </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li onClick={ () => this.onClick('status', 1) }>
                        <a role="button">
                            Trạng thái kích hoạt  { this.state.sort.by === 'status' && this.state.sort.value === 1 ? <i className="fas fa-check"></i> : null }
                        </a>
                    </li>
                    <li onClick={ () => this.onClick('status', -1) }>
                        <a role="button">
                            Trạng thái ẩn { this.state.sort.by === 'status' && this.state.sort.value === -1 ? <i className="fas fa-check"></i> : null }
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sort;
