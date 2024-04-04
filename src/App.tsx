import { MDXProvider } from '@mdx-js/react'
import { GameProvider, ThemeProvider } from "./game/context"
import { GameView } from "./game/views/GameView"

const mdxComponents = {
  
}

export const App = () => {
  return (
    <ThemeProvider>
      <MDXProvider components={mdxComponents}>
        <GameProvider>
          <GameView />
        </GameProvider>
      </MDXProvider>
    </ThemeProvider>
  )
}
