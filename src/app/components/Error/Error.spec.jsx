import React from 'react';
import Error from './';
import styles from '../Switcher/Switcher.scss';

describe('Error Component', () => {
    it('has error class', () => {
        const wrapper = shallow(<Error message="you done goofed!" />);
        expect(wrapper).to.have.className(styles.text);
    });
    it('has default text when no error message', () => {
        const wrapper = shallow(<Error />);
        expect(wrapper).to.have.text('ERROR: ');
    });
    it('has text error message', () => {
        const wrapper = shallow(<Error message="you done goofed!" />);
        expect(wrapper).to.have.text('ERROR: you done goofed!');
    });
});
