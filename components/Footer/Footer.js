import React from 'react'
import { LsLink } from '../LsLink'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__content']}>
        <p className='ls-visually-hidden'>Footer links</p>
        <ul className={styles['footer__inline-list']}>
          <li className={styles['footer__inline-list-item']}>
            <LsLink className={styles['footer__link']} url='/cookies'>
              Cookies
            </LsLink>
          </li>
          <li className={styles['footer__inline-list-item']}>
            <LsLink className={styles['footer__link']} url='/privacy-policy'>
              Privacy policy
            </LsLink>
          </li>
          <li className={styles['footer__inline-list-item']}>
            <LsLink className={styles['footer__link']} url='/terms-and-conditions'>
              Terms and conditions
            </LsLink>
          </li>
          <li className={styles['footer__inline-list-item']}>
            <LsLink className={styles['footer__link']} url='/accessibility-statement'>
              Accessibility statement
            </LsLink>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
