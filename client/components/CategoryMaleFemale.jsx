import React from 'react'
import {connect} from 'react-redux'
import {BarChart, Bar, CartesianGrid, YAxis, XAxis, Tooltip, Legend} from 'recharts'
import {getGenderStats} from '../actions/stats/getCategoryMaleFemale'

export class CategoryMaleFemale extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stats: []
    }
  }

  componentDidMount () {
    this.props.dispatch(getGenderStats())
  }

  render () {
    return (
      <div>
        <h2>Gender Split of Each Category</h2>
        <BarChart width={730} height={500} data={this.props.gender} barGap={5} >
          <CartesianGrid strokeDasharray = "4 4" />
          <XAxis dataKey="Category" />
          <YAxis label={{value: 'Number Of Employees', angle: -90, position: 'center', padding: 10}}/>
          <Tooltip offset={20} />
          <Legend />
          <Bar dataKey="Male" fill="#3FB1C8" legendType="diamond" barSize={50} />
          <Bar dataKey="Female" fill="#C84E4E" legendType="diamond" barSize={50}/>
        </BarChart>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gender: state.categoryMaleFemale
  }
}

export default connect(mapStateToProps)(CategoryMaleFemale)
