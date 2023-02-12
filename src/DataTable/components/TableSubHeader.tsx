/* eslint-disable prettier/prettier */
import * as React from 'react';
import styled from 'styled-components';

import { ExpandableIcon } from '../types';
const alignMap = {
	left: 'flex-start',
	right: 'flex-end',
	center: 'center',
};

type AlignItems = 'center' | 'left' | 'right';
const HeaderStyle = styled.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;

	${({ theme }) => theme.subHeader.style}
`;

const Title = styled.div<{
	showTitle: boolean;
}>`
	flex: 1 0 auto;
	color: ${({ theme }) => theme.header.fontColor};
	font-size: ${({ theme }) => theme.header.fontSize};
	font-weight: 500;
	margin-left:11px;
	display: ${({ showTitle }) => (showTitle ? 'flex' : 'none')};
`;
const SubheaderWrapper = styled.div<{
	align: AlignItems;
	wrapContent: boolean;
}>`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({ align }) => alignMap[align]};
	flex-wrap: ${({ wrapContent }) => (wrapContent ? 'wrap' : 'nowrap')};
	${({ theme }) => theme.subHeader.style}
`;

const Dot = styled.span`
	margin-left: 24px;
	display: flex;
	width: 4px;
	heigth: 4px;
	align-items: center;
`;
const Range = styled.span<{ headerResults: boolean }>`
	margin: 0 28px;
	font-weight: 400;
	font-size: 12px;
	color: #4f6683;
	white-space: nowrap;
	display: ${({ headerResults }) => (headerResults ? 'flex' : 'none')};
`;
const Icon = styled.button<{
	collapsible: boolean;
}>`
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	
	background-color: transparent;
	cursor: pointer;
	fill:rgba(0,0,0,.54);
	display: ${({ collapsible }) => (collapsible ? 'inline-flex' : 'none')};
`;

type SubheaderProps = {
	title?: string | React.ReactNode;
	align?: AlignItems;
	wrapContent?: boolean;
	children?: React.ReactNode;
	rowCount?: string | React.ReactNode;
	showTitle?: boolean;
	headerResults?: boolean;
	collapsible?: boolean;

	expanded?: boolean;
	expandableIcon: ExpandableIcon;
};

const Subheader = ({
	showTitle,
	headerResults,
	collapsible,
	title = '',
	rowCount = '',
	align = 'right',
	wrapContent = true,

	expandableIcon,
	expanded,
	setExpanded,

	...rest
}: SubheaderProps): JSX.Element => {
	//const [expanded, setExpanded] = React.useState(defaultExpanded);

	const icon = expanded ? expandableIcon.expanded : expandableIcon.collapsed;
	return (
		<>
			<HeaderStyle className="rdt_TableHeader" role="heading" aria-level={1}>
				<Icon
					collapsible={collapsible}
					onClick={() => setExpanded(!expanded)}
					data-testid={`expander-button`}
					aria-label={expanded ? 'Collapse Row' : 'Expand Row'}
					role="button"
					type="button"
				>
					{' '}
					{icon}
				</Icon>

				<Title showTitle={showTitle}>{title}</Title>
				<Dot>.</Dot>
				<Range headerResults={headerResults}>{rowCount} results</Range>
				<SubheaderWrapper align={align} wrapContent={wrapContent} {...rest} />
			</HeaderStyle>
		</>
	);
};

export default Subheader;
