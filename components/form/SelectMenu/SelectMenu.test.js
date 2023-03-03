import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import { SelectMenu } from '.'

afterEach(cleanup)

describe('SelectMenu Component', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(
      <SelectMenu
        label='Test'
        id='Test'
        items={[
          {
            label: 'Item 1',
            value: '1'
          },
          {
            label: 'Item 2',
            value: '2'
          }
        ]}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
