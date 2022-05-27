import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import classNames from 'classnames';
import { Input, Rating, Textarea } from '../';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import React from 'react';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API } from '../../helpers/api';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classNames(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          placeholder="Имя"
          error={errors.name}
          className={styles.name}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          placeholder="Заголовок отзыва"
          error={errors.title}
          className={styles.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                error={errors.rating}
                setRating={field.onChange}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
          placeholder="Текст отзыва"
          error={errors.description}
          className={styles.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={classNames(styles.success, styles.panel)} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button onClick={() => setIsSuccess(false)} className={styles.close} aria-label="Закрыть оповещение">
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={classNames(styles.error, styles.panel)} role="alert">
          Что-то пошло не так, попробуйте обновить страницу
          <button onClick={() => setError(undefined)} className={styles.close} aria-label="Закрыть оповещение">
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
