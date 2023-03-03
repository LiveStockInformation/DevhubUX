import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { LsLink } from '../LsLink'


import { getContent } from '../../content/site'

import styles from './Header.module.scss'

const content = getContent('heading')
const appContent = getContent('app')

const Header = ({ highlight }) => {
  const router = useRouter()
  const [navToggled, setNavToggled] = useState(false)

  const toggleNav = (e) => {
    e.preventDefault()
    setNavToggled(!navToggled)
  }

  return (
    <header className={styles['header']}>
      <div className={styles['header__content']}>
        <a href='#main-content' className={styles['header__skip-link']}>
          {content.skipToMain}
        </a>
        <div className={styles['header__ls-logo']}>
          <a href='/' className={styles['header__ls-logo-link']}>
            <span className='vis-hide'>{appContent.portalName}</span>
          </a>
        </div>
        <div className='header__title'>
          <button
            type='button'
            className={
              styles['header__toggle-button'] +
              ' ' +
              (navToggled ? styles['header__close-button'] : '')
            }
            aria-controls='navigation'
            onClick={toggleNav}
            aria-label={content.menuA11y}
            aria-expanded={navToggled}
          >
            <span className='vis-hide'>{content.menu}</span>
          </button>
        </div>
      </div>
      <nav
        aria-label='main-navigation'
        className={
          styles['header__navigation'] +
          ' ' +
          (navToggled ? styles['header__navigation--open'] : '')
        }
      >
        <div className={styles['header__navigation-content']}>
          <ul
            id='navigation'
            className={styles['header__navigation-list']}
            aria-label={content.navigationA11y}
          >
            {content.navigation.map((nav) => {
              return (
                <li
                  className={`${styles['header__navigation-item']} ${
                   highlight === nav.url
                      ? styles['header__navigation-item--active']
                      : ''
                  }`}
                  key={nav.title}
                >
                  <LsLink url={nav.url} className={styles['header__link']}>
                    {nav.title}
                  </LsLink>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
