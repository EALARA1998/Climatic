import styles from "./Spinner.module.css"

type SpinnerProps = {
  
}

export default function Spinner({}:SpinnerProps) {
  return (
    <>
      <div className={styles.sk_chase}>
        <div className={styles.sk_chase_dot}></div>
        <div className={styles.sk_chase_dot}></div>
        <div className={styles.sk_chase_dot}></div>
        <div className={styles.sk_chase_dot}></div>
        <div className={styles.sk_chase_dot}></div>
        <div className={styles.sk_chase_dot}></div>
      </div>
    </>
  )
}