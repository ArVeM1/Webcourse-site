import styles from './ButtonIcon.module.css';
import { ButtonIconProps, icons } from './ButtonIcon.props';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';

export const ButtonIcon = ({ className, appearance, icon, ...props }: ButtonIconProps): JSX.Element => {
  const IconComp = icons[icon];
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == 'primary',
        [styles.white]: appearance == 'white',
      })}
      {...props}>
      <IconComp />
    </button>
  );
};
