import React from "react";
import css from "./Searchbar.module.css";

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={onSubmit}>
        <button type="submit" className={css['searchform-button']}>
          <span className={css['searchform-button-label']}>Search</span>
        </button>

        <input
          className={css['searchform-input'] }
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};