import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import classNames from 'classnames';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props} className={classNames(className, styles.sidebar)}>
      <Logo className={styles.logo} />
      <div>Поиск</div>
      <Menu />
    </div>
  );
};
