import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
import { storage } from '@/lib/appwrite';

export async function generateMetadata({ params }) {
  const mealData = await getMeal(params.mealSlug);
  const meal = mealData.documents[0];

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

async function MealDetailsPage({ params }) {
  const mealData = await getMeal(params.mealSlug);
  const meal = mealData?.documents[0];

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  const imgUrl = storage.getFileDownload(
    process.env.APPWRITE_BUCKET_ID,
    meal.appwrite
  );

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={imgUrl} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}

export default MealDetailsPage;
