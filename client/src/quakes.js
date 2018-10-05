import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import App from './App';
import './quakes.css';

const GET_QUAKE = gql`
    query allQuakes($mag: Int!) {
        getQuakes(mag: $mag) {
            mag
            place
            coords
            time
        }
    }
`;

class Quakes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mag: 3
        };

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(e, refetch) {
        this.setState({
            mag: parseInt(e.target.value, 10)
        }, () => {
            refetch();
        });
    }

    render() {
        const { mag } = this.state;
        return (
            <Query query={GET_QUAKE} variables={{ mag }} fetchPolicy="cache-first">
                {({ loading, error, data, refetch }) => {
                    return (
                        <div>
                            {loading ? (
                                <h3 className="loading-sign">Loading...</h3>
                            ) : (
                                <div>
                                    <select name="magnitude" className="mag-changer" onChange={(e) => this.updateValue(e, refetch)} value={mag}>
                                        <option value="3">Magnitude > 3</option>
                                        <option value="4">Magnitude > 4</option>
                                        <option value="5">Magnitude > 5</option>
                                        <option value="6">Magnitude > 6</option>
                                        <option value="7">Magnitude > 7</option>
                                    </select>
                                    <App data={data} mag={mag} />
                                </div>
                            )}
                            {error && <h3 className="loading-sign">Error! {error.message}</h3>}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default Quakes;