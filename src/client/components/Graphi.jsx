import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import React, {
    Component
} from 'react';

// Parse the search string to get url parameters.
const search = window.location.search;

export default class extends Component {
    parameters = {};
    state = {
        uri: localStorage.getItem('graphiql:uri')
    }

    constructor(props) {
        super(props);

        search
            .substr(1)
            .split('&')
            .forEach(entry => {
                const eq = entry.indexOf('=');

                if (eq >= 0) {
                    this.parameters[decodeURIComponent(entry.slice(0, eq))] = decodeURIComponent(entry.slice(eq + 1));
                }
            });

        // if variables was provided, try to format it.
        if (this.parameters.variables) {
            try {
                this.parameters.variables = JSON.stringify(JSON.parse(this.parameters.variables), null, 2);
            } catch (e) {
                // Do nothing, we want to display the invalid JSON as a string, rather
                // than present an error.
            }
        }
    }

    onEditQuery(newQuery) {
        this.parameters.query = newQuery;
        this.updateURL();
    }

    onEditVariables(newVariables) {
        this.parameters.variables = newVariables;
        this.updateURL();
    }

    onEditOperationName(newOperationName) {
        this.parameters.operationName = newOperationName;
        this.updateURL();
    }

    updateURL() {
        const newSearch = '?' + Object.keys(this.parameters)
            .filter(key => {
                return Boolean(this.parameters[key]);
            }).map(key => {
                return `${encodeURIComponent(key)} = ${encodeURIComponent(this.parameters[key])}`;
            }).join('&');

        history.replaceState(null, null, newSearch);
    }

    // Defines a GraphQL fetcher using the fetch API.
    fetcher(graphQLParams) {
        const {
            uri
        } = this.state;

        return fetch(uri.indexOf('http') >= 0 ? uri : `http://${uri}`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(graphQLParams)
            })
            .then(response => response.text())
            .then(responseBody => {
                try {
                    return JSON.parse(responseBody);
                } catch (error) {
                    return responseBody;
                }
            });
    }

    setUri(e) {
        if(e.keyCode !== 13){
            return;
        }

        const uri = e.target.value;

        this.setState({
            uri
        }, () => {
            localStorage.setItem('graphiql:uri', uri);
        });
    }

    exit(){
        this.setState({
            uri: null
        }, () => {
            localStorage.removeItem('graphiql:uri');
            localStorage.removeItem('graphiql:variables');
            localStorage.removeItem('graphiql:variableEditorHeight');
            localStorage.removeItem('graphiql:query');
            localStorage.removeItem('graphiql:operationName');
            localStorage.removeItem('graphiql:editorFlex');
            localStorage.removeItem('graphiql:docExplorerWidth');
        });
    }

    render() {
        const {
            uri
        } = this.state;

        return uri ? (
                <section>
                    <button className="exit-button" onClick={::this.exit}>Exit</button>
                    <GraphiQL 
                        fetcher={::this.fetcher}
                        query={this.parameters.query}
                        variables={this.parameters.variables}
                        operationName={this.parameters.operationName}
                        onEditQuery={::this.onEditQuery}
                        onEditVariables={::this.onEditVariables}
                        onEditOperationName={::this.onEditOperationName}/>
                </section>
            ) : (
                <section className="uri-input">
                    <input type="text" placeholder="GraphQL Server URI (like: localhost:3000/graphql)" onKeyUp={::this.setUri}/>
                </section>
            );
    }
}
