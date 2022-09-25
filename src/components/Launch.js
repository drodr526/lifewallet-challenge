import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

export default function Launch() {

    const [launch, setLaunch] = useState();
    const {id} = useParams();

    useEffect(()=>{

        axios({
            url: 'https://api.spacex.land/graphql/',
            method: 'post',
            data: {
                query: `
              {
                launches(find: {mission_name: "${id}" }){
                  mission_id
                  mission_name
                  rocket {
                    rocket_name
                    rocket_type
                  }
                  ships {
                    name
                    type
                    image
                  }
                }
              }
                `
            }
        }).then((result) => {
            console.log(result.data.data.launches)
            setLaunch(result.data.data.launches[0])
        });
    }, [])

  return (
    <div>
        <h1>{launch && launch.mission_name}</h1>
        <h4>Rocket: {launch && launch.rocket.rocket_name} </h4>
        <h4>Rocket type: {launch && launch.rocket.rocket_type} </h4>
        <table className='table'>
            {launch && launch.ships.length > 0 && launch.ships.map((ship)=>{
                return <tr>
                    <td>{ship.name}</td>
                    <td>{ship.type}</td>
                    <td><img width="300px" src={ship.image}/></td>
                </tr>
            })}
        </table>


    </div>
  )
}
