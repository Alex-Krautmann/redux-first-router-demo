import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

// NOTE: this file is loaded by karma and attaches methods to window that are made available
//       for use in all test files. It also configures testing utils so each test doesn't have to.

// Configure enzyme to use the correct version of react
Enzyme.configure({ adapter: new Adapter() });

// Attach plugins to chai
chai.use(chaiEnzyme());

// Attach global test methods for use in test cases
window.shallow = shallow;
window.render = render;
window.mount = mount;
window.expect = chai.expect;
