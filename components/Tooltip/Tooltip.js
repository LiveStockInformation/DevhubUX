import React, { useState } from 'react'

import styles from './Tooltip.module.scss'

const Tooltip = ({ className = ``, tip = 'No information', positionAbsoluteLeft }) => {
  const [active, setActive] = useState(false)

  return (
    <div className={`${styles['tooltip']} ${className} ${positionAbsoluteLeft ? `${styles['tooltip--absolute']}` : ``}`}>
      <button
        className={`${styles['tooltip__btn']}`}
        onMouseOver={() => {
          setActive(!active)
        }}
        onFocus={() => {
          setActive(true)
        }}
        onBlur={() => { setActive(!active) }}
        aria-labelledby='tooltip'
        aria-label='Tooltip'
      >
        <span className='visually-hidden'>Helpful Tooltip</span>
      </button>
      <div
        role='tooltip'
        id='tooltip'
        onMouseLeave={() => { setActive(!active) }}
        className={`${styles['tooltip__popper']} ${
          active ? styles['tooltip__popper--active'] : ``
        }`}
      >
        <div className={`${styles['tooltip__popper-content']}`}>{tip}</div>
      </div>
    </div>
  )
}

export default Tooltip
