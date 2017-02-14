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
	
	var _reactDom = __webpack_require__(29);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _components = __webpack_require__(167);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_components.Graphi, null), document.getElementById('app'));

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Graphi = undefined;
	
	var _Graphi = __webpack_require__(168);
	
	var _Graphi2 = _interopRequireDefault(_Graphi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Graphi = _Graphi2.default;

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _graphiql = __webpack_require__(169);
	
	var _graphiql2 = _interopRequireDefault(_graphiql);
	
	var _isomorphicFetch = __webpack_require__(292);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _class = function (_Component) {
	    _inherits(_class, _Component);
	
	    function _class(props) {
	        _classCallCheck(this, _class);
	
	        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));
	
	        _this.parameters = {};
	        _this.state = {
	            uri: localStorage.getItem('graphiql:uri') || '',
	            token: localStorage.getItem('graphiql:token'),
	            showEditor: localStorage.getItem('graphiql:showEditor') === 'true'
	        };
	        return _this;
	    }
	
	    _createClass(_class, [{
	        key: 'onEditQuery',
	        value: function onEditQuery(newQuery) {
	            this.parameters.query = newQuery;
	        }
	    }, {
	        key: 'onEditVariables',
	        value: function onEditVariables(newVariables) {
	            this.parameters.variables = newVariables;
	        }
	    }, {
	        key: 'onEditOperationName',
	        value: function onEditOperationName(newOperationName) {
	            this.parameters.operationName = newOperationName;
	        }
	
	        // Defines a GraphQL fetcher using the fetch API.
	
	    }, {
	        key: 'fetcher',
	        value: function fetcher(graphQLParams) {
	            var _state = this.state,
	                uri = _state.uri,
	                token = _state.token;
	
	
	            var url = uri.indexOf('http') >= 0 ? uri : 'http://' + uri;
	            var headers = {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'
	            };
	
	            if (token) {
	                url += '?token=' + token;
	
	                headers['Authorization'] = token;
	            }
	
	            return (0, _isomorphicFetch2.default)(url, {
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
	            var uri = e.target.value;
	
	            this.setState({
	                uri: uri
	            }, function () {
	                localStorage.setItem('graphiql:uri', uri);
	            });
	        }
	    }, {
	        key: 'setToken',
	        value: function setToken(e) {
	            var token = e.target.value;
	
	            this.setState({
	                token: token
	            }, function () {
	                localStorage.setItem('graphiql:token', token);
	            });
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(e) {
	            var isEnter = e.keyCode === 13;
	            var uri = this.state.uri;
	
	
	            this.setState({
	                showEditor: uri && isEnter
	            }, function () {
	                localStorage.setItem('graphiql:showEditor', uri && isEnter);
	            });
	        }
	    }, {
	        key: 'exit',
	        value: function exit() {
	            this.setState({
	                token: null,
	                showEditor: false
	            }, function () {
	                localStorage.removeItem('graphiql:token');
	                localStorage.removeItem('graphiql:showEditor');
	                localStorage.removeItem('graphiql:variableEditorHeight');
	                localStorage.removeItem('graphiql:editorFlex');
	                localStorage.removeItem('graphiql:docExplorerWidth');
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _state2 = this.state,
	                showEditor = _state2.showEditor,
	                uri = _state2.uri;
	
	
	            return showEditor ? _react2.default.createElement(
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
	                null,
	                _react2.default.createElement(
	                    'section',
	                    { className: 'input' },
	                    _react2.default.createElement('input', { type: 'text', placeholder: 'GraphQL Server URI (like: localhost:3000/graphql)', value: uri, onChange: this.setUri.bind(this), onKeyDown: this.onKeyDown.bind(this) }),
	                    _react2.default.createElement('input', { type: 'text', placeholder: 'Token', onChange: this.setToken.bind(this), onKeyDown: this.onKeyDown.bind(this) })
	                )
	            );
	        }
	    }]);

	    return _class;
	}(_react.Component);

	exports.default = _class;

/***/ }

});
//# sourceMappingURL=bundle.js.map