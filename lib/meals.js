import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
// import fs from 'node:fs';
import supabase from './supabase';
import { nanoid } from 'nanoid';

const db = sql('meals.db');

export async function getMeals() {
  // await new Promise(resolve => setTimeout(resolve, 5000));

  // throw new Error('Failed to fetch meals');

  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

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

  const { data, error } = await supabase.storage
    .from('meals-images')
    .upload(filename, meal.image);

  if (error) {
    console.error('Error uploading file:', error.message);
  }
  // else {
  //   const { data: file } = await supabase.storage
  //     .from('meals-images')
  //     .getPublicUrl(data?.path);
  //   console.log(file);
  //   meal.image = file?.publicUrl;
  // }

  //_ supabase

  meal.image = filename;

  db.prepare(
    `
    INSERT INTO meals
      (slug, title, image, summary, instructions, creator, creator_email)
      VALUES (
        @slug,
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
