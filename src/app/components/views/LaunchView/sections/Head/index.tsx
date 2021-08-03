import * as React from 'react';

import img from '../../../../../assets/nes1989.gif';
import {pluginFrameSize} from '../../../../../../data/pluginFrameSize';
import styles from './styles.module.scss';

declare function require(path: string): any;

// tslint:disable-next-line: no-var-requires
const pluginLogo = require('../../../../../assets/plugin-logo.svg');

const LaunchView: React.FC = () => {
    const eyeRef = React.useRef(null);
    const [nes1989, setNes1989] = React.useState(false);
    const [eyePos, setEyePos] = React.useState({x: 0, y: 0});

    React.useEffect(() => {
        const updatePos = e => {
            const posX = (e.clientX - pluginFrameSize.width / 2) / 100;
            const posY = (e.clientY - pluginFrameSize.height / 2) / 100;

            setEyePos({
                x: posX,
                y: posY,
            });
        };

        window.addEventListener('mousemove', updatePos);

        return () => {
            window.removeEventListener('mousemove', updatePos);
        };
    }, []);

    const handleNesActivation = e => {
        // tslint:disable-next-line:no-unused-expression
        e.detail === 18 ? setNes1989(true) : false;
    };

    return !nes1989 ? (
        <section className={styles.head} onClick={handleNesActivation}>
            <div
                style={{
                    transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
                }}
                ref={eyeRef}
                className={styles.eyes}
            />
            <img className={styles.logo} src={pluginLogo} />
        </section>
    ) : (
        <section className={styles.nes1989}>
            <img className={styles.jason} src={img} alt="JSON" />
            <div className={styles.background} />
        </section>
    );
};

export default LaunchView;
