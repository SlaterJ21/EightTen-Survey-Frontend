import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import Footer from './components/Footer'
import CTSView from './components/CTSView'
import CompanyView from './components/CompanyView'
import TraitView from './components/TraitView'
import SurveyView from './components/SurveyView'
import SpecificQuestionView from './components/SpecificQuestionView'
import CompanyTraitView from './components/CompanyTraitView'
import SurveyQuestionView from './components/SurveyQuestionView'
import ClientResultsView from './components/ClientResultsView'
import Jumbotron from './components/Jumbotron'


class App extends Component {

  viewHashTable = view => {
    switch(view){
      case 'CTSView':
        return <CTSView/>

      case 'Clients':
        return <CompanyView/>

      case 'Traits':
        return <TraitView/>

      case 'Surveys':
        return <SurveyView/>

      case 'SpecificQuestionView':
        return <SpecificQuestionView/>

      case 'CompanyTraitView':
        return <CompanyTraitView/>

      case 'SurveyQuestionView':
        return <SurveyQuestionView/>

      case 'ClientResultsView':
        return <ClientResultsView/>

      default: return <LoginForm/>
    }
  }

  render() {
    return (
      <div className="content">
        <Header/>
        <Jumbotron/>
        {this.viewHashTable(this.props.view)}
        {/* <Footer/> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const props = {
    view: state.mainReducer.view
  }
  return props
}

export default connect(
  mapStateToProps,
  null
)(App);
