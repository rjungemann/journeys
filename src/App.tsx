import { MDXProvider } from '@mdx-js/react'
import { GameProvider, useGame } from "./game/context"
import { GameView } from "./game/views/GameView"

const mdxComponents = {
  
}

export const App = () => {
  return (
    <MDXProvider components={mdxComponents}>
      <GameProvider>
        <GameView />
      </GameProvider>
    </MDXProvider>
  )
}
