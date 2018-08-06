import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {CompanyName} from '../../../client/components/CompanyAdd'
configure({adapter: new Adapter()})

test('<CompanyName />', () => {
  const expected = 'Add Company'

  const wrapper = shallow(<CompanyName />)
  const actual = wrapper.find('h2').text()

  expect(actual).toEqual(expected)
})
