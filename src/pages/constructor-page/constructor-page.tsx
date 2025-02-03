import { AppDispatch, RootState } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { getIngredientsThunk } from '../../services/slices/ingredients-slice';
import { useDispatch, useSelector } from 'react-redux';

export const ConstructorPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isIngredientsLoading = useSelector<RootState>(
    (state) => state.ingredients.isLoading
  );

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
