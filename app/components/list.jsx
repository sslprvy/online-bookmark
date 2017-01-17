import React from 'react';
import { connect } from 'react-redux';

const mapUsers = (state) => {
    return {
        userData: state.appData.users
    };
};

const List = ({ userData }) => {
    let userObjects = userData.map(user => {
        return user.data.map((listElement, index) => {
            const tagObjects = listElement.tags.map((tag, index) =>
                <div className="display-list-element-tag" key={`${tag}-${index}`}>
                    <span>{tag}</span>
                </div>
            );

            return (
                <li className="display-list-element" key={`${listElement.title}-${index}`}>
                    <div>
                        <span className="display-list-element-title">{listElement.title}</span><br/>
                        <span className="display-list-element-url"><a href={listElement.url} target="_blank">{listElement.url}</a></span><br/>
                        <div className="display-list-element-tag-container">{tagObjects}</div>
                    </div>
                </li>
            );
        });
    });

    return (
        <ul>
            {userObjects}
        </ul>
    );
};

export default connect(mapUsers)(List);
