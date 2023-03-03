import * as React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from '.'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
export function mockNextUseRouter (pathname) {
  useRouter.mockImplementation(() => ({
    route: '',
    basePath: '',
    pathname,
    query: {},
    asPath: '',
    push: async () => true,
    replace: async () => true,
    reload: () => null,
    back: () => null,
    prefetch: async () => undefined,
    beforePopState: () => null,
    isFallback: false,
    events: {
      on: () => null,
      off: () => null,
      emit: () => null
    }
  }))
}

afterEach(cleanup)

describe('Header Component', () => {
  it('renders without crashing', () => {
    mockNextUseRouter('/')
    const { asFragment } = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders an active class on first navigation link', () => {
    mockNextUseRouter('/')
    const { container } = render(<Header />)
    const navigationItem = container.querySelector(
      '.header__navigation-item:first-child'
    )
    expect(navigationItem).toHaveClass('header__navigation-item--active')
  })
  it('toggles mobile navigation', () => {
    mockNextUseRouter('/')
    const { container } = render(<Header />)
    const toggleButton = container.querySelector(
      '.header__toggle-button'
    )
    fireEvent.click(toggleButton)
    const headerNavigation = container.querySelector('.header__navigation')
    expect(headerNavigation).toHaveClass('header__navigation--open')
  })
})
