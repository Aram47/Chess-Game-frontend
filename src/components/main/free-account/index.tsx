import { useTranslation } from "../../../hooks/useTranslation";
import style from "./style.module.scss";

const FreeAccount = () => {
  const { t } = useTranslation();

  return (
    <div className={style.account}>
      <div className={style.account_title}>
        <h2>{t("free_account_title")}</h2>
        <p>{t("free_account_subtitle")}</p>
      </div>

      <button className={style.account_button}>{t("create_free_account")}</button>
    </div>
  );
};

export default FreeAccount;
