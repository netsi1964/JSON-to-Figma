import * as React from 'react';

import {SectionWrapper} from '../../../../sections';
import {Switcher} from '../../../../elements';

interface Props {
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
}

const ManualPopulationSwitcher: React.FC<Props> = props => {
    return (
        <SectionWrapper title="Manual population" onChange={props.onChange}>
            <Switcher
                id="manual-population"
                label="Select layers and a key. Layers will be filled despite the name matching."
            />
        </SectionWrapper>
    );
};

ManualPopulationSwitcher.defaultProps = {
    // tslint:disable-next-line: no-empty
    onChange: () => {},
} as Partial<Props>;

export default ManualPopulationSwitcher;
