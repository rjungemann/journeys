```
dialogue:<name>
dialogue:<name>:<index>
dialogue:<name>:done

# TODO
dialogue:<name>:tag:<...tag>

skill-check:<name>
skill-check:<name>:success
skill-check:<name>:failure

# TODO: Figure these out
skill-check:<name>:success:next:<scene>
skill-check:<name>:failure:next:<scene>

# TODO
skill-check:<name>:success:tag:<...tag>
skill-check:<name>:failure:tag:<...tag>

choice:<name>
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