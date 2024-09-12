function MealDetails({ params }) {
  return (
    <>
      <h2>Meal Details</h2>
      <p>{params.mealSlug}</p>
    </>
  );
}

export default MealDetails;
