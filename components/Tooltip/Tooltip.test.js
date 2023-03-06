import * as React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Tooltip } from '.'

afterEach(cleanup)

describe('Tooltip component', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Tooltip tip='Test tooltip' />)
    expect(asFragment()).toMatchSnapshot()
  })
  it('shows a tooltip on mouse hover', () => {
    const { container } = render(<Tooltip tip='Test tooltip' />)
    const tooltipButton = container.querySelector('.tooltip__btn')
    const tooltipPopper = container.querySelector('.tooltip__popper')
    fireEvent.mouseOver(tooltipButton)
    expect(tooltipPopper).toHaveClass('tooltip__popper--active')
  })
  it('hides tooltip on mouse leave', () => {
    const { container } = render(<Tooltip tip='Test tooltip' />)
    const tooltipButton = container.querySelector('#tooltip')
    const tooltipPopper = container.querySelector('.tooltip__popper')
    fireEvent.mouseOver(tooltipButton)
    fireEvent.mouseOut(tooltipButton)
    expect(tooltipPopper).toHaveClass('tooltip__popper')
  })
  it('shows a tooltip on focus hover', () => {
    const { container } = render(<Tooltip tip='Test tooltip' />)
    const tooltipButton = container.querySelector('.tooltip__btn')
    const tooltipPopper = container.querySelector('.tooltip__popper')
    fireEvent.focus(tooltipButton)
    expect(tooltipPopper).toHaveClass('tooltip__popper--active')
  })
  it('hides tooltip on blur', () => {
    const { container } = render(<Tooltip tip='Test tooltip' />)
    const tooltipButton = container.querySelector('.tooltip__btn')
    const tooltipPopper = container.querySelector('.tooltip__popper')
    fireEvent.focus(tooltipButton)
    fireEvent.blur(tooltipButton)
    expect(tooltipPopper).toHaveClass('tooltip__popper')
  })
  it('has absolute positioning style, with absolute prop', () => {
    const { container } = render(
      <Tooltip tip='Test tooltip' positionAbsoluteLeft />
    )
    const tooltip = container.querySelector('.tooltip')
    expect(tooltip).toHaveClass('tooltip--absolute')
  })
})
