import React from 'react'
import {connect} from 'react-redux'
import {showError} from '../actions'
import {addCompany} from '../actions/companies'
import {Redirect} from 'react-router-dom'

export class CompanyName extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      websiteUrl: '',
      countryId: 0,
      redirect: false
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler () {
    const countryNumber = Number(this.state.countryId)
    if (typeof countryNumber === 'number' && !isNaN(countryNumber)) {
      this.props.dispatch(addCompany(this.state))
      this.setState({redirect: true})
    } else {
      this.props.dispatch(showError('Please enter a number for company #'))
    }
  }

  render () {
    if (this.state.redirect) {
      return (
        <Redirect to='/Companies' />
      )
    } else {
      return (
        <div>
          <h2 className='AddCompTitle'>Add Company</h2>
          <div className='CompanyAddForm'>
            <h3>Name:</h3>
            <input onChange={this.changeHandler} name='name'/>
            <h3>Site URL:</h3>
            <input onChange={this.changeHandler} name='siteUrl'/>
            <h3>Company #:</h3>
            <input onChange={this.changeHandler} name='countryId'/>
            <button className='addButt' onClick={this.submitHandler}>ADD</button>
          </div>
        </div>
      )
    }
  }
}
export default connect()(CompanyName)
