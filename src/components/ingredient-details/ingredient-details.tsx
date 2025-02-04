import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientId = params.id;
  const ingredientData = useSelector<RootState, TIngredient | undefined>(
    (state) =>
      state.ingredients.ingredients.find(
        (ingredient: { _id: string | undefined }) =>
          ingredient._id === ingredientId
      )
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
