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
        },
        tags: {
            type: new GraphQLList(GraphQLString),
            resolve() {
                return ['tag1', 'tag2'];
            }
        }
    }
});

const TagType = new GraphQLObjectType({
    name: 'TagType',
    fields: {
        label: {
            type: GraphQLString,
            resolve(obj, args) {
                return `tags ${args.id}`;
            }
        }
    }
});

const query = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
        tags: {
            type: new GraphQLList(TagType),
            resolve() {
                return [{
                    label: 'tag 1'
                }, {
                    label: 'tag 2'
                }];
            }
        },
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

const mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        setId: {
            type: MemberType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (obj, args) => {
                return {
                    id: args.id
                }
            }
        }
    }
});

const schema = new GraphQLSchema({
    query,
    mutation
});

export default schema;
