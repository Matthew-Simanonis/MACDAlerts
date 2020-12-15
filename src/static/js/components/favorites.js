import React, { useState, useEffect } from 'react';

const FavoritesList = React.memo(({ stock }) => {

    const [favorites, setFavorites] = useState([])

    const fetchFavorites = () => {
        fetch(`/macdalerts/addfavorite?add=${stock}`)
        .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    setFavorites(json.favorites)
                }
                else {
                    console.log('Error 404')
                }
            })
    }

    useEffect(() => {
        fetchFavorites();
        }, [] )



    return (
        <div className='favorites-list'>
            {favorites}
        </div>
    )
})

export default FavoritesList;