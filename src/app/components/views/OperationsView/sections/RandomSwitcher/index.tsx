import * as React from 'react';

import {SectionWrapper} from '../../../../sections';
import {Switcher} from '../../../../elements';

interface Props {
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const RandomSwitcher: React.FC<Props> = props => {
    return (
        <SectionWrapper divider title="Random order" onChange={props.onChange}>
            <Switcher id="random-order-check" label="Fill Selected items in random order." />
        </SectionWrapper>
    );
};

RandomSwitcher.defaultProps = {
    // tslint:disable-next-line:no-empty
    onChange: () => {},
} as Partial<Props>;

export default RandomSwitcher;
