    import React from "react";
    import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
    import styles from "./app-header.module.css";

    function AppHeader() {
      return (
        <header className={styles.navBar}>
          <nav className={`${styles.flexCentered} ${styles.navTab}`}>
            <div className={`${styles.flexCentered} mt-4 mb-4 p-5 mr-2`}>
              <div className="mr-2">
                <BurgerIcon type="primary" />
              </div>
              <p className="text text_type_main-default">
                Конструктор
              </p>
            </div>
            <div className={`${styles.flexCentered} mt-4 mb-4 p-5`}>
              <div className="mr-2">
                <ListIcon type="secondary" />
              </div>
              <p className="text text_type_main-default">
                Лента заказов
              </p>
            </div>
          </nav>
          <Logo  />
          <nav className={`${styles.flexCentered} ${styles.navTab} ${styles.navRight} mt-4 mb-4 p-5`}>
            <div className="mr-2">
              <ProfileIcon type="secondary" />
            </div>
            <p className="text text_type_main-default">
              Личный кабинет
            </p>
          </nav>
        </header>
      );
    }

    export default AppHeader;