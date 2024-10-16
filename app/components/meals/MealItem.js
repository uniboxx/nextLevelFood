import Link from 'next/link';
import classes from './MealItem.module.css';
import Image from 'next/image';
import { storage } from '@/lib/appwrite';

function MealItem({ title, slug, summary, creator, appwrite }) {
  // const imgUrl = `${process.env.STORAGE_URL}/${image}`;
  const imgUrl = storage.getFileDownload(
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
    appwrite
  );
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={imgUrl} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

export default MealItem;
