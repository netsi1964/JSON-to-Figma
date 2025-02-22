import * as React from 'react';

import {
    JSONButtons,
    ManualJSONButtons,
    ManualPopulationSwitcher,
    RandomSwitcher,
    SelectRange,
    SkipLayers,
} from './sections';
import {postFigmaMessage, validateRangeValue} from '../../../utils/';

import {Resizer} from '../../elements';
import SaveSelectionAsJSON from './sections/SaveSelectionAsJSON';
import {ViewContext} from '../../contexts';
import styles from './styles.module.scss';

interface Props {
    onReuploadClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const OperationsView: React.FunctionComponent<Props> = props => {
    const [isRandomSwitch, setIsRandomSwitch] = React.useState(false);
    const [isManualSwitch, setIsManualSwitch] = React.useState(false);
    const [range, setRange] = React.useState('');
    const [rangeError, setRangeError] = React.useState(false);
    const mainSectionRef = React.useRef(null);

    React.useEffect(() => {
        const frameHeight = mainSectionRef.current.getBoundingClientRect().height + 10;
        parent.postMessage({pluginMessage: {type: 'change-size', frameHeight}}, '*');
    }, [isManualSwitch]);

    const handleRandomSwitcher = e => {
        setIsRandomSwitch(e.target.checked);
    };

    const handleManualSwitcher = e => {
        setIsManualSwitch(e.target.checked);
    };

    const handleSaveSelectionToJSON = () => {
        postFigmaMessage({
            type: 'save-selection-to-json',
        });
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
                    {!isManualSwitch ? (
                        <JSONButtons
                            range={range}
                            onReuploadClick={props.onReuploadClick}
                            obj={JSONobject}
                            random={isRandomSwitch}
                        />
                    ) : (
                        <ManualJSONButtons
                            range={range}
                            onReuploadClick={props.onReuploadClick}
                            obj={JSONobject}
                            random={isRandomSwitch}
                        />
                    )}
                    <RandomSwitcher onChange={handleRandomSwitcher} />
                    <SelectRange error={rangeError} onChange={handleRangeInput} value={`1-${JSONobject.length}`} />
                    <SkipLayers />
                    <ManualPopulationSwitcher onChange={handleManualSwitcher} />
                    <SaveSelectionAsJSON onClick={handleSaveSelectionToJSON} />
                    <a href="" id="link" style={{display: 'none'}}>
                        internal use only
                    </a>
                </main>
            )}
        </ViewContext.Consumer>
    );
};

export default OperationsView;
