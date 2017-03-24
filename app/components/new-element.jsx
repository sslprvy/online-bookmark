import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../actions/entry';

const mapDispatch = (dispatch) => {
    return {
        addEntry: (link, list) => {
            dispatch(addEntry(link, list));
        }
    };
};


const NewElement = ({ addEntry, list }) => {
    let link = {
        title: '',
        url: '',
        tags: []
    };

    function onChange(event) {
        let property = event.target.name;
        link[property] = event.target.value;
    }

    return (
        <li className="display-list-element">
            <div className="display-list-element-content">
                <label htmlFor="new-element-title">Title</label>
                <input onChange={onChange} name="title" id="new-element-title"/>
                <label htmlFor="new-element-url">Url</label>
                <input onChange={onChange} name="url" id="new-element-url"/>
            </div>
            <div className="display-list-element-control">
                <i className="fa fa-floppy-o display-list-element-remove-button"
                    aria-hidden="true"
                    onClick={addEntry.bind(null, link, list)}></i>
                <i className="fa fa-times display-list-element-cancel-button"
                    aria-hidden="true"></i>
            </div>
        </li>
    );
};

NewElement.propTypes = {
    list: PropTypes.object.isRequired
};

export default connect(null, mapDispatch)(NewElement);
