import { MDXProvider } from '@mdx-js/react'
import { GameProvider, ThemeProvider, useGame } from "./game/context"
import { GameView } from "./game/views/GameView"
import { useEffect, useState } from 'react'

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
