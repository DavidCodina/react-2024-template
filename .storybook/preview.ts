import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import '../src/styles/main.css'

// .storybook/preview.ts

//# https://github.com/storybookjs/storybook/issues/25067
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS
    },
    options: {
      // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy
      // Stories can also be sorted usign a sort function, but that look kind of complicated.
      storySort: {
        // method: '',
        // stories that don't match an item in the order list will appear after the items in the list.
        order: ['Example', 'Components', ['TWCounter']]
        // locales: '',
      }
    }
  }
}

export default preview
