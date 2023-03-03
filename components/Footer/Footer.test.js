import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Footer } from '.'

afterEach(cleanup)

describe('Footer Component', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Footer />)
    expect(asFragment()).toMatchSnapshot()
  })
})
