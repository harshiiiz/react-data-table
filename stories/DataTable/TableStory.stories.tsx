/* eslint-disable prettier/prettier */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Icon2 from '../../src/icons/Filter';
import FileDownloadOutlinedIcon from '../../src/icons/Download';
import TextField from '@material-ui/core/TextField';
import { CSVLink } from 'react-csv';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import data from '../constants/sampleMovieData';
import Tablerr, { Alignment, Direction, TableProps, TableColumn, ExpanderComponentProps } from '../../src/index';
import { Checkbox } from '@mui/material';

interface Row {
	posterUrl: string;
	title: string;
	director: string;
	year: string;
	runtime: number;
	plot: string;
	actors: string;
}

const ExpandableRowComponent: React.FC<ExpanderComponentProps<Row>> = ({ data }) => {
	return (
		<>
			<p>{data.title}</p>
			<p>{data.director}</p>
			<p>{data.plot}</p>
		</>
	);
};

const SubHeaderComponent = ({ filterText = 'string', onFilter }) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
		<CSVLink data={data}>
			<FileDownloadOutlinedIcon />
		</CSVLink>
		<Icon2 />
		<TextField
			id="search"
			placeholder="Search in Sample"
			variant="outlined"
			size="small"
			style={{
				margin: '5px',
				background: '#F8F9F9',
				borderColor: '#F8F9F9',
				color: ' rgba(163, 176, 190, 1)',
				fontFamily: 'Rubik',
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchRoundedIcon />
					</InputAdornment>
				),
			}}
			value={filterText}
			onChange={onFilter}
		/>
	</div>
);
const MovieTime = ({ row }) => (
	<div>
		{row.title} {row.runtime}
	</div>
);

const columns: TableColumn<Row>[] = [
	{
		name: 'Title',
		selector: row => row.title,
		sortable: true,
		reorder: true,
		cell: row => <MovieTime row={row} />,
	},
	{
		name: 'Runtime',
		selector: row => row.runtime,
		sortable: true,
		reorder: true,
		conditionalCellStyles: [
			{
				when: row => row.runtime < 100,
				style: {
					backgroundColor: 'rgba(63, 195, 128, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			},
		],
	},
	{
		name: 'Actors',
		selector: row => row.actors,
		sortable: true,
		reorder: true,
	},
	{
		name: 'URL',
		sortable: true,
		reorder: true,
		cell: row => (
			<a href={row.posterUrl} target="_blank" rel="noopener noreferrer">
				{row.posterUrl.slice(0, 20)}...
			</a>
		),
		format: row => `${row.plot.slice(0, 2)}...`,
		wrap: true,
	},
	{
		name: 'Director',
		selector: row => row.director,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
		sortable: true,
		reorder: true,
	},
];

interface TablePropsExtended extends TableProps<Row> {
	selectableRowsRadio: boolean;
}

function Tabler({
	selectableRows,
	selectableRowsNoSelectAll,
	selectableRowsVisibleOnly,
	selectableRowsHighlight,
	selectableRowsSingle,
	expandableRows,
	expandOnRowClicked,
	expandOnRowDoubleClicked,
	expandableRowsHideExpander,
	pagination,
	highlightOnHover,
	striped,
	pointerOnHover,
	dense,
	persistTableHead,
	noHeader,
	fixedHeader,
	fixedHeaderScrollHeight,
	progressPending,

	noTableHead,
	noContextMenu,
	direction,
	subHeader,
	subHeaderAlign,
	subHeaderWrap,
	responsive,
	disabled,
	collapsible
}: TablePropsExtended): JSX.Element {
	//filter
	const [filterText, setFilterText] = React.useState('');
	const filteredItems = data.filter(
		(item: { title: string }) => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
	);
	const subHeaderComponentMemo = React.useMemo(() => {
		return (
			<SubHeaderComponent
				onFilter={(e: { target: { value: React.SetStateAction<string> } }) => setFilterText(e.target.value)}
				filterText={filterText}
			/>
		);
	}, [filterText]);

	return (
		<Tablerr
			title="Sample Data"
			tbtitle="Preview"
			columns={columns}
			data={filteredItems}
			defaultSortFieldId={1}
			selectableRows={selectableRows}
			selectableRowsComponent={Checkbox}
			selectableRowsNoSelectAll={selectableRowsNoSelectAll}
			selectableRowsHighlight={selectableRowsHighlight}
			selectableRowsSingle={selectableRowsSingle}
			selectableRowsVisibleOnly={selectableRowsVisibleOnly}
			expandableRows={expandableRows}
			expandableRowsComponent={ExpandableRowComponent}
			expandOnRowClicked={expandOnRowClicked}
			expandOnRowDoubleClicked={expandOnRowDoubleClicked}
			expandableRowsHideExpander={expandableRowsHideExpander}
			pagination={pagination}
			highlightOnHover={highlightOnHover}
			striped={striped}
			pointerOnHover={pointerOnHover}
			dense={dense}
			noTableHead={noTableHead}
			persistTableHead={persistTableHead}
			progressPending={progressPending}
			noHeader={noHeader}
			subHeader={subHeader}
			subHeaderComponent={subHeaderComponentMemo}
			subHeaderAlign={subHeaderAlign}
			subHeaderWrap={subHeaderWrap}
			noContextMenu={noContextMenu}
			fixedHeader={fixedHeader}
			fixedHeaderScrollHeight={fixedHeaderScrollHeight}
			collapsible={collapsible}
			direction={direction}
			responsive={responsive}
			disabled={disabled}
		/>
	);
}

const Template: Story<TablePropsExtended> = args => <Tabler {...args} />;

export const ReactDataTable = Template.bind({});

ReactDataTable.args = {
	selectableRows: false,
	selectableRowsNoSelectAll: false,
	selectableRowsVisibleOnly: false,
	selectableRowsHighlight: false,
	selectableRowsSingle: false,
	expandableRows: false,
	expandOnRowClicked: false,
	expandOnRowDoubleClicked: false,
	expandableRowsHideExpander: false,
	pagination: true,
	highlightOnHover: false,
	striped: false,
	pointerOnHover: false,
	dense: false,
	persistTableHead: false,
	noHeader: false,
	fixedHeader: false,
	fixedHeaderScrollHeight: '300px',
	progressPending: false,
	noTableHead: false,
	noContextMenu: false,
	direction: Direction.AUTO,
	subHeader: true,
	subHeaderAlign: Alignment.RIGHT,
	subHeaderWrap: true,
	responsive: true,
	disabled: false,
	collapsible:false,
};

export default {
	title: 'Getting Started/React Data Table',
	component: ReactDataTable,
	parameters: {
		// docs: {
		// 	page: doc,
		// },
		controls: {
			sort: 'requiredFirst',
		},
	},
	argTypes: {
		selectableRows: {
			table: {
				category: 'Selectable Rows',
			},
		},
		selectableRowsNoSelectAll: {
			table: {
				category: 'Selectable Rows',
			},
		},
		selectableRowsVisibleOnly: {
			table: {
				category: 'Selectable Rows',
			},
		},
		selectableRowsHighlight: {
			table: {
				category: 'Selectable Rows',
			},
		},
		selectableRowsSingle: {
			table: {
				category: 'Selectable Rows',
			},
		},
		expandableRows: {
			table: {
				category: 'Expandable Rows',
			},
		},
		expandOnRowClicked: {
			table: {
				category: 'Expandable Rows',
			},
		},
		expandOnRowDoubleClicked: {
			table: {
				category: 'Expandable Rows',
			},
		},
		expandableRowsHideExpander: {
			table: {
				category: 'Expandable Rows',
			},
		},
		subHeaderAlign: {
			options: [Alignment.RIGHT, Alignment.CENTER, Alignment.LEFT],
			control: { type: 'select' },
		},
		direction: {
			options: [Direction.AUTO, Direction.LTR, Direction.RTL],
			control: { type: 'select' },
		},
	},
} as Meta;
