'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rxjs = require('rxjs');

var _graphql = require('graphql');

var _utils = require('./utils');

var TicketType = new _graphql.GraphQLObjectType({
    name: 'TicketType',
    fields: {
        id: {
            type: _graphql.GraphQLInt,
            resolve: function resolve(obj) {
                return obj.id;
            }
        },
        message: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return 'Member: ' + obj.memberId + ', Ticket: ' + obj.id;
            }
        }
    }
});

var MemberType = new _graphql.GraphQLObjectType({
    name: 'MemberType',
    fields: {
        id: {
            type: _graphql.GraphQLInt,
            resolve: function resolve(obj) {
                return obj.id;
            }
        },
        name: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return 'Member ' + obj.id;
            }
        },
        tickets: {
            type: new _graphql.GraphQLList(TicketType),
            resolve: function resolve(obj) {
                return _rxjs.Observable.of([{
                    id: 3,
                    memberId: obj.id
                }, {
                    id: 4,
                    memberId: obj.id
                }]).delay(1000).toPromise();
            }
        }
    }
});

var ProjectType = new _graphql.GraphQLObjectType({
    name: 'ProjectType',
    fields: {
        id: {
            type: _graphql.GraphQLInt,
            resolve: function resolve(obj) {
                return obj.id;
            }
        },
        name: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return 'Project ' + obj.id;
            }
        },
        members: {
            type: new _graphql.GraphQLList(MemberType),
            resolve: function resolve() {
                return [{
                    id: 1
                }, {
                    id: 2
                }];
            }
        }
    }
});

var TagsType = new _graphql.GraphQLObjectType({
    name: 'TagsType',
    fields: {
        tags: {
            type: new _graphql.GraphQLList(_graphql.GraphQLString),
            resolve: function resolve() {
                return ['tag1', 'tag2'];
            }
        }
    }
});

var query = new _graphql.GraphQLObjectType({
    name: 'QueryType',
    fields: {
        tags: {
            type: new _graphql.GraphQLList(_graphql.GraphQLString),
            resolve: function resolve() {
                return ['tag1', 'tag2'];
            }
        },
        projects: {
            type: new _graphql.GraphQLList(ProjectType),
            resolve: function resolve(obj, args, context, ast) {
                return [{
                    id: 1
                }, {
                    id: 2
                }];
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: {
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
                }
            },
            resolve: function resolve(obj, args) {
                return {
                    id: args.id
                };
            }
        }
    }
});

var mutation = new _graphql.GraphQLObjectType({
    name: 'MutationType',
    fields: {
        setId: {
            type: MemberType,
            args: {
                id: {
                    type: _graphql.GraphQLInt
                }
            },
            resolve: function resolve(obj, args) {
                return {
                    id: args.id
                };
            }
        }
    }
});

var schema = new _graphql.GraphQLSchema({
    query: query,
    mutation: mutation
});

exports.default = schema;