import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import React, {
    Component
} from 'react';

// Parse the search string to get url parameters.
const search = window.location.search;

export class Graphi extends Component {
    parameters = {};

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
        const newSearch = '?' + Object.keys(parameters)
            .filter(key => {
                return Boolean(parameters[key]);
            }).map(key => {
                return `${encodeURIComponent(key)} = ${encodeURIComponent(parameters[key])}`;
            }).join('&');

        history.replaceState(null, null, newSearch);
    }

    // Defines a GraphQL fetcher using the fetch API.
    fetcher(graphQLParams) {
        return fetch(window.location.origin, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(graphQLParams),
                credentials: 'include',
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

    render(){
        return <GraphiQL 
                    fetcher={::this.fetcher}
                    query={this.parameters.query}
                    variables={this.parameters.variables}
                    operationName={this.parameters.operationName}
                    onEditQuery={::this.onEditQuery}
                    onEditVariables={::this.onEditVariables}
                    onEditOperationName={::this.onEditOperationName}/>
    }
}
