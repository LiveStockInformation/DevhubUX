import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Breadcrumbs } from '.'

afterEach(cleanup)

describe('Breadcrumbs component', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Breadcrumbs items={[{ title: 'test' }]} />)
    expect(asFragment()).toMatchSnapshot()
  })
  it('renders nothing if 0 items', () => {
    const { asFragment } = render(<Breadcrumbs />)
    expect(asFragment()).toMatchSnapshot()
  })
  it('renders a back link if item has backlink property', () => {
    const { getByText } = render(<Breadcrumbs items={[{ title: 'test', back: true }]} />)
    const backlink = getByText('Back')
    expect(backlink).toBeInTheDocument()
  })
})
