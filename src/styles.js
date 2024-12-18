const black= '#000000';
const shadowGrey= '#3E3E3C';
const slateGrey= '#706E6B';
const koalaGrey= '#969492';
const cloudyGrey= '#C9C7C5';
const silverGrey= '#ECEBEA';
const shinyGrey= '#FAFAF9';
const white= '#FFFFFF';

const greyScale = [
    black,        // 0
    shadowGrey,   // 1
    slateGrey,    // 2
    koalaGrey,    // 3
    cloudyGrey,   // 4
    silverGrey,   // 5
    shinyGrey,    // 6
    white,        // 7
];

function applyOpacityToHex(hex, opacity) {
    const strippedHex = hex.replace('#', '');
    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}



const styles = {
    root: {
        height: '100vh',
        width: '100vw',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 300,
    },
    header: {
        width: '100%',
        height: 124,
        background: 'linear-gradient(181deg, #3f87a6, #194f9c)',
        padding: '20px 48px 24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        color: greyScale[7],
    },
    ellipseText: {
        overflow: 'hidden',
        whiteSpace: 'noWrap',
        textOverflow: 'ellipsis',
    },
    stack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexShrink: 0,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    button: {
        height: 32,
        margin: '6px 4px',
        padding: '0 16px',
        textTransform: 'uppercase',
        border: `1px solid ${greyScale[0]}`,
        borderRadius: 16,
        fontSize: '.875rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '.02857em',
        outline: 'none',
        cursor: 'pointer',
        boxShadow: `0 1px 3px 0 ${applyOpacityToHex(greyScale[0], 0.4)}`,
    },
    blueButton: {
        height: 32,
        margin: '6px 4px',
        padding: '0 16px',
        textTransform: 'uppercase',
        borderRadius: 16,
        fontSize: '.875rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '.02857em',
        outline: 'none',
        cursor: 'pointer',
        backgroundColor: '#175fad', //  #2c6ba1
        color: '#ffffff',
        border: 'none',
        boxShadow: `0 1px 2px 0 ${applyOpacityToHex(greyScale[0], 0.3)}`,
    },
    column: {
        width: '100%',
        margin: '12px 0 36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
    },
    spacer: {
        margin: '12px 0',
    },
    canvasWrapper: {
        margin: '12px 0',
        position: 'relative',
        border: '1px solid black',
        background: 'white',
    },
    turtle: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '15px solid black',
        marginLeft: -5,
        marginTop: -15,
    },
};

export default styles;