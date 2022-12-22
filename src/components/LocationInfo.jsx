import React from 'react'

const LocationInfo = ({location}) => {

    // console.log(location);
  return (

    <article className='header_info'>

        
            <div className='card_info' ><span>Name: </span>{location?.name}</div>
            <div className='card_info' ><span>Type: </span>{location?.type}</div>
            <div className='card_info' ><span>Dimension: </span>{location?.dimension}</div>
            <div className='card_info' ><span>Population: </span>{location?.residents.length}</div>
        

    </article>
  )
}

export default LocationInfo