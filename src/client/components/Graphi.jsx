import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import React, {
    Component
} from 'react';

export default class extends Component {
    parameters = {};
    state = {
        uri: localStorage.getItem('graphiql:uri') || '',
        token: localStorage.getItem('graphiql:token'),
        showEditor: localStorage.getItem('graphiql:showEditor') === 'true'
    }

    constructor(props) {
        super(props);
    }

    onEditQuery(newQuery) {
        this.parameters.query = newQuery;
    }

    onEditVariables(newVariables) {
        this.parameters.variables = newVariables;
    }

    onEditOperationName(newOperationName) {
        this.parameters.operationName = newOperationName;
    }

    // Defines a GraphQL fetcher using the fetch API.
    fetcher(graphQLParams) {
        const {
            uri,
            token
        } = this.state;

        let url = uri.indexOf('http') >= 0 ? uri : `http://${uri}`;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (token) {
            url += `?token=${token}`;

            headers['Authorization'] = token;
        }

        return fetch(url, {
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
        const uri = e.target.value;

        this.setState({
            uri
        }, () => {
            localStorage.setItem('graphiql:uri', uri);
        });
    }

    setToken(e) {
        const token = e.target.value;

        this.setState({
            token
        }, () => {
            localStorage.setItem('graphiql:token', token);
        });
    }

    onKeyDown(e){
        const isEnter = e.keyCode === 13;
        const {
            uri
        } = this.state;

        this.setState({
            showEditor: uri && isEnter
        }, () => {
            localStorage.setItem('graphiql:showEditor', uri && isEnter);
        });
    }

    exit() {
        this.setState({
            token: null,
            showEditor: false
        }, () => {
            localStorage.removeItem('graphiql:token');
            localStorage.removeItem('graphiql:showEditor');
            localStorage.removeItem('graphiql:variableEditorHeight');
            localStorage.removeItem('graphiql:editorFlex');
            localStorage.removeItem('graphiql:docExplorerWidth');
        });
    }

    render() {
        const {
            showEditor,
            uri
        } = this.state;

        return showEditor ? (
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
            <section>
                    <section className="input">
                        <input type="text" placeholder="GraphQL Server URI (like: localhost:3000/graphql)" value={uri} onChange={::this.setUri} onKeyDown={::this.onKeyDown}/>
                        <input type="text" placeholder="Token" onChange={::this.setToken} onKeyDown={::this.onKeyDown}/>
                    </section>
                </section>
        );
    }
}
