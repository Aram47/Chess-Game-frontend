import style from "./style.module.scss"

const FreeAccount = () => {
  return (
    <div className={style.account}>
      <div className={style.account_title}>
        <h2>Ready to Begin Your Journey?</h2>
        <p>
          Join thousands of players improving their game every day. Start your
          chess mastery today.
        </p>
      </div>

      <button className={style.account_button}>Create Free Account</button>
    </div>
  );
};

export default FreeAccount;
