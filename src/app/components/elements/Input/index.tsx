import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
    value?: string;
    onChange?(event: React.FormEvent<HTMLInputElement>): void;
    className?: string;
}

const Input: React.FC<Props> = props => {
    const [val, setVal] = React.useState(props.value);

    const handleOnChange = e => {
        setVal(e.target.value);
        // tslint:disable-next-line:no-unused-expression
        props.onChange;
    };

    return (
        <input
            onLoad={() => console.log('loaded')}
            className={`${styles.input} ${props.className}`}
            onChange={handleOnChange}
            value={val}
        />
    );
};

Input.defaultProps = {
    value: '',
    // tslint:disable-next-line: no-empty
    onChange: () => {},
    className: '',
} as Partial<Props>;

export default Input;
