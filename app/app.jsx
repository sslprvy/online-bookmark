import React from 'react';
import ReactDom from 'react-dom';

// Please, see the data-structure-proposal.json file
// for further information
var mockData = {
    isUeser: true,
    isMutable: true,
    data: [
        {
            title: "Example",
            url: "www.example.com",
            tags: [
                "quickFilterTag",
                "anotherQuickFilterTag"
            ]
        },
        {
            title: "AnotherExample",
            url: "www.anotherexample.com",
            tags: [
                "anotherQuickFilterTag"
            ]
        }
    ]
};

class List extends React.Component {
    render() {
        var urlObjects = this.props.objects.map(function (urlObject) {
            var tagObjects = urlObject.tags.map(function (tag, index) {
                var key = `${urlObject.title}-tag-${index}`;
                return (<span className="display-list-element-tag" key={key}>{tag}</span>)
            });
            return (
                <li className="display-list-element" key={urlObject.title}>
                    <div>
                        <span className="display-list-element-title">{urlObject.title}</span><br/>
                        <span className="display-list-element-url">{urlObject.url}</span><br/>
                        <span>{tagObjects}</span>
                    </div>
                </li>
            )
        });
        return <ul className="display-list">{urlObjects}</ul>
    }
};

export default class Main extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<div><List objects={this.props.userData.data} /></div>)
    }
}

ReactDom.render(<Main userData={mockData} />, document.getElementById('app-content'));
