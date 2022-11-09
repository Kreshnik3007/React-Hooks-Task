import React from 'react';
import classes from './Index.module.css'

const Categories = ({setSearch}) =>  {

    return (
        <div className={classes.categories}>
            <button onClick={() => setSearch('Technology')}>Tech</button>
            <button onClick={() => setSearch('Mobile')}>Mobile</button>
            <button onClick={() => setSearch('Fitness')}>Fitness</button>
            <button onClick={() => setSearch('Music')}>Music</button>
        </div>
    );
}

export default Categories;