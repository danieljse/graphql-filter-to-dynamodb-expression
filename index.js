
function countLogicKeysSubTree (logicTargetTree) {
  let internalTreeKeys = Object.keys(logicTargetTree[0])
  const logicKeystoRemove = ['and', 'or']
  internalTreeKeys = internalTreeKeys.filter(function (value) {
    return logicKeystoRemove.indexOf(value) === -1
  })

  return internalTreeKeys.length
}

const acceptedTypeFields = ['eq', 'ne', 'ge', 'gt', 'le', 'lt', 'attributeExists', 'attributeType', 'beginsWith', 'contains', 'notContains']

let FilterExpression = ''
const ExpressionAttributeNames = {}
const ExpressionAttributeValues = {}
let logicIndex = 0
let logicKeyNameCounter = 0
let isKeyNameLogic = false
let logicName = ''
let logicKeysSubTreeLength = 0
let ExpressionAttributeNamesString = ''
let ExpressionAttributeValueNamesString = ''
let doneWithExpression = false

const graphqlToDynamoDBConditionExpression = (targetTree, lastkey) => {
  if (typeof targetTree === 'object') {
    const branchKeys = Object.keys(targetTree)

    branchKeys.forEach(branchKeyName => {
      switch (branchKeyName) {
        case 'eq':{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (#${ExpressionAttributeNamesString} = ${eqValueNAme})`
          ExpressionAttributeValues[eqValueNAme] = targetTree.eq
          doneWithExpression = true
          break
        }
        case 'ne':{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (#${ExpressionAttributeNamesString} <> ${eqValueNAme})`
          ExpressionAttributeValues[eqValueNAme] = targetTree.ne
          doneWithExpression = true
          break
        }
        case 'ge':{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (#${ExpressionAttributeNamesString} >= ${eqValueNAme})`
          ExpressionAttributeValues[eqValueNAme] = targetTree.ge
          doneWithExpression = true
          break
        }
        case 'gt':{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (#${ExpressionAttributeNamesString} > ${eqValueNAme})`
          ExpressionAttributeValues[eqValueNAme] = targetTree.gt
          doneWithExpression = true
          break
        }
        case 'le':{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (#${ExpressionAttributeNamesString} <= ${eqValueNAme})`
          ExpressionAttributeValues[eqValueNAme] = targetTree.le
          doneWithExpression = true
          break
        }
        case 'lt':{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (#${ExpressionAttributeNamesString} < ${eqValueNAme})`
          ExpressionAttributeValues[eqValueNAme] = targetTree.lt
          doneWithExpression = true
          break
        }
        case 'attributeExists' :{
          if (targetTree.attributeExists === 'true') {
            FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (attribute_exists(#${ExpressionAttributeNamesString}))`
          } else {
            FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (attribute_not_exists(#${ExpressionAttributeNamesString}))`
          }
          doneWithExpression = true
          break
        }
        case 'attributeType':{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`

          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (attribute_type(#${ExpressionAttributeNamesString}, ${eqValueNAme}))`

          let attributeType
          switch (targetTree.attributeType) {
            case 'string':{
              attributeType = 'S'
              break
            }
            case 'stringSet':{
              attributeType = 'SS'
              break
            }
            case 'binary':{
              attributeType = 'B'
              break
            }
            case 'binarySet':{
              attributeType = 'BS'
              break
            }
            case 'bool':{
              attributeType = 'BOOL'
              break
            }
            case 'list':{
              attributeType = 'L'
              break
            }
            case 'map':{
              attributeType = 'M'
              break
            }
            case 'number':{
              attributeType = 'N'
              break
            }
            case 'numberSet':{
              attributeType = 'NS'
              break
            }
            case '_null':{
              attributeType = 'NULL'
              break
            }
            default:
              break
          }
          ExpressionAttributeValues[eqValueNAme] = attributeType
          doneWithExpression = true
          break
        }
        case 'beginsWith' : {
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (begins_with(#${ExpressionAttributeNamesString}, ${eqValueNAme}))`
          ExpressionAttributeValues[eqValueNAme] = targetTree.beginsWith
          doneWithExpression = true
          break
        }
        case 'contains' :{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (contains(#${ExpressionAttributeNamesString}, ${eqValueNAme}))`
          ExpressionAttributeValues[eqValueNAme] = targetTree.contains
          doneWithExpression = true
          break
        }
        case 'notContains' :{
          const eqValueNAme = isKeyNameLogic ? `:${logicName}_${logicKeyNameCounter}_${logicIndex}_${ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${ExpressionAttributeValueNamesString}_${branchKeyName}`
          FilterExpression = `${(FilterExpression.length === 0 || (logicIndex === 0 && isKeyNameLogic)) ? `${FilterExpression}` : `${FilterExpression} AND`} (NOT contains(#${ExpressionAttributeNamesString}, ${eqValueNAme}))`
          ExpressionAttributeValues[eqValueNAme] = targetTree.notContains
          doneWithExpression = true
          break
        }
        case 'or':{
          logicKeysSubTreeLength = countLogicKeysSubTree(targetTree[branchKeyName])
          FilterExpression = `${FilterExpression} OR (`
          logicIndex = 0
          isKeyNameLogic = true
          logicKeyNameCounter = logicKeyNameCounter + 1
          logicName = `${branchKeyName}_`
          break
        }
        case 'and':{
          logicKeysSubTreeLength = countLogicKeysSubTree(targetTree[branchKeyName])
          FilterExpression = `${FilterExpression} AND (`
          logicIndex = 0
          isKeyNameLogic = true
          logicKeyNameCounter = logicKeyNameCounter + 1
          logicName = `${branchKeyName}_`
          break
        }
        default:
          if (typeof targetTree[branchKeyName] !== 'object' && !acceptedTypeFields.includes(lastkey)) { // prevents create the filter if the end off branch and no valid keyName was found
            doneWithExpression = true
          } else if (lastkey !== 'or' && lastkey !== 'and') {
            ExpressionAttributeNamesString = ExpressionAttributeNamesString ? `${ExpressionAttributeNamesString}.#${branchKeyName}` : `${ExpressionAttributeNamesString}${branchKeyName}`
            ExpressionAttributeValueNamesString = ExpressionAttributeValueNamesString ? `${ExpressionAttributeValueNamesString}_${branchKeyName}` : `${ExpressionAttributeValueNamesString}${branchKeyName}`
            ExpressionAttributeNames[`#${branchKeyName}`] = `${branchKeyName}`
          }
          break
      }

      if (doneWithExpression) {
        doneWithExpression = false
        if (isKeyNameLogic) {
          logicIndex = logicIndex + 1
        }
        if (branchKeys[branchKeys.length - 1] === branchKeyName) {
          ExpressionAttributeNamesString = ''
          ExpressionAttributeValueNamesString = ''
          if (logicIndex >= logicKeysSubTreeLength && isKeyNameLogic) {
            logicKeysSubTreeLength = 0
            isKeyNameLogic = false
            FilterExpression = `${FilterExpression} )`
            logicName = ''
          }
        }
      }

      return graphqlToDynamoDBConditionExpression(targetTree[branchKeyName], branchKeyName)
    })
  }

  return {
    FilterExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues
  }
}

module.exports = {
  graphqlToDynamoDBConditionExpression
}
