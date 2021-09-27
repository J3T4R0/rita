# Unary operator Schema

```txt
https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                              |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [operator.json*](../../src/schema/operator.json "open original schema") |

## 1 Type

`object` ([Unary operator](operator-oneof-unary-operator.md))

# 1 Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                        |
| :------------------------ | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [Operator](operator-oneof-unary-operator-properties-type.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1/properties/type")             |
| [parameters](#parameters) | `array`  | Required | cannot be null | [Operator](operator-oneof-unary-operator-properties-parameters.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1/properties/parameters") |

## type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Operator](operator-oneof-unary-operator-properties-type.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value   | Explanation |
| :------ | :---------- |
| `"not"` |             |

## parameters



`parameters`

*   is required

*   Type: an array of merged types ([Term](term.md))

*   cannot be null

*   defined in: [Operator](operator-oneof-unary-operator-properties-parameters.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1/properties/parameters")

### parameters Type

an array of merged types ([Term](term.md))

### parameters Constraints

**maximum number of items**: the maximum number of items for this array is: `1`

**minimum number of items**: the minimum number of items for this array is: `1`
