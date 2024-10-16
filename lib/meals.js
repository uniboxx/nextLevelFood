import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import supabase from './supabase';
import { nanoid } from 'nanoid';
import { databases, storage } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

const db = sql('meals.db');

export async function getMeals() {
  // console.log('✅', process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
  // return db.prepare('SELECT * FROM meals').all();
  const promise = databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_ID
  );
  promise.then(
    function (response) {
      // console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );

  return promise;
}

export function getMeal(slug) {
  // return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
  const promise = databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_ID,
    [Query.equal('slug', slug)]
  );
  promise.then(
    function (response) {
      // console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
  return promise;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  meal.appwrite = ID.unique();

  const extension = meal.image.name.split('.').pop();
  const filename = `${meal.slug}_${nanoid()}.${extension}`;

  // const stream = fs.createWriteStream(`public/images/${fileName}`);
  // const bufferedImage = await meal.image.arrayBuffer();

  // stream.write(Buffer.from(bufferedImage), error => {
  //   if (error) {
  //     throw new Error('Saving image failed!');
  //   }
  // });

  //_ supabase

  // const { data, error } = await supabase.storage
  //   .from('meals-images')
  //   .upload(filename, meal.image);

  // if (error) {
  //   console.error('Error uploading file:', error.message);
  // }

  //- APPWRITE
  // return console.log(meal.image, meal.appwrite);

  const promise = storage.createFile(
    process.env.APPWRITE_BUCKET_ID,
    meal.appwrite,
    meal.image
  );
  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );

  // else {
  //   const { data: file } = await supabase.storage
  //     .from('meals-images')
  //     .getPublicUrl(data?.path);
  //   console.log(file);
  //   meal.image = file?.publicUrl;
  // }

  meal.image = filename;

  db.prepare(
    `
    INSERT INTO meals
      (slug, appwrite, title, image, summary, instructions, creator, creator_email)
      VALUES (
        @slug,
        @appwrite,
        @title,
        @image,
        @summary,
        @instructions,
        @creator,
        @creator_email
      )
    `
  ).run(meal);
}
