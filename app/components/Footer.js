import classes from './Footer.module.css';

function Footer(props) {
  return (
    <section className={classes.footer}>
      <p>
        Site powered by{' '}
        <a
          className={classes.author}
          href="https://t.me/unibox"
          target="_blank"
        >
          Davide Pedrotti
        </a>{' '}
        following the course &#x22;Next.js 14 & React - The Complete Guide&#x22;
        by{' '}
        <a
          className={classes.author}
          href="https://maximilian-schwarzmueller.com/"
          target="_blank"
        >
          Maximillian Schwarzmuller
        </a>
        .
      </p>
    </section>
  );
}

export default Footer;
