import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { dispatch } from '../store';

import { saveEntry } from '../actions/entry';
import { updateList } from '../actions/app-data';

export default class EditableListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listElement: props.listElement
        };

        this.updateEntry = this.updateEntry.bind(this);
        this.saveEntry = this.saveEntry.bind(this);
    }

    updateEntry(event) {
        const property = event.target.name;
        let updatedProperty = {};
        updatedProperty[property] = event.target.value;

        this.setState({
            listElement: Object.assign({}, this.state.listElement, updatedProperty)
        });
    }

    saveEntry() {
        const updatedElements = this.props.list.elements.map(
            element => element._id === this.state.listElement._id ? this.state.listElement : element
        );
        const updatedList = Object.assign({}, this.props.list, { elements: updatedElements });

        // This is to update the applications own state
        dispatch(updateList({ list: updatedList, id: this.state.listElement._id }));
        // This is to persist the change to the backend
        dispatch(saveEntry({ id: updatedList._id, listElement: this.state.listElement }));
    }

    render() {
        return (
            <li className="display-list-element">
                <div className="display-list-element-content">
                    <input value={this.state.listElement.title} onChange={this.updateEntry} name="title" />
                    <input value={this.state.listElement.url} onChange={this.updateEntry} name="url" />
                </div>
                <div className="display-list-element-control">
                    <i className="fa fa-floppy-o display-list-element-remove-button"
                        aria-hidden="true"
                        onClick={this.saveEntry}></i>
                    <i className="fa fa-times display-list-element-cancel-button"
                        aria-hidden="true"></i>
                </div>
            </li>
        );
    }
}
