import '../styles/globals.css'
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router';

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

// esto sirve para inicializar el progressbar cuando el usuario cambie de pagina
Router.events.on("routeChangeStart", progress.start);
//Esto hace que finalice el evento en el loading cunado se complete la tarea
Router.events.on("routeChangeComplete", progress.finish)
//Esto se usa para que aparezca el error
Router.events.on("routeChangeError", progress.finish)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
