webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(170);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Graphi = __webpack_require__(167);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_Graphi.Graphi, null), document.getElementById('graphiql'));

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Graphi = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _graphiql = __webpack_require__(168);
	
	var _graphiql2 = _interopRequireDefault(_graphiql);
	
	var _isomorphicFetch = __webpack_require__(296);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _react = __webpack_require__(170);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Parse the search string to get url parameters.
	var search = window.location.search;
	
	var Graphi = exports.Graphi = function (_Component) {
	    _inherits(Graphi, _Component);
	
	    function Graphi(props) {
	        _classCallCheck(this, Graphi);
	
	        var _this = _possibleConstructorReturn(this, (Graphi.__proto__ || Object.getPrototypeOf(Graphi)).call(this, props));
	
	        _this.parameters = {};
	
	
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
	
	    _createClass(Graphi, [{
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
	            var newSearch = '?' + Object.keys(parameters).filter(function (key) {
	                return Boolean(parameters[key]);
	            }).map(function (key) {
	                return encodeURIComponent(key) + ' = ' + encodeURIComponent(parameters[key]);
	            }).join('&');
	
	            history.replaceState(null, null, newSearch);
	        }
	
	        // Defines a GraphQL fetcher using the fetch API.
	
	    }, {
	        key: 'fetcher',
	        value: function fetcher(graphQLParams) {
	            return (0, _isomorphicFetch2.default)(window.location.origin, {
	                method: 'post',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(graphQLParams),
	                credentials: 'include'
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
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(_graphiql2.default, {
	                fetcher: this.fetcher.bind(this),
	                query: this.parameters.query,
	                variables: this.parameters.variables,
	                operationName: this.parameters.operationName,
	                onEditQuery: this.onEditQuery.bind(this),
	                onEditVariables: this.onEditVariables.bind(this),
	                onEditOperationName: this.onEditOperationName.bind(this) });
	        }
	    }]);

	    return Graphi;
	}(_react.Component);

/***/ }

});
//# sourceMappingURL=bundle.js.map