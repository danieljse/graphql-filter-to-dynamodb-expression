
function countLogicKeysSubTree (logicTargetTree) {
  let internalTreeKeys = Object.keys(logicTargetTree[0])
  const logicKeystoRemove = ['and', 'or']
  internalTreeKeys = internalTreeKeys.filter(function (value) {
    return logicKeystoRemove.indexOf(value) === -1
  })

  return internalTreeKeys.length
}

const acceptedTypeFields = ['eq', 'ne', 'ge', 'gt', 'le', 'lt', 'attributeExists', 'attributeType', 'beginsWith', 'contains', 'notContains']

const filterExpressionStruct = {
  FilterExpression: '',
  ExpressionAttributeNames: {},
  ExpressionAttributeValues: {},
  logicIndex: 0,
  logicKeyNameCounter: 0,
  isKeyNameLogic: false,
  logicName: '',
  logicKeysSubTreeLength: 0,
  ExpressionAttributeNamesString: '',
  ExpressionAttributeValueNamesString: '',
  doneWithExpression: false
}

const grphqlToDynamoDBConditionExpression = (targetTree, lastkey) => {
  if (typeof targetTree === 'object') {
    const branchKeys = Object.keys(targetTree)

    branchKeys.forEach(branchKeyName => {
      switch (branchKeyName) {
        case 'eq':{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (#${filterExpressionStruct.ExpressionAttributeNamesString} = ${eqValueNAme})`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.eq
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'ne':{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (#${filterExpressionStruct.ExpressionAttributeNamesString} <> ${eqValueNAme})`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.ne
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'ge':{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (#${filterExpressionStruct.ExpressionAttributeNamesString} >= ${eqValueNAme})`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.ge
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'gt':{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (#${filterExpressionStruct.ExpressionAttributeNamesString} > ${eqValueNAme})`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.gt
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'le':{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (#${filterExpressionStruct.ExpressionAttributeNamesString} <= ${eqValueNAme})`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.le
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'lt':{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (#${filterExpressionStruct.ExpressionAttributeNamesString} < ${eqValueNAme})`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.lt
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'attributeExists' :{
          if (targetTree.attributeExists === 'true') {
            filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (attribute_exists(#${filterExpressionStruct.ExpressionAttributeNamesString}))`
          } else {
            filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (attribute_not_exists(#${filterExpressionStruct.ExpressionAttributeNamesString}))`
          }
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'attributeType':{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`

          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (attribute_type(#${filterExpressionStruct.ExpressionAttributeNamesString}, ${eqValueNAme}))`

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
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = attributeType
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'beginsWith' : {
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (begins_with(#${filterExpressionStruct.ExpressionAttributeNamesString}, ${eqValueNAme}))`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.beginsWith
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'contains' :{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (contains(#${filterExpressionStruct.ExpressionAttributeNamesString}, ${eqValueNAme}))`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.contains
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'notContains' :{
          const eqValueNAme = filterExpressionStruct.isKeyNameLogic ? `:${filterExpressionStruct.logicName}_${filterExpressionStruct.logicKeyNameCounter}_${filterExpressionStruct.logicIndex}_${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `:${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}`
          filterExpressionStruct.FilterExpression = `${(filterExpressionStruct.FilterExpression.length === 0 || (filterExpressionStruct.logicIndex === 0 && filterExpressionStruct.isKeyNameLogic)) ? `${filterExpressionStruct.FilterExpression}` : `${filterExpressionStruct.FilterExpression} AND`} (NOT contains(#${filterExpressionStruct.ExpressionAttributeNamesString}, ${eqValueNAme}))`
          filterExpressionStruct.ExpressionAttributeValues[eqValueNAme] = targetTree.notContains
          filterExpressionStruct.doneWithExpression = true
          break
        }
        case 'or':{
          const logicKeysSubTreeLength = countLogicKeysSubTree(targetTree[branchKeyName])
          filterExpressionStruct.FilterExpression = `${filterExpressionStruct.FilterExpression} OR (`
          filterExpressionStruct.logicIndex = 0
          filterExpressionStruct.logicKeysSubTreeLength = logicKeysSubTreeLength
          filterExpressionStruct.isKeyNameLogic = true
          filterExpressionStruct.logicKeyNameCounter = filterExpressionStruct.logicKeyNameCounter + 1
          filterExpressionStruct.logicName = `${branchKeyName}_`
          break
        }
        case 'and':{
          const logicKeysSubTreeLength = countLogicKeysSubTree(targetTree[branchKeyName])
          filterExpressionStruct.FilterExpression = `${filterExpressionStruct.FilterExpression} AND (`
          filterExpressionStruct.logicIndex = 0
          filterExpressionStruct.logicKeysSubTreeLength = logicKeysSubTreeLength
          filterExpressionStruct.isKeyNameLogic = true
          filterExpressionStruct.logicKeyNameCounter = filterExpressionStruct.logicKeyNameCounter + 1
          filterExpressionStruct.logicName = `${branchKeyName}_`
          break
        }
        default:
          if (typeof targetTree[branchKeyName] !== 'object' && !acceptedTypeFields.includes(lastkey)) { // prevents create the filter if the end off branch and no valid keyName was found
            filterExpressionStruct.doneWithExpression = true
          } else if (lastkey !== 'or' && lastkey !== 'and') {
            filterExpressionStruct.ExpressionAttributeNamesString = filterExpressionStruct.ExpressionAttributeNamesString ? `${filterExpressionStruct.ExpressionAttributeNamesString}.#${branchKeyName}` : `${filterExpressionStruct.ExpressionAttributeNamesString}${branchKeyName}`
            filterExpressionStruct.ExpressionAttributeValueNamesString = filterExpressionStruct.ExpressionAttributeValueNamesString ? `${filterExpressionStruct.ExpressionAttributeValueNamesString}_${branchKeyName}` : `${filterExpressionStruct.ExpressionAttributeValueNamesString}${branchKeyName}`
            filterExpressionStruct.ExpressionAttributeNames[`#${branchKeyName}`] = `${branchKeyName}`
          }
          break
      }

      if (filterExpressionStruct.doneWithExpression) {
        filterExpressionStruct.doneWithExpression = false
        if (filterExpressionStruct.isKeyNameLogic) {
          filterExpressionStruct.logicIndex = filterExpressionStruct.logicIndex + 1
        }
        if (branchKeys[branchKeys.length - 1] === branchKeyName) {
          filterExpressionStruct.ExpressionAttributeNamesString = ''
          filterExpressionStruct.ExpressionAttributeValueNamesString = ''
          if (filterExpressionStruct.logicIndex >= filterExpressionStruct.logicKeysSubTreeLength && filterExpressionStruct.isKeyNameLogic) {
            filterExpressionStruct.logicKeysSubTreeLength = 0
            filterExpressionStruct.isKeyNameLogic = false
            filterExpressionStruct.FilterExpression = `${filterExpressionStruct.FilterExpression} )`
            filterExpressionStruct.logicName = ''
          }
        }
      }

      return grphqlToDynamoDBConditionExpression(targetTree[branchKeyName], branchKeyName)
    })
  }

  return {
    FilterExpression: filterExpressionStruct.FilterExpression,
    ExpressionAttributeNames: filterExpressionStruct.ExpressionAttributeNames,
    ExpressionAttributeValues: filterExpressionStruct.ExpressionAttributeValues
  }
}

module.exports = {
  grphqlToDynamoDBConditionExpression
}
