import React, {useEffect, useState, useRef} from 'react';
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
    const inputRef = useRef('')

    useEffect(() => {
        getPics(search);
    }, [search])


    const getPics = () => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data.photos.photo);
                setError(null);
            })
            .catch(err => {
                setError('Error:' + ' ' + err.message + '!');
            })
        console.log(data)
    }


    const closeModal = () => {
        setOpen(false);
    }

    const inputChangeHandler = () => {
        setSearch(inputRef.current.value);
    }


    return (
        <>
            <Search inputRef={inputRef} inputChangeHandler={inputChangeHandler}/>
            <Categories setSearch={setSearch}/>
            <div className={classes.gallery}>
                <ImageList sx={{width: '100%', height: '100%'}} variant='masonry' cols={4} gap={20}>
                {data?.map((images) => (
                    <ImageListItem key={images.id}>
                        <img src={`https://live.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`}
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

