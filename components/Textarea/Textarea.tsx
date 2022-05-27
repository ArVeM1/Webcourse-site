import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import classNames from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(
  ({ className, error, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
      <div className={classNames(styles.textareaWrapper, className)}>
        <textarea
          className={classNames(styles.textarea, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
