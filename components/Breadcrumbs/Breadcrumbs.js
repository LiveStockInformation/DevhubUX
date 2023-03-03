import React from 'react'

import styles from './Breadcrumbs.module.scss'
import { LsLink } from '../LsLink'

const Breadcrumbs = ({ items }) => {
  if (!items) return null

  const backLink = items.find((item) => (item.back ? item : false))

  if (backLink) {
    return (
      <LsLink
        className={`${styles['ls-breadcrumbs__back-link']}`}
        url={backLink.href}
      >
        Back<span className='ls-visually-hidden'> {backLink.back}</span>
      </LsLink>
    )
  }

  const lastIndex = items.length - 1

  return (
    <div role='navigation' aria-label='breadcrumb navigation' className={`${styles['ls-breadcrumbs']}`}>
      <ol className={`${styles['ls-breadcrumbs__list']}`}>
        <li className={`${styles['ls-breadcrumbs__list-item']}`}>
          <a className={`${styles['ls-breadcrumbs__link']}`} href='/'>
            Home
          </a>
        </li>
        {items.map((item, index) => {
          if (lastIndex === index) {
            return (
              <li
                className={`${styles['ls-breadcrumbs__list-item']}`}
                aria-current='page'
                key={item.title + index}
              >
                {item.title}{' '}
              </li>
            )
          }

          return (
            <li
              className={`${styles['ls-breadcrumbs__list-item']}`}
              key={item.title + index}
            >
              <a
                className={`${styles['ls-breadcrumbs__link']}`}
                href={item.href}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Breadcrumbs
