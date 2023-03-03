import React from 'react'

import styles from './SelectMenu.module.scss'

const SelectMenu = ({ id, name, label, value, items, onChange, error, required, hiddenLabel, ariaLabel, apiService, defaultValue }) => {
  return (
    <div className={`ls-form-group ${apiService ? 'api-service-select' : ''} ${error ? 'ls-form-group--error' : ''}`}>
      {error && (
        <span className='ls-error-message' id={`error-msg-for-${id}`}>
          <span className='ls-visually-hidden'>Error: </span> {error}
        </span>
      )}

      <div className={`${styles['ls-select']} ${error ? styles['ls-select--error'] : ''}`}>
        {label && <label className={`ls-label ${hiddenLabel ? 'ls-visually-hidden' : ''}`} htmlFor={id}>{label}</label>}
        <select defaultValue={defaultValue} aria-label={ariaLabel} required={required} className={styles['ls-select']} id={id} name={name} value={value} onChange={onChange}>
          {items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </div>
    </div>
  )
}

export default SelectMenu
