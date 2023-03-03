import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="ls-main-container">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
