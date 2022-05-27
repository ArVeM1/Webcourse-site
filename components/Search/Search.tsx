import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import classNames from 'classnames';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import React from 'react';
import GlassIcon from './Glass.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = React.useState('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: any) => {
    if (e.key == 'Enter') {
      goToSearch();
    }
  };

  return (
    <form className={classNames(className, styles.search)} {...props}>
      <Input
        placeholder="Поиск..."
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button appearance="primary" className={styles.button} onClick={goToSearch}>
        <GlassIcon />
      </Button>
    </form>
  );
};
