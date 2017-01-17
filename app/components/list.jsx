import React from 'react';
import { connect } from 'react-redux';

const mapUsers = (state) => {
    return {
        userData: state.appData.users
    };
};

const hashId = (title) => {
    return `${title.toLowerCase().replace(/\s/g,'-')}`;
};

const List = ({ userData }) => {
    let userObjects = userData.map(user => {
        return user.data.map((listElement, index) => {
            const tagObjects = listElement.tags.sort().map((tag, index) =>
                <div className="display-list-element-tag" key={`${tag}-${index}`}>
                    <span>{tag}</span>
                </div>
            );

            return (
                <li className="display-list-element" id={hashId(listElement.title)} key={`${listElement.title}-${index}`}>
                    <div>
                        <a className="display-list-element-title" href={`#${hashId(listElement.title)}`}>{listElement.title}</a>
                        <span className="display-list-element-url"><a href={listElement.url} target="_blank">{listElement.url}</a></span>
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
