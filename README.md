## TODO

* Move entity views into room view
* Items as entities?
* Choices
* Combat
* Expand `conditionTag` into `Condition` type
* Condition: verify item in inventory
* Condition: consume item in inventory
* Condition: verify character in party

* Tag behaviors, movement
* Other tag behaviors

### Rooms

TODO

### Entities

TODO

### Attachments

Add these tags to your entities to map them to attachments. Sophisticated behavior can be created by the careful placement of tags.

```
description:<name>

dialogue:<name>
dialogue:<name>:<index>
dialogue:<name>:done

choice:<name>
choice:<name>:<value>

skill-check:<name>
skill-check:<name>:success
skill-check:<name>:failure

item-check:<name>
item-check:<name>:done
```
