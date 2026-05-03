import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

const getLinkClass = (isActive: boolean) =>
  `${styles.link} ${isActive ? styles.link_active : ''}`;

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const { pathname } = useLocation();
  const isConstructorActive =
    pathname === '/' || pathname.startsWith('/ingredients');
  const isFeedActive = pathname.startsWith('/feed');
  const isProfileActive = pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={getLinkClass(isConstructorActive)}>
            <>
              <BurgerIcon
                type={isConstructorActive ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </>
          </NavLink>
          <NavLink to='/feed' className={getLinkClass(isFeedActive)}>
            <>
              <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </>
          </NavLink>
        </div>
        <NavLink to='/' className={styles.logo}>
          <Logo className='' />
        </NavLink>
        <NavLink
          to='/profile'
          className={`${getLinkClass(isProfileActive)} ${
            styles.link_position_last
          }`}
        >
          <>
            <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </>
        </NavLink>
      </nav>
    </header>
  );
};
