# Comparison Schema

```txt
https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json
```

Compare strings, dates or numbers with each other

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                 |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [comparison.json](../../src/schema/comparison.json "open original schema") |

## Comparison Type

`object` ([Comparison](comparison.md))

## Comparison Examples

```json
{
  "comment": "This evaluates to \"5>2\"",
  "type": "comparison",
  "operation": "greater",
  "parameters": [
    5,
    2
  ]
}
```

```json
{
  "comment": "Check two Strings for equality",
  "type": "comparison",
  "operation": "equal",
  "parameters": [
    "test",
    "test1"
  ]
}
```

# Comparison Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                 |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [Comparison](comparison-properties-type.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json#/properties/type")             |
| [operation](#operation)   | `string` | Required | cannot be null | [Comparison](comparison-properties-operation.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json#/properties/operation")   |
| [parameters](#parameters) | `array`  | Required | cannot be null | [Comparison](comparison-properties-parameters.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json#/properties/parameters") |

## type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Comparison](comparison-properties-type.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json#/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"comparison"` |             |

## operation

Selects how the parameters should be compared

`operation`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Comparison](comparison-properties-operation.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json#/properties/operation")

### operation Type

`string`

### operation Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value              | Explanation |
| :----------------- | :---------- |
| `"greater"`        |             |
| `"smaller"`        |             |
| `"greaterOrEqual"` |             |
| `"smallerOrEqual"` |             |
| `"equal"`          |             |

## parameters



`parameters`

*   is required

*   Type: an array of merged types ([Details](comparison-properties-parameters-items.md))

*   cannot be null

*   defined in: [Comparison](comparison-properties-parameters.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json#/properties/parameters")

### parameters Type

an array of merged types ([Details](comparison-properties-parameters-items.md))

### parameters Constraints

**maximum number of items**: the maximum number of items for this array is: `2`

**minimum number of items**: the minimum number of items for this array is: `2`
