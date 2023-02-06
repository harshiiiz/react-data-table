/* eslint-disable prettier/prettier */
import * as React from 'react';
import styled from 'styled-components';
import Select from './Select';
import { getNumberOfPages } from './util';
import useWindowSize from '../hooks/useWindowSize';
import useRTL from '../hooks/useRTL';
import { media, SMALL } from './media';
import { Direction } from './constants';
import { PaginationOptions } from './types';
import { defaultProps } from './defaultProps';

const defaultComponentOptions = {
	rowsPerPageText: 'Show',
	entriesText: 'entries',
	rangeSeparatorText: 'of',
	noRowsPerPage: false,
	selectAllRowsItem: false,
	selectAllRowsItemText: 'All',
};

const PaginationWrapper = styled.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;

	width: 100%;
	${({ theme }) => theme.pagination.style};
`;

const Button = styled.button<{
	isRTL: boolean;
}>`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({ theme }) => theme.pagination.pageButtonsStyle};
	${({ isRTL }) => isRTL && 'transform: scale(-1, -1)'};
`;

const PageList = styled.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${media.sm`
    width: 100%;
    justify-content: space-around;
  `};
`;
const Pg1 = styled.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${media.sm`
    width: 100%;
    justify-content: space-around;
  `};
`;
const Flex1 = styled.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	justify-content: flex-start;
`;
const Span = styled.span`
	flex-shrink: 1;
	user-select: none;
`;

const Range = styled(Span)`
	margin: 0 24px;
`;

const RowLabel = styled(Span)`
	margin: 0 4px;
`;

interface PaginationProps {
	rowsPerPage: number;
	rowCount: number;
	currentPage: number;
	direction?: Direction;
	paginationRowsPerPageOptions?: number[];
	paginationIconLastPage?: React.ReactNode;
	paginationIconFirstPage?: React.ReactNode;
	paginationIconNext?: React.ReactNode;
	paginationIconPrevious?: React.ReactNode;
	paginationComponentOptions?: PaginationOptions;
	onChangePage: (page: number) => void;
	
	onChangeRowsPerPage: (numRows: number, currentPage: number) => void;
}

function Pagination({
	rowsPerPage,
	rowCount,
	currentPage,
	direction = defaultProps.direction,
	paginationRowsPerPageOptions = defaultProps.paginationRowsPerPageOptions,
	paginationIconLastPage = defaultProps.paginationIconLastPage,
	paginationIconFirstPage = defaultProps.paginationIconFirstPage,
	paginationIconNext = defaultProps.paginationIconNext,
	paginationIconPrevious = defaultProps.paginationIconPrevious,
	paginationComponentOptions = defaultProps.paginationComponentOptions,
	onChangeRowsPerPage = defaultProps.onChangeRowsPerPage,
	onChangePage = defaultProps.onChangePage,

}: PaginationProps): JSX.Element {
	const windowSize = useWindowSize();
	const isRTL = useRTL(direction);
	const shouldShow = windowSize.width && windowSize.width > SMALL;
	// const isRTL = detectRTL(direction);
	const numPages = getNumberOfPages(rowCount, rowsPerPage);
	const lastIndex = currentPage * rowsPerPage;

	//const firstIndex = lastIndex - rowsPerPage + 1;
	const disabledLesser = currentPage === 1;
	const disabledGreater = currentPage === numPages;
	const options = { ...defaultComponentOptions, ...paginationComponentOptions };
	const range =
		currentPage === numPages
			? `Showing ${rowCount} ${options.rangeSeparatorText} ${rowCount} results`
			: `Showing ${lastIndex} ${options.rangeSeparatorText} ${rowCount} results`;

	const handlePrevious = React.useCallback(() => onChangePage(currentPage - 1), [currentPage, onChangePage]);
	const handleNext = React.useCallback(() => onChangePage(currentPage + 1), [currentPage, onChangePage]);
	const handleFirst = React.useCallback(() => onChangePage(1), [onChangePage]);
	const handleLast = React.useCallback(
		() => onChangePage(getNumberOfPages(rowCount, rowsPerPage)),
		[onChangePage, rowCount, rowsPerPage],
	);
	const pages = [...Array.from(Array(numPages).keys())].map(i => i + 1);

	const startPage = 1;
	const endPage = 5;
	const startPages = pages.slice(startPage - 1, endPage);
	const handlePages = React.useCallback(page => onChangePage(page), [onChangePage]);
	const handleRowsPerPage = React.useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => onChangeRowsPerPage(Number(e.target.value), currentPage),
		[currentPage, onChangeRowsPerPage],
	);

	const selectOptions = paginationRowsPerPageOptions.map((num: number) => (
		<option key={num} value={num}>
			{num}
		</option>
	));

	if (options.selectAllRowsItem) {
		selectOptions.push(
			<option key={-1} value={rowCount}>
				{options.selectAllRowsItemText}
			</option>,
		);
	}

	const select = (
		<Select onChange={handleRowsPerPage} defaultValue={rowsPerPage} aria-label={options.rowsPerPageText}>
			{selectOptions}
		</Select>
	);

	return (
		<PaginationWrapper className="rdt_Pagination">
			<Flex1>
				{shouldShow && <Range>{range}</Range>}
				{!options.noRowsPerPage && shouldShow && (
					<Pg1>
						<RowLabel>{options.rowsPerPageText}</RowLabel>
						{select}
						<RowLabel>{options.entriesText}</RowLabel>
					</Pg1>
				)}
			</Flex1>
			<PageList>
				<Button
					id="pagination-first-page"
					type="button"
					aria-label="First Page"
					aria-disabled={disabledLesser}
					onClick={handleFirst}
					disabled={disabledLesser}
					isRTL={isRTL}
				>
					{paginationIconFirstPage}
				</Button>

				<Button
					id="pagination-previous-page"
					type="button"
					aria-label="Previous Page"
					aria-disabled={disabledLesser}
					onClick={handlePrevious}
					disabled={disabledLesser}
					isRTL={isRTL}
				>
					{paginationIconPrevious}
				</Button>

				{!options.noRowsPerPage && !shouldShow && select}
				{startPages.map(page => (
					<Button
						isRTL={isRTL}
						id="pagination-previous-pages"
						type="button"
						aria-label="Previous Pages"
						key={page}
						value={page}
						onClick={() => handlePages(page)}
					>
						{page}
					</Button>
				))}
				{currentPage > endPage && <span>...</span>}
				{currentPage < numPages - endPage + 1 && <span>...</span>}

				{numPages > endPage && (
					<Button
						isRTL={isRTL}
						id="pagination-LAST"
						type="button"
						aria-label="Previous Pages"
						onClick={()=>handlePages(numPages)}
					>
						{numPages}
					</Button>
				)}

				<Button
					id="pagination-next-page"
					type="button"
					aria-label="Next Page"
					aria-disabled={disabledGreater}
					onClick={handleNext}
					disabled={disabledGreater}
					isRTL={isRTL}
				>
					{paginationIconNext}
				</Button>

				<Button
					id="pagination-last-page"
					type="button"
					aria-label="Last Page"
					aria-disabled={disabledGreater}
					onClick={handleLast}
					disabled={disabledGreater}
					isRTL={isRTL}
				>
					{paginationIconLastPage}
				</Button>
			</PageList>
		</PaginationWrapper>
	);
}

export default React.memo(Pagination);
