## TODO

* Multiple `conditionTags`, with an optional `!` prefix for negation
* Tag behaviors, movement
* Other tag behaviors
* Combat

### Rooms

TODO

### Entities

TODO

### Items

TODO

### Tags and Attachments

There are the following kinds of attachments: Descriptions, Dialogues, Choices, Item Checks, Skill Checks, and Party Checks.

Add these tags to your entities to map them to attachments. Sophisticated behavior can be created by the careful placement of tags.

```
# Room tags

description:<name>

# Entity Tags

description:<name>

dialogue:<name>:0
dialogue:<name>:<index>
dialogue:<name>:done

choice:<name>
choice:<name>:<value>

skill-check:<name>
skill-check:<name>:success
skill-check:<name>:failure

item-check:<name>
item-check:<name>:done

# TODO: A way to make sure a character is in the party
party-check:<name>
party-check:<name>:done
```
