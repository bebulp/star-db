import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from "../spinner";
import './random-planet.css';


export default class RandomPlanet extends Component {
    state = {
        planet: {},
        loading: true,
    }

    constructor() {
        super();
        this.updatePlanet();
    }

    swapiService = new SwapiService();

    planetLoaded = (planet) => {
        this.setState({
                planet,
                loading: false
        })
    }

    updatePlanet() {
        const id = Math.floor(Math.random() * 25 + 2);
        this.swapiService
            .getPlanet(id)
            .then(this.planetLoaded)
    }

    render() {
        const {planet: {id, name, population, rotationPeriod, diameter}, loading} = this.state;

        if (loading) {
            return <Spinner />
        }

        return(
            <div className="random-planet jumbotron rounded">
                <img className="planet-image"
                     src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
                <div>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span>{population}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Rotation period</span>
                            <span>{rotationPeriod}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span>{diameter}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

