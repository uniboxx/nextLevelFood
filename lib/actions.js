'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

export async function shareMeal(formData) {
  const meal = Object.fromEntries(formData);

  await saveMeal(meal);
  redirect('/meals');
}
