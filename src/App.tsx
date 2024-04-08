import { MDXProvider } from '@mdx-js/react'
import { GameConsumer, GameProvider, ThemeProvider } from './game/context'
import { GameView } from './game/views/GameView'
import { ErrorBoundary } from './game/views/ErrorBoundary'
import { T } from './game/views/T'

const mdxComponents = {}

export const App = () => {
  return (
    <ThemeProvider>
      <MDXProvider components={mdxComponents}>
        <GameProvider>
          <ErrorBoundary>
            <p><T path="sample.message" locals={{ name: 'Alice' }} /></p>
            <GameView />
          </ErrorBoundary>
        </GameProvider>
      </MDXProvider>
    </ThemeProvider>
  )
}
