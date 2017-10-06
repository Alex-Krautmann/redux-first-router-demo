import React from 'react';
import Foo from './Foo.component';

describe('Foo Component', () => {
    it('has text "Foo"', () => {
        const wrapper = shallow(<Foo />);
        expect(wrapper).to.have.text('Foo');
    });
});
