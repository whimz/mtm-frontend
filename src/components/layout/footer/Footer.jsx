import classes from "./Footer.module.css";

export default function Footer(){

  return(

    <footer className={classes.footer}>
      <p>Developed by <a href="https://solve-marketing.agency">solve-marketing.agency</a> &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}