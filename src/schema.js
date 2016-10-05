import {
    Observable
} from 'rxjs';

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} from 'graphql';

import {
    getFieldList
} from './utils';

const TicketType = new GraphQLObjectType({
    name: 'TicketType',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: obj => obj.id
        },
        message: {
            type: GraphQLString,
            resolve: obj => `Member: ${obj.memberId}, Ticket: ${obj.id}`
        }
    }
});

const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: obj => obj.id
        },
        name: {
            type: GraphQLString,
            resolve: obj => `Member ${obj.id}`
        },
        tickets: {
            type: new GraphQLList(TicketType),
            resolve(obj) {
                return Observable.of([{
                    id: 3,
                    memberId: obj.id
                }, {
                    id: 4,
                    memberId: obj.id
                }])
                .delay(1000)
                .toPromise();
            }
        }
    }
});

const ProjectType = new GraphQLObjectType({
    name: 'ProjectType',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: obj => obj.id
        },
        name: {
            type: GraphQLString,
            resolve: obj => `Project ${obj.id}`
        },
        members: {
            type: new GraphQLList(MemberType),
            resolve() {
                return [{
                    id: 1
                }, {
                    id: 2
                }];
            }
        }
    }
});

const query = new GraphQLObjectType({
    name: 'RootType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(obj, args, context, ast) {
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
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (obj, args) => ({
                id: args.id
            })
        }
    }
});

const schema = new GraphQLSchema({
    query
});

export default schema;
