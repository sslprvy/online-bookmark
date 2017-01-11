import React from 'react';
import ReactDom from 'react-dom';

export class List extends React.Component {
    render() {
        var urlObjects = this.props.objects.map(function (urlObject, index) {
            var listElementKey = `${urlObject.title}-${index}`;
            return <ListElement data={urlObject} key={listElementKey}/>;
        });

        return <ul className="display-list">{urlObjects}</ul>;
    }
}

class ListElement extends React.Component {
    render() {
        var tagObjects = this.props.data.tags.map((tag, index) => {
            var key = `${this.props.data.title}-tag-${index}`;
            return <div className="display-list-element-tag" key={key}>{tag}</div>;
        });
        return (
                <li className="display-list-element" key={this.props.data.title}>
                    <div>
                        <span className="display-list-element-title">{this.props.data.title}</span><br/>
                        <span className="display-list-element-url"><a href={this.props.data.url} target="_blank">{this.props.data.url}</a></span><br/>
                        <div className="display-list-element-tag-container">{tagObjects}</div>
                    </div>
                </li>
        );
    }
}
