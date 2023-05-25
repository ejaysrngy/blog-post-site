import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()({
    container: {
        padding: '1em'
    },

    cardContents : {
        gap: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    text : {
        fontSize: '2em',
    }
})