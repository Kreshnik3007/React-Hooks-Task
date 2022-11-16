import React from 'react';
import classes from "./Index.module.css";
import SearchIcon from '@mui/icons-material/Search';

const Search = ({inputChangeHandler, onClickHandler, formChangeHandler }) => {
    return (
        <form onClick={formChangeHandler} className={classes.searchForm}>
            <input type='search' name='search' placeholder='Search...' onChange={inputChangeHandler}
                   required/>
            <button type='submit' className={classes.searchButton} onClick={onClickHandler} >
              <SearchIcon/>
            </button>
        </form>
    );
}

export default Search;