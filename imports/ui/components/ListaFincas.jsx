import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Finca from './Finca';
import {Farms} from '../../api/fincas.js';
import {Animales} from '../../api/animales'
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import SweetAlert from 'react-bootstrap-sweetalert';


class ListaFincas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fincas: [],
            alert:<SweetAlert
                warning
                confirmBtnText="OK!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Please login to see your farms"
                onConfirm={()=>this.setState({alert:null})}
            >
            </SweetAlert>,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
// podrias añadir una verficiacion si el metodo fallar e informarle al usuario
        Meteor.call('fincas.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    componentDidMount() {
        console.log("hola");
        // this.getFincas();
    }

    render() {
        if (Meteor.userId()) {
            return (
                <div className="col-md-11">

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>

                        <input type="text" ref="textInput" placeholder="Type to add new farms"/>

                    </form>

                    <div className="row placeholders">
                        {console.log(Farms.find({}).fetch())}
                        {/*{console.log(this.props.currentUser)}*/}
                        {this.props.fincas.map((finca, index) => {
                                let filteredAnimals = this.props.animales ;
                                filteredAnimals = filteredAnimals.filter(animal => animal.farm.startsWith(finca._id));
                                return <Finca key={index} animales={filteredAnimals} finca={finca}/>
                            }
                        )}

                    </div>

                </div>
            );
        } else{
            return (
                <div>
                    {this.state.alert}
                </div>

            );

        }

    }

}
ListaFincas.propTypes = {
    animales:PropTypes.array.isRequired,
    fincas: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('fincas');
    Meteor.subscribe('animales');
    return {
        fincas: Farms.find({owner: Meteor.userId()}).fetch(),
        animales: Animales.find({owner: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };

}, ListaFincas);
