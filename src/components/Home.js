import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home(props) {

    const [launches, setLaunches] = useState();

    useEffect(() => {
        axios({
            url: 'https://api.spacex.land/graphql/',
            method: 'post',
            data: {
                query: `
              {
                launches {
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
            setLaunches(result.data.data.launches)
        });

    }, [])

    return (

        <div>
            <h3>SpaceX launch analyzer</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mission name</th>
                        <th scope="col">Rocket name</th>
                        <th scope="col">Rocket type</th>
                        <th scope="col">Ship name</th>
                        <th scope="col">Ship type</th>
                        <th scope="col">Ship image</th>
                    </tr>
                </thead>
                <tbody>
                
                    {launches && launches.map((launch)=>{
                        return <tr >
                            <td>{launch.mission_name}</td>
                            <td>{launch.rocket.rocket_name}</td>
                            <td>{launch.rocket.rocket_type}</td>
                            <td>{launch.ships.length > 0 && launch.ships.map((ship)=>{
                                if(ship != null)
                                return <p>{ship.name}</p>
                            })}</td>
                            <td>{launch.ships.length > 0 && launch.ships.map((ship)=>{
                                if(ship != null)
                                return <p>{ship.type}</p>
                            })}</td>
                            <td width='300px'>{launch.ships.length > 0 && launch.ships.map((ship)=>{
                                if(ship != null)
                                return <p><a href={ship.image} display='inline-block'>{ship.image}</a></p>
                            })}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>


    )
}
