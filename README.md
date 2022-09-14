<h1 align="center"> graphql-filter-to-dynamodb-expression</h1>

<hr/>

<h3> List of features </h3>

<ul>
  <li>Simplified graphql filter data modeling to DynamoDB filter expression</li>
  <li>Nested expression Example "user.name"</li>
  <li>Supported operations: 'eq', 'ne', 'ge', 'gt', 'le', 'lt', 'attributeExists', 'attributeType', 'beginsWith', 'contains', 'notContains', 'and', 'or'</li>
  
</ul>

<h3> Download & Installation </h3>

```shell
$ npm i graphql-filter-to-dynamodb-expression
```

<h3>Example</h3>

```shell
const { grphqlToDynamoDBConditionExpression } = require('graphql-filter-to-dynamodb-expression')
```
<h3> Code Demo </h3>

```shell
grphqlToDynamoDBConditionExpression(input.filter)
```

<h4>Input</h4>

```js
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
```

<h4>Output</h4>

```js
{
  FilterExpression: ' (#status <> :status_ne) AND (#user.#age <= :user_age_le) OR ( (#exampleId = :or__1_0_exampleId_eq) ) AND ( (contains(#email, :and__2_0_email_contains)) )',
  ExpressionAttributeNames: {
    '#status': 'status',
    '#user': 'user',
    '#age': 'age',
    '#exampleId': 'exampleId',
    '#email': 'email'
  },
  ExpressionAttributeValues: {
    ':status_ne': 'ACTIVE',
    ':user_age_le': '5',
    ':or__1_0_exampleId_eq': '123455',
    ':and__2_0_email_contains': '@'
  }
}
```

<h3>Authors or Acknowledgments</h3>
<ul>
  <li>Daniel Davila</li>
</ul>

<h3>License</h3>
