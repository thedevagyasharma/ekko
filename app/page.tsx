import App from "./components/App/App";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <App></App>
    </div>
  );
}
