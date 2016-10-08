webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(35);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _components = __webpack_require__(173);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_components.Graphi, null), document.getElementById('app'));

/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Graphi = undefined;
	
	var _Graphi = __webpack_require__(174);
	
	var _Graphi2 = _interopRequireDefault(_Graphi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Graphi = _Graphi2.default;

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _graphiql = __webpack_require__(175);
	
	var _graphiql2 = _interopRequireDefault(_graphiql);
	
	var _isomorphicFetch = __webpack_require__(297);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Parse the search string to get url parameters.
	var search = window.location.search;
	
	var _class = function (_Component) {
	    _inherits(_class, _Component);
	
	    function _class(props) {
	        _classCallCheck(this, _class);
	
	        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));
	
	        _this.parameters = {};
	        _this.state = {
	            uri: localStorage.getItem('graphiql:uri')
	        };
	
	
	        search.substr(1).split('&').forEach(function (entry) {
	            var eq = entry.indexOf('=');
	
	            if (eq >= 0) {
	                _this.parameters[decodeURIComponent(entry.slice(0, eq))] = decodeURIComponent(entry.slice(eq + 1));
	            }
	        });
	
	        // if variables was provided, try to format it.
	        if (_this.parameters.variables) {
	            try {
	                _this.parameters.variables = JSON.stringify(JSON.parse(_this.parameters.variables), null, 2);
	            } catch (e) {
	                // Do nothing, we want to display the invalid JSON as a string, rather
	                // than present an error.
	            }
	        }
	        return _this;
	    }
	
	    _createClass(_class, [{
	        key: 'onEditQuery',
	        value: function onEditQuery(newQuery) {
	            this.parameters.query = newQuery;
	            this.updateURL();
	        }
	    }, {
	        key: 'onEditVariables',
	        value: function onEditVariables(newVariables) {
	            this.parameters.variables = newVariables;
	            this.updateURL();
	        }
	    }, {
	        key: 'onEditOperationName',
	        value: function onEditOperationName(newOperationName) {
	            this.parameters.operationName = newOperationName;
	            this.updateURL();
	        }
	    }, {
	        key: 'updateURL',
	        value: function updateURL() {
	            var _this2 = this;
	
	            var newSearch = '?' + Object.keys(this.parameters).filter(function (key) {
	                return Boolean(_this2.parameters[key]);
	            }).map(function (key) {
	                return encodeURIComponent(key) + ' = ' + encodeURIComponent(_this2.parameters[key]);
	            }).join('&');
	
	            history.replaceState(null, null, newSearch);
	        }
	
	        // Defines a GraphQL fetcher using the fetch API.
	
	    }, {
	        key: 'fetcher',
	        value: function fetcher(graphQLParams) {
	            var uri = this.state.uri;
	
	
	            return (0, _isomorphicFetch2.default)(uri.indexOf('http') >= 0 ? uri : 'http://' + uri, {
	                method: 'post',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(graphQLParams)
	            }).then(function (response) {
	                return response.text();
	            }).then(function (responseBody) {
	                try {
	                    return JSON.parse(responseBody);
	                } catch (error) {
	                    return responseBody;
	                }
	            });
	        }
	    }, {
	        key: 'setUri',
	        value: function setUri(e) {
	            if (e.keyCode !== 13) {
	                return;
	            }
	
	            var uri = e.target.value;
	
	            this.setState({
	                uri: uri
	            }, function () {
	                localStorage.setItem('graphiql:uri', uri);
	            });
	        }
	    }, {
	        key: 'exit',
	        value: function exit() {
	            this.setState({
	                uri: null
	            }, function () {
	                localStorage.removeItem('graphiql:uri');
	                localStorage.removeItem('graphiql:variables');
	                localStorage.removeItem('graphiql:variableEditorHeight');
	                localStorage.removeItem('graphiql:query');
	                localStorage.removeItem('graphiql:operationName');
	                localStorage.removeItem('graphiql:editorFlex');
	                localStorage.removeItem('graphiql:docExplorerWidth');
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var uri = this.state.uri;
	
	
	            return uri ? _react2.default.createElement(
	                'section',
	                null,
	                _react2.default.createElement(
	                    'button',
	                    { className: 'exit-button', onClick: this.exit.bind(this) },
	                    'Exit'
	                ),
	                _react2.default.createElement(_graphiql2.default, {
	                    fetcher: this.fetcher.bind(this),
	                    query: this.parameters.query,
	                    variables: this.parameters.variables,
	                    operationName: this.parameters.operationName,
	                    onEditQuery: this.onEditQuery.bind(this),
	                    onEditVariables: this.onEditVariables.bind(this),
	                    onEditOperationName: this.onEditOperationName.bind(this) })
	            ) : _react2.default.createElement(
	                'section',
	                { className: 'uri-input' },
	                _react2.default.createElement('input', { type: 'text', placeholder: 'GraphQL Server URI (like: localhost:3000/graphql)', onKeyUp: this.setUri.bind(this) })
	            );
	        }
	    }]);

	    return _class;
	}(_react.Component);

	exports.default = _class;

/***/ }

});
//# sourceMappingURL=bundle.js.map