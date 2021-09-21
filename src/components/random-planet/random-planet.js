import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
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
                loading: false,
                error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    updatePlanet() {
        const id = 2000;
        // const id = Math.floor(Math.random() * 25 + 2);
        this.swapiService
            .getPlanet(id)
            .then(this.planetLoaded)
            .catch(this.onError)
    }

    render() {
        const {planet, loading, error} = this.state;
        const dataReady = !(error || loading);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = dataReady ? <PlanetView planet={planet}/> : null;

        return(
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population, rotationPeriod, diameter} = planet;

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
