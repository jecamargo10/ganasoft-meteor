import React, {Component} from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }



    render() {
        return (
            <div >
                <nav id ="navbar" className="navbar navbar-light navbar-fixed-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <a href="/" id="navbar-brand" className="navbar-brand">
                                <img
                                    className="logo"
                                    src="../images/logo1.png"
                                    alt="logo"/>
                            </a>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><AccountsUIWrapper/></li>
                                <li><a id="navbar-list" href="/fincas">Fincas</a></li>
                                <li><a id="navbar-list" href="#">Settings</a></li>
                                <li><a id="navbar-list" href="#">Profile</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                    <div>
                        <div className="col-md-1"></div>
                        {this.props.main}
                    </div>
                    
                    
                    {/* Borra estos divs que estan abiertos sin tag inicial  */}
                </ div >
            </ div >
        )
    };
}
export default App;
