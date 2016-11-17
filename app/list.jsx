import React from 'react';
import ReactDom from 'react-dom';

export class List extends React.Component {
    render() {
        var urlObjects = this.props.objects.map(function (urlObject, index) {
            var listElementKey = `${urlObject}-${index}`;
            return <ListElement data={urlObject} key={listElementKey}/>;
        });

        return <ul className="display-list">{urlObjects}</ul>;
    }
}

class ListElement extends React.Component {
    render() {
        var tagObjects = this.props.data.tags.map((tag, index) => {
            var key = `${this.props.data.title}-tag-${index}`;
            return <span className="display-list-element-tag" key={key}>{tag}</span>;
        });
        return (
                <li className="display-list-element" key={this.props.data.title}>
                    <div>
                        <span className="display-list-element-title">{this.props.data.title}</span><br/>
                        <span className="display-list-element-url">{this.props.data.url}</span><br/>
                        <span>{tagObjects}</span>
                    </div>
                </li>
        );
    }
}
