/* eslint-disable prettier/prettier */
import * as React from 'react';
import styled from 'styled-components';
import ExpanderExpandedIcon from '../../icons/ExpanderExpandedIcon';
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

	${({ theme }) => theme.header.style}
`;

const Title = styled.div<{
	showTitle: boolean;
}>`
	flex: 1 0 auto;
	color: ${({ theme }) => theme.header.fontColor};
	font-size: ${({ theme }) => theme.header.fontSize};
	font-weight: 500;
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
const Icon = styled.span<{
	collapsible: boolean;
}>`
	margin-right: 24px;
	display: flex;
	width: 24px;
	heigth: 24px;
	align-items: center;
	fill: rgba(132, 148, 168, 0.87);
	display: ${({ collapsible }) => (collapsible ? 'flex' : 'none')};
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
};

const Subheader = ({
	showTitle,
	headerResults,
	collapsible,
	title = '',
	rowCount = '',
	align = 'right',
	wrapContent = true,
	...rest
}: SubheaderProps): JSX.Element => (
	<>
		<HeaderStyle className="rdt_TableHeader" role="heading" aria-level={1}>
			<Icon collapsible={collapsible}>
				{' '}
				<ExpanderExpandedIcon></ExpanderExpandedIcon>
			</Icon>
			<Title showTitle={showTitle}>{title}</Title>
			<Dot>.</Dot>
			<Range headerResults={headerResults}>{rowCount} results</Range>
			<SubheaderWrapper align={align} wrapContent={wrapContent} {...rest} />
		</HeaderStyle>
	</>
);

export default Subheader;
