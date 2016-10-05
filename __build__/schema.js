'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var count = 0;

var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            count: {
                type: _graphql.GraphQLInt,
                resolve: function resolve() {
                    return count;
                }
            }
        }
    })
});

exports.default = schema;