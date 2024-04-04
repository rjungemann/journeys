## TODO

* Items can have tidbits
* Choices
* Tidbits can have dialogue
* Tidbits can have skill checks
* Tidbits can have choices
* Tidbit condition: verify item in inventory
* Tidbit condition: consume item in inventory
* Combat
* Tidbit condition: verify character in party

* Tag behaviors, movement
* Other tag behaviors

```
dialogue:<name>
dialogue:<name>:<index>
dialogue:<name>:done

skill-check:<name>
skill-check:<name>:success
skill-check:<name>:failure

description:<name>

# TODO
choice:<name>
choice:<name>:<value>
```

```typescript
type Dialogue {
  messages: string[]
  tags: string[]
}

const entity = {
  name: 'alice',
  tags: ['dialogue:one'] // Can have multiple dialogues
  // ...
}

const dialogue = {
  name: 'one',
  messages: [
    'Hello, world!',
    'What?',
    'Goodbye, cruel world!'
  ],
  tags: [
    'skill-check:x:intelligence:mechanics:8',
    'skill-check:x:success:tag:dialogue:two',
    'skill-check:x:failure:tag:dialogue:three'
  ]
}
```

A room has tidbits
An entity has tidbits
An item has tidbits

A tidbit has an optional condition tag
A tidbit may have a:
  Description (markdown)