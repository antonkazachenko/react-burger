import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
      return (
        <header className={styles.navBar}>
          <nav className={`${styles.flexCentered} ${styles.navTab}`}>
            <div className={`${styles.flexCentered} mt-4 mb-4 p-5 mr-2`}>
              <a href="#" className={styles.navLink}>
                <div className="mr-2">
                  <BurgerIcon type="primary"/>
                </div>
                <p className="text text_type_main-default">
                  Конструктор
                </p>
              </a>
            </div>
            <div className={`${styles.flexCentered} mt-4 mb-4 p-5`}>
              <a href="#" className={`${styles.navLink} ${styles.secondary}`}>
                <div className="mr-2">
                  <ListIcon type="secondary" className={styles.secondary}/>
                </div>
                <p className={`text text_type_main-default ${styles.secondary}`}>
                  Лента заказов
                </p>
              </a>
            </div>
          </nav>
          <Logo  />
          <nav className={`${styles.flexCentered} ${styles.navTab} ${styles.navRight} mt-4 mb-4 p-5`}>
            <a href="#" className={styles.navLink}>
              <div className="mr-2">
                <ProfileIcon type="secondary"/>
              </div>
              <p className={`text text_type_main-default ${styles.secondary}`}>
                Личный кабинет
              </p></a>
          </nav>
        </header>
      );
    }

    export default AppHeader;