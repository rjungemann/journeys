## TODO

* Party view
* Change party representative in party view
* Editor section
* Multiple `conditionTags`, with an optional `!` prefix for negation
* Other tag behaviors for movement and other activity?
* Combat
* Markdown

### Rooms

* A Room has, among other fields, a name, and tags
* A Room has Descriptions (see below)
* A Room has Entities (see below)
* A Room has Exits
  * An Exit has, among other fields, a "to" name (name of a different room)

### Entities

* An Entity has, among other fields, a name, and tags
* An Entity has Descriptions (see below)
* An Entity has Attachments (see below)
* An Entity has Items (see below)

### Items

TODO

### Tags and Attachments

Tags can be used to influence the behavior of entities, and trigger the behavior of attachments.

The following attachment types are supported:

* Description
  * Can be conditional on a tag being set
  * Shows a description for an entity (or room)
* Dialogue
  * Can be conditional on a tag being set
  * Show a sequence of dialogue
  * Will set a tag when dialogue is complete
* Choice
  * Can be conditional on a tag being set
  * Prompts for a response to a choice
  * Will set a tag depending on the response given
* Item Check
  * Can be conditional on a tag being set
  * Three possible variants:
    * Give the character an item
    * Take an item from a character
    * Verify a character has an item
  * Will set a tag when complete
* Skill Check
  * Can be conditional on a tag being set
  * Prompts the user for a skill check
  * Will set a respective tag if the character succeeds or fails
* Party Check
  * Can be conditional on a tag being set
  * Two variants:
    * Check a member is in your party
    * Check a member is not in your party
  * Will set a respective tag if the check succeeds or fails

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

party-check:<name>
party-check:<name>:done

# Cause the entity to move from room to room periodically
wandering
# Will move on their own during combat
offensive
# Will attack those not on their side in combat
hostile
# If in the same room, will jump to their aid
# If enters room during combat, will also jump to their aid
ally:<name>
```
