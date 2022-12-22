import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ResidentCard = ({urlResident}) => {


  const [resident, setResident] = useState()
    // console.log(urlResident);

    useEffect(() => {
      axios.get(urlResident)
        .then(res => setResident(res.data))
        .catch(err => console.log(res))
    },[])

    // console.log(resident);


  return (
    <article className='resident_card'>

      <header className='resident_card-header'>
        <img src={resident?.image} alt="" />
        <div className='resident_card-status'>
          <div className= {`circle ${resident?.status}`}></div>
          <span>{resident?.status}</span>
        </div>
      </header>


      <section className='resident_card-body'>
        <h2>{resident?.name}</h2>
        <ul>
          <li><span>Specie: </span>{resident?.species}</li>
          <li><span>Origin: </span>{resident?.origin.name}</li>
          <li><span>Episodes where appear: </span>{resident?.episode.length}</li>
        </ul>
      </section>

        

    </article>
  )
}

export default ResidentCard