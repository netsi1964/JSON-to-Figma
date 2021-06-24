import * as React from 'react';

import {ViewContext} from '../../contexts';
import {JSONbuttons, SkipLayers, RandomSwitcher, SelectRange} from './sections';
import {Resizer} from '../../elements';
import {validateRangeValue} from '../../../utils/';

import styles from './styles.module.scss';

interface Props {
    onReuploadClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const OperationsView: React.FunctionComponent<Props> = props => {
    const [isRandomSwitch, setIsRandomSwitch] = React.useState(false);
    const [range, setRange] = React.useState('');
    const [rangeError, setRangeError] = React.useState(false);
    const mainSectionRef = React.useRef(null);

    React.useEffect(() => {
        const frameHeight = mainSectionRef.current.getBoundingClientRect().height;
        parent.postMessage({pluginMessage: {type: 'change-size', frameHeight}}, '*');
    }, []);

    const handleRandomSwitcher = e => {
        setIsRandomSwitch(e.target.checked);
    };

    const handleRangeInput = e => {
        if (!validateRangeValue(e.target.value)) {
            setRangeError(true);
        } else {
            setRange(e.target.value);
            setRangeError(false);
        }
    };

    return (
        <ViewContext.Consumer>
            {JSONobject => (
                <main ref={mainSectionRef} className={styles.wrap}>
                    <Resizer />
                    <JSONbuttons
                        range={range}
                        onReuploadClick={props.onReuploadClick}
                        obj={JSONobject}
                        random={isRandomSwitch}
                    />
                    <SelectRange error={rangeError} onChange={handleRangeInput} value={`1-${JSONobject.length}`} />
                    <SkipLayers />
                    <RandomSwitcher onChange={handleRandomSwitcher} />
                </main>
            )}
        </ViewContext.Consumer>
    );
};

export default OperationsView;
