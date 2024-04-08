import ejs from 'ejs'
import { marked } from 'marked'
import { Game } from '../data'
import { useGame } from '../context'

export const locate = (obj: any) => (path: string) => {
  if (!path) return obj
  const properties = path.split('.')
  return locate(obj[properties.shift()])(properties.join('.'))
}

export const tFn =
  (state: Game) => (path: string, locals?: Record<string, any>) => {
    const lang = document.documentElement.lang
    const obj = state.strings[lang]
    const string = locate(obj)(path)
    const ejsRender = ejs.render(string, locals)
    const markdownRender = marked.parse(ejsRender)
    return markdownRender
  }

export const T = ({
  path,
  locals = {},
}: {
  path: string
  locals?: Record<string, any>
}) => {
  const { state } = useGame()
  return <span dangerouslySetInnerHTML={{ __html: tFn(state)(path, locals) }} />
}

export const useT = () => {
  const { state } = useGame()
  return { t: tFn(state) }
}
