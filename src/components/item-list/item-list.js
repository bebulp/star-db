import React, {Component} from 'react';
import './item-list.css';

export default class ItemList extends Component {
    render() {
        return (
            <ul className="item-list list-group">
                <li className="list-grou-item">
                    Luke Skywalker
                </li>
                <li className="list-grou-item">
                    Darth Vader
                </li>
                <li className="list-grou-item">
                    R2-D2
                </li>
            </ul>
        )
    }
}

