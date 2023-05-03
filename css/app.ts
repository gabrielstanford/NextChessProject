import {createUseStyles} from 'react-jss';
import {htmlFontSize, baselinePX} from './base';

export default createUseStyles({
    '@global' : {
        'html, body' : {
            margin: 0,
        },
        html: {
            fontFamily: 'system-ui, Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: htmlFontSize,
            lineHeight: baselinePX,
        },
    },
    app: {
        height: '100%',
    },
});