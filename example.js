const { graphqlToDynamoDBConditionExpression } = require('../graphql-filter-to-dynamodb-expression') // testing locally

const filterJson = {
  filter: {
    status: {
      ne: 'ACTIVE'
    },
    user: {
      age: {
        le: '5'
      }
    },
    or: [
      {
        exampleId: {
          eq: '123455'
        },
        users: {
          user: {
            name: {
              attributeType: 'string'
            }
          }
        },
        and: [
          {
            email: {
              contains: '@'
            }
          }
        ]
      }
    ]
  }

}
console.log(graphqlToDynamoDBConditionExpression(filterJson.filter))
