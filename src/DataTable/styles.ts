/* eslint-disable prettier/prettier */
import merge from 'deepmerge';
import { defaultThemes } from './themes';
import { TableStyles, Theme, Themes } from './types';

export const defaultStyles = (theme: Theme): TableStyles => ({
	table: {
		style: {
			color: theme.text.primary,
			backgroundColor: theme.background.default,
		},
	},
	tableWrapper: {
		style: {
			display: 'table',
		},
	},
	responsiveWrapper: {
		style: {},
	},
	header: {
		style: {
			fontFamily:'Rubik',
			fontSize: '18px',
			color: theme.text.primary,
			backgroundColor: theme.background.default,
			minHeight: '56px',
			paddingLeft: '16px',
			paddingRight: '8px',
		},
	},
	subHeader: {
		style: {

			backgroundColor: theme.background.default,

			minHeight: '52px',
		},
	},
	head: {
		style: {
			color: 'rgba(79, 102, 131, 1)',
			fontSize: '10px',
			fontWeight: 500,
			borderTopWidth: '1px',
			borderTopColor: theme.divider.default,
			backgroundColor: theme.background.default,
			borderTopStyle: 'solid',
		},
	},
	headRow: {
		style: {
			fontFamily:'Rubik',
			backgroundColor: theme.background.default,
			minHeight: '52px',

		},
		denseStyle: {
			minHeight: '32px',
		},
	},
	headCells: {
		style: {

			paddingLeft: '16px',
			paddingRight: '16px',
		},
		draggingStyle: {
			cursor: 'move',
		},
	},
	contextMenu: {
		style: {
			fontFamily:'Rubik',
			backgroundColor: theme.context.background,
			fontSize: '18px',
			fontWeight: 400,
			color: theme.context.text,
			paddingLeft: '16px',
			paddingRight: '8px',
			transform: 'translate3d(0, -100%, 0)',
			transitionDuration: '125ms',
			transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
			willChange: 'transform',
		},
		activeStyle: {
			transform: 'translate3d(0, 0, 0)',
		},
	},
	cells: {
		style: {
			fontFamily:'Rubik',
			paddingLeft: '16px',
			paddingRight: '16px',
			wordBreak: 'break-word',
		},
		draggingStyle: {},
	},
	rows: {
		style: {
			fontSize: '14px',
			fontWeight: 400,
			color: theme.text.primary,
			backgroundColor: 'rgba(248, 249, 249, 1)',
			minHeight: '48px',
			'&:not(:last-of-type)': {
				borderBottomStyle: 'solid',
				borderBottomWidth: '4px',
				borderRadius:'2px',
				borderBottomColor: 'white',
			},
		},
		denseStyle: {
			minHeight: '32px',
		},
		selectedHighlightStyle: {
			// use nth-of-type(n) to override other nth selectors
			'&:nth-of-type(n)': {
				color: theme.selected.text,
				backgroundColor: theme.selected.default,
				borderBottomColor: theme.background.default,
			},
		},
		highlightOnHoverStyle: {
			color: theme.highlightOnHover.text,
			backgroundColor: theme.highlightOnHover.default,
			transitionDuration: '0.15s',
			transitionProperty: 'background-color',
			borderBottomColor: theme.background.default,
			outlineStyle: 'solid',
			outlineWidth: '1px',
			outlineColor: theme.background.default,
		},
		stripedStyle: {
			color: theme.striped.text,
			backgroundColor: theme.striped.default,
		},
	},
	expanderRow: {
		style: {
			fontSize:'14px',
			fontFamily:'Roboto Mono',
			color: theme.text.primary,
			backgroundColor: theme.background.default,
		},
	},
	expanderCell: {
		style: {
			flex: '0 0 48px',
		},
	},
	expanderButton: {
		style: {
			color: theme.button.default,
			fill: theme.button.default,
			backgroundColor: 'transparent',
			borderRadius: '2px',
			transition: '0.25s',
			height: '100%',
			width: '100%',
			'&:hover:enabled': {
				cursor: 'pointer',
			},
			'&:disabled': {
				color: theme.button.disabled,
			},
			'&:hover:not(:disabled)': {
				cursor: 'pointer',
				//backgroundColor: theme.button.hover,
			},
			'&:focus': {
				outline: 'none',
				//backgroundColor: theme.button.focus,
			},
			svg: {
				margin: 'auto',
			},
		},
	},
	pagination: {
		style: {
			fontFamily:'Rubik',
			color: 'rgba(79, 102, 131, 1)',
			fontSize: '12px',
			minHeight: '56px',
			backgroundColor: theme.background.default,
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: theme.divider.default,
		},
		pageButtonsStyle: {
			borderRadius: '50%',
			height: '40px',
			width: '40px',
			padding: '8px',
			margin: 'px',
			cursor: 'pointer',
			transition: '0.4s',
			color: 'rgba(79, 102, 131, 1)',
			fill: theme.button.default,
			backgroundColor: 'transparent',
			'&:disabled': {
				cursor: 'unset',
				color: theme.button.disabled,
				fill: theme.button.disabled,
			},
			'&:hover:not(:disabled)': {
				backgroundColor: theme.button.hover,
				color:'white'
			},
			'&:focus': {
				outline: 'none',
				backgroundColor: theme.button.focus,
				color:'white'
			},
		},
	},
	noData: {
		style: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: theme.text.primary,
			backgroundColor: theme.background.default,
		},
	},
	progress: {
		style: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: theme.text.primary,
			backgroundColor: theme.background.default,
		},
	},
});

export const createStyles = (
	customStyles: TableStyles = {},
	themeName = 'default',
	inherit: Themes = 'default',
): TableStyles => {
	const themeType = defaultThemes[themeName] ? themeName : inherit;

	return merge(defaultStyles(defaultThemes[themeType]), customStyles);
};
