import React from 'react';
import classes from './Index.module.css'

const Header = () => {
    return (
        <div className={classes.header}>
            <h1 className={classes.headerText}>Flickr Photo Gallery</h1>
        </div>
    );
}

export default Header;