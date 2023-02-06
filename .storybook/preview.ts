import './base.css';

export const parameters = {
	// controls: { expanded: true },
	viewMode: 'docs',
	
	a11y: {
		element: '#root',
		config: {},
		options: {},
		manual: true,
	},
};

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Global theme for components',
		defaultValue: 'light',
	},
};
