import React, { Component } from 'react';

class AddPost extends Component {
    state = {
        id: "sldfndslkfnf"
    }
    componentDidMount() {
        console.log(this.props);
        var id = this.props.match.params.recipe_id;
        this.setState({ id: id });
    };
    render() {
        return (
            <div className="container">
                <h4>{this.state.id}</h4>
            </div>
        );
    }
}
export default AddPost;