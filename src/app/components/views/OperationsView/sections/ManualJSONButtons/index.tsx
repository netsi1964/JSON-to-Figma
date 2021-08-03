import * as React from 'react';

import {downloadJSON, filterObjRange, isImageString, postFigmaMessage} from '../../../../../utils';

import {Button} from '../../../../elements';
import {SectionWrapper} from '../../../../sections';
import styles from './styles.module.scss';

interface Props {
    obj: object;
    random: boolean;
    range: string;
    onReuploadClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const ManualJSONButtons: React.FC<Props> = props => {
    // INITIAL CONSTANTS
    const keys = [];
    console.log(props.obj);
    (props.obj as object[]).forEach(o => {
        Object.keys(o).forEach(key => (keys.includes(key) ? '' : keys.push(key)));
    });
    // const obj = Object.keys(props.obj[0]);
    const obj = keys;

    // STATES
    const [selected, setSelected] = React.useState(null);

    // POST DATA FOO TEMPLATE
    const postPluginData = () => {
        postFigmaMessage({
            type: 'post-plugin-storage',
            random: props.random,
            manual: true,
            selected,
            obj: filterObjRange(props.range, props.obj),
        });
    };

    // USE EFFECT
    React.useEffect(() => {
        postPluginData();
    }, [selected, props.random]);

    // BUTTONS
    const createButtons = () => {
        console.log('ManualJSONButtons', obj);

        return obj.map((item, i) => {
            const handleClick = e => {
                if (typeof e.target.textContent !== 'undefined') {
                    if (e.target.textContent === selected) {
                        setSelected(null);
                    } else {
                        setSelected(item);
                    }
                }
            };

            const isImage = isImageString(props.obj[0][item].toString().split('?')[0]);

            return (
                <Button
                    key={`item-button-${i}`}
                    text={item}
                    icon={isImage ? 'image' : undefined}
                    mod={selected === item ? 'ACTIVE' : 'OUTLINE'}
                    onClick={handleClick}
                />
            );
        });
    };

    // HANDLERS
    const handllePopulate = o => {
        postFigmaMessage({
            type: 'manual-populate',
            random: props.random,
            selected,
            obj: filterObjRange(props.range, o),
        });
    };

    const handleDownload = o => {
        downloadJSON(filterObjRange(props.range, o));
    };

    return (
        <SectionWrapper className={styles.wrap} title="Select a key ↴">
            <div className={styles.buttonsWrap}>{createButtons()}</div>
            <div className={styles.manipulationButtons}>
                <Button
                    className={styles.button}
                    text={'Populate selected'}
                    mod="PRIMARY"
                    onClick={() => handllePopulate(props.obj)}
                />
                <Button
                    className={styles.icon}
                    icon="save"
                    title="Save JSON"
                    mod="PRIMARY"
                    onClick={() => handleDownload(props.obj)}
                />
                <Button
                    className={styles.icon}
                    icon="reject"
                    title="Reupload"
                    mod="PRIMARY"
                    onClick={props.onReuploadClick}
                />
            </div>
        </SectionWrapper>
    );
};

export default ManualJSONButtons;
