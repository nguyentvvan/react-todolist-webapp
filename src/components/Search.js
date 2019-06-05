import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
    }

    onChange = (event) => {
        this.setState({
            keyword: event.target.value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render(){
        return (
            <div className="input-group">
                <input type="text" name="" className="form-control" placeholder="Nhập từ khóa..." value={this.state.keyword} onChange={this.onChange} />
                <span className="input-group-btn">
                    <button type="button" className="btn btn-primary" onClick={this.onSearch}>
                        <span className="fa fa-search mr-5"></span>Tìm
                    </button>
                </span>
            </div>
        );
    }
}

export default Search;
