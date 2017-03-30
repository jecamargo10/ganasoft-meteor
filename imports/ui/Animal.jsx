/**
 * Created by Juan on 05/03/2017.
 */
import React, {Component,PropTypes} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor';
import {Animales} from '../api/animales'
import { FlowRouter } from 'meteor/kadira:flow-router';
class Animal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number:1,
            especie: '',
            raza:'',
            sexo:'',
            descripcion:''
        };
    }

    componentDidMount() {
        console.log("hola");
    }

    getPath() {
        return "/" + this.props.params.idfinca + "/animales"
    }
    insertAnimal()
    {
        console.log(FlowRouter.getParam('fincaId'))
        // Que contingencia tienes si hay algun tipo de error ? ten cuidado por si el meotodo se demora mas en el server y no lo espera el FE
        Meteor.call('animales.insert',FlowRouter.getParam('fincaId'),this.state.number,this.state.especie,
            this.state.raza,this.state.sexo,this.state.descripcion);
    }



    render() {
        return (
            <div>
                {console.log(this.props.animales)}

                Number:
                <input type="text" value={this.state.number} onChange={(event) => {
                    this.setState({number: event.target.values})
                }} />

                Especie:
                <input type="text" value={this.state.especie} onChange={(event) => {
                    this.setState({especie: event.target.value})
                }} />
                Raza:
                <input type="text" value={this.state.raza} onChange={(event) => {
                    this.setState({raza: event.target.value})
                }} />
                Genero:
                <input type="text" value={this.state.sexo} onChange={(event) => {
                    this.setState({sexo: event.target.value})
                }} />

                Descripcion:
                <input type="text" value={this.state.descripcion} onChange={(event) => {
                    this.setState({descripcion: event.target.value})
                }} />
                <button onClick={this.insertAnimal.bind(this)}> insertar animal </button>
                {this.props.animales.map((animal, index)=>
                    <div key ={index} className="panel panel-info col-md-3">
                        <div className="panel-heading">
                            <h3 className="panel-title"> ID: {animal.numero}</h3>
                        </div>
                        <div className="col-md-4">
                            <img alt="User Pic" src={animal.foto}
                                 className="img-circle img-responsive"/>
                        </div>
                        <div className="col-md-9">
                            <div className=" col-md-9 col-lg-9 ">
                                <table className="table table-user-information">
                                    <tbody>
                                    <tr>
                                        <td>Especie:</td>
                                        <td> {animal.especie}</td>
                                    </tr>
                                    <tr>
                                        <td>Raza:</td>
                                        <td>{animal.raza}</td>
                                    </tr>

                                    <tr>
                                        <td>Genero:</td>
                                        <td>{animal.sexo}</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                )}
            </div>

        );
    }


}
Animal.propTypes = {
    animales: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('animales');
    var idFinca = FlowRouter.getParam("fincaId");
    console.log(idFinca);
    return {
        animales: Animales.find({farm:idFinca}).fetch(),
        currentUser: Meteor.user()
    };

}, Animal);

