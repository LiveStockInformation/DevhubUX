import React from 'react'

import styles from './Input.module.scss'

const Input = React.forwardRef(({className, small, error, inline, id, name, type, value, label, hint, lowerHint, disabled, maxLength, placeholder, ariaDescribedBy, ariaInvalid, ariaRequired = false, readOnly = false, onFocus, onChange, onBlur }, ref) => {
  return (
    <div className={`ls-form-group ${error ? `ls-form-group--error` : ''} ${inline ? `ls-inline-form` : ''} ${small ? `ls-form--small` : ``}`} >
      {label && <label className='ls-label' htmlFor={id}>{label}</label>}
      {hint && <p className='ls-hint m--0'>{hint}</p>}
      {lowerHint && <p className='ls-hint m--b-xlarge'>{lowerHint}</p>}

      {error && (
        <span className='ls-error-message' id={`error-msg-for-${id}`}>
          <span className='ls-visually-hidden'>Error:</span> {error}
        </span>
      )}

      <input
        autoComplete='false'
        className={`${className} ${styles['ls-input']} ${error ? styles['ls-input--error'] : ''} ${readOnly ? `input-readonly` : ''} ${small ? styles['ls-input--small'] : ``}`}
        ref={ref}
        id={id}
        type={type}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  )
})

export default Input
