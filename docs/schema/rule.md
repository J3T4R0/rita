# Rule Schema

```txt
https://raw.githubusercontent.com/educorvi/rita/main/src/schema/rule.json
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                     |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [rule.json](../../src/schema/rule.json "open original schema") |

## Rule Type

`object` ([Rule](rule.md))

# Rule Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                                               |
| :------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------- |
| [id](#id)     | `string` | Required | cannot be null | [Rule](rule-properties-id.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/rule.json#/properties/id") |
| [rule](#rule) | Merged   | Required | cannot be null | [Rule](term.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/term.json#/properties/rule")             |

## id



`id`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Rule](rule-properties-id.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/rule.json#/properties/id")

### id Type

`string`

## rule



`rule`

*   is required

*   Type: merged type ([Term](term.md))

*   cannot be null

*   defined in: [Rule](term.md "https://raw.githubusercontent.com/educorvi/rita/main/src/schema/term.json#/properties/rule")

### rule Type

merged type ([Term](term.md))

one (and only one) of

*   one (and only one) of

    *   [Non-Unary operator](operator-oneof-non-unary-operator.md "check type definition")

    *   [Unary operator](operator-oneof-unary-operator.md "check type definition")

*   [Atom](atom.md "check type definition")
