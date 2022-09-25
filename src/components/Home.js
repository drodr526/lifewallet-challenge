import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

export default function Home(props) {

  const [launches, setLaunches] = useState();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const paginate = () => {
    axios({
      url: 'https://api.spacex.land/graphql/',
      method: 'post',
      data: {
        query: `
              {
                launches {
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
      const newLaunches = launches.concat(result.data.data.launches);
      setLaunches(newLaunches);
    });
  }

  useBottomScrollListener(paginate)

  useEffect(() => {

    axios({
      url: 'https://api.spacex.land/graphql/',
      method: 'post',
      data: {
        query: `
              {
                launches {
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
      setLaunches(result.data.data.launches)
    });

  }, [])

  return (
    <div>
      <h3>SpaceX launch analyzer</h3>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1" value={search}>Search</span>
        <input type="text" className="form-control" placeholder="Mission name" onChange={(event)=>{setSearch(event.target.value)}}/>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Mission name</th>
            <th scope="col">Rocket name</th>
            <th scope="col">Rocket type</th>
            <th className="hide-column" scope="col">Ship name</th>
            <th className="hide-column" scope="col">Ship type</th>
            <th className="hide-column" scope="col">Ship image</th>
          </tr>
        </thead>
        <tbody>

          {launches && launches.map((launch) => {
            if(launch.mission_name.includes(search) || search == "")
            return <tr onClick={() => navigate("/launches/" + launch.mission_name)}>
              <td>{launch.mission_name}</td>
              <td>{launch.rocket.rocket_name}</td>
              <td>{launch.rocket.rocket_type}</td>
              <td className="hide-column">{launch.ships.length > 0 && launch.ships.map((ship) => {
                if (ship != null)
                  return <p>{ship.name}</p>
              })}</td>
              <td className="hide-column">{launch.ships.length > 0 && launch.ships.map((ship) => {
                if (ship != null)
                  return <p>{ship.type}</p>
              })}</td>
              <td className="hide-column" width='300px'>{launch.ships.length > 0 && launch.ships.map((ship) => {
                if (ship != null)
                  return <p><a href={ship.image} display='inline-block'>{ship.image}</a></p>
              })}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>


  )
}
