import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sample from '../components/Sample';

Enzyme.configure({ adapter: new Adapter() });

test('check status component redner', () => {
  const component = shallow(<Sample />);
  expect(component.text()).toEqual('SAMPLE PAGE');
});