import { ReactNode } from "react"

export const dice = (input: string): { rolls: number[], sum: number, sides: number } => {
  const match = input.match(/^(\d+)\s*?d(\d+)([+-]\d+)?$/)
  const count = parseInt(match[1] || '0', 10)
  const sides = parseInt(match[2] || '0', 10)
  const modifier = parseInt(match[3] || '0', 10)
  let sum = 0
  let rolls = []
  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * sides + 1.0)
    sum += roll
    rolls = [...rolls, roll]
  }
  sum += modifier
  return { sum, rolls, sides }
}

export const commaSeparateStrings = (words: string[], word: string = 'and') => {
  if (words.length < 2) return words[0]
  if (words.length === 2) return `${words[0]} and ${words[1]}`
  const head = words.slice(0, -1)
  const last = words[words.length - 1]
  return `${head.join(', ')}, ${word} ${last}`
}

export const commaSeparateComponents = (components: ReactNode[], word: string = 'and') => {
  if (components.length < 2) return components[0]
  if (components.length === 2) return <>{components[0]} and {components[1]}</>
  const head = components.slice(0, -1)
  const last = components[components.length - 1]
  return (
    <>
      {head.map((component, i) => <span key={i}>{component}{', '}</span>)}
      {`${word} `}
      {last}
    </>
  )
}

export const capitalize = (words: string) => {
  return words.split(/\s+/).map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')
}

export const matchTags = (tags: string[], regexp: RegExp): string[] => {
  return tags.filter((tag) => tag.match(regexp))
}

export const smallUid = () => {
  return Math.floor(Math.random() * Math.pow(36, 5)).toString(36)
}

export const randomColor = () => {
  return `hsl(${Math.floor(Math.random() * 256.0)}, 70%, 60%)`
}