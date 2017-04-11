import React from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../../actions/app-data';

const mapState = ({ appData }) => {
    return {
        lists: appData.lists
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchList: (id) => dispatch(fetchList({ id }))
    };
};

const Lists = ({ lists, fetchList }) => {
    const listObjects = lists.map(list => {
        return <li key={list._id}
                   onClick={fetchList.bind(null, list._id)}
                   className="user-list">{list.name}</li>;
    });

    return (
        <ul className="user-lists">
            {listObjects}
        </ul>
    );
};

export default connect(mapState, mapDispatch)(Lists);
