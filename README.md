## TODO

* Combine entities and items?

```
dialogue:<name>
dialogue:<name>:<index>
dialogue:<name>:done
dialogue:<name>:tag:<...tag>

skill-check:<name>
skill-check:<name>:success
skill-check:<name>:failure

# TODO
skill-check:<name>:success:tag:<...tag>
skill-check:<name>:failure:tag:<...tag>

# TODO
choice:<name>

# TODO
choice:<name>:<value>

# TODO
skill-check:<name>:<value>:tag:<...tag>
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