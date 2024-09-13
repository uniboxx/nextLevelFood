'use server';

export async function shareMeal(formData) {
  const meal = Object.fromEntries(formData);

  console.log(meal);
}
