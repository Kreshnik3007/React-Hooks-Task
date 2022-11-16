import React, {useEffect, useState} from 'react';
import {ImageList, ImageListItem} from "@mui/material";
import classes from './Index.module.css'
import Categories from "./Categories";
import Search from './Search'
import CustomModal from "./CustomModal";


const Photos = () => {
    const [search, setSearch] = useState('plane')
    const [error, setError] = useState(null)
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [biggerImage, setBiggerImage] = useState('')
    const [currentValue, setCurrentValue] = useState(search);


    useEffect(() => {
        const getPics = async () => {
            const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
            const data = await response.json();
            setData(data.photos.photo);
        }
        try {
            getPics();
        } catch (e) {
            setError(e.message)
        }

    }, [search])


    const formChangeHandler = (e) => {
        e.preventDefault()
    }
    const closeModal = () => {
        setOpen(false);
    }

    const inputChangeHandler = (e) => {
        setCurrentValue(e.target.value);
    }

    const onClickHandler = () => {
        setSearch(currentValue)
    }


    return (
        <>
            <Search formChangeHandler={formChangeHandler} onClickHandler={onClickHandler} inputChangeHandler={inputChangeHandler}/>
            <Categories setSearch={setSearch}/>
            <div className={classes.gallery}>
                <ImageList sx={{width: '100%', height: '100%'}} variant='masonry' cols={4} gap={20}>
                    {data?.map((images) => (
                        <ImageListItem key={images.id}>
                            <img
                                src={`https://live.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`}
                                alt={images.title} onClick={() => {
                                setOpen(true);
                                setBiggerImage(`https://live.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`)
                            }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>

            <CustomModal closeModal={closeModal} biggerImage={biggerImage} open={open}/>
            <div className={classes.error}>{error}</div>
        </>
    );
}

export default Photos;

