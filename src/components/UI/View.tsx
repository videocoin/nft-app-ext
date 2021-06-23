import { FC, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

export const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
export const PADDING_KEY_PATTERN = new RegExp('padding[LTRBHV]?');
export const MARGIN_KEY_PATTERN = new RegExp('margin[LTRBHV]?');

export function extractPaddingValues(props: any) {
  const PADDING_VARIATIONS: Record<string, string | string[]> = {
    padding: 'padding',
    paddingL: 'paddingLeft',
    paddingT: 'paddingTop',
    paddingR: 'paddingRight',
    paddingB: 'paddingBottom',
    paddingH: ['paddingLeft', 'paddingRight'],
    paddingV: ['paddingTop', 'paddingBottom'],
  };
  const paddings: Record<string, number> = {};
  const paddingPropsKeys = Object.keys(props).filter((key) =>
    PADDING_KEY_PATTERN.test(key)
  );
  paddingPropsKeys.forEach((paddingKey: string) => {
    if (props[paddingKey]) {
      const paddingVariation = PADDING_VARIATIONS[paddingKey];
      if (Array.isArray(paddingVariation)) {
        paddingVariation.forEach(
          (pad: string) => (paddings[pad] = props[paddingKey])
        );
      } else {
        paddings[paddingVariation as string] = props[paddingKey];
      }
    }
  });

  return paddings;
}

export const MARGIN_VARIATIONS: Record<string, string | string[]> = {
  margin: 'margin',
  marginL: 'marginLeft',
  marginT: 'marginTop',
  marginR: 'marginRight',
  marginB: 'marginBottom',
  marginH: ['marginLeft', 'marginRight'],
  marginV: ['marginTop', 'marginBottom'],
};

export function extractMarginValues(props: any) {
  const margins: Record<string, number> = {};
  const marginPropsKeys = Object.keys(props).filter((key) =>
    MARGIN_KEY_PATTERN.test(key)
  );
  marginPropsKeys.forEach((marginKey: string) => {
    if (props[marginKey]) {
      const marginVariation = MARGIN_VARIATIONS[marginKey];
      if (Array.isArray(marginVariation)) {
        marginVariation.forEach(
          (pad: string) => (margins[pad] = props[marginKey])
        );
      } else {
        margins[marginVariation as string] = props[marginKey];
      }
    }
  });
  return margins;
}
export function extractFlexStyle(props: any) {
  const STYLE_KEY_CONVERTERS: Record<string, string> = {
    flex: 'flex',
    flexG: 'flexGrow',
    flexS: 'flexShrink',
  };

  const flexKey = Object.keys(props).find((item) =>
    FLEX_KEY_PATTERN.test(item)
  );
  if (flexKey) {
    const key = STYLE_KEY_CONVERTERS[flexKey];
    const val = props[flexKey];
    return { [key]: val };
  }
  return {};
}

export function extractAlignmentsValues(props: any) {
  const { column, reverse, row, center } = props;
  const alignments: Record<string, string> = {};

  const alignmentRules: Record<string, string[]> = {};
  if (column) {
    alignments.display = 'flex';
    alignments.flexDirection = reverse ? 'column-reverse' : 'column';
    alignmentRules.justifyContent = ['top', 'bottom', 'centerV', 'spread'];
    alignmentRules.alignItems = ['left', 'right', 'centerH', 'base'];
  } else if (row) {
    alignments.display = 'flex';
    alignments.flexDirection = reverse ? 'row-reverse' : 'row';
    alignmentRules.justifyContent = ['left', 'right', 'centerH', 'spread'];
    alignmentRules.alignItems = ['top', 'bottom', 'centerV', 'base'];
  }

  Object.keys(alignmentRules).forEach((attribute: string) => {
    alignmentRules[attribute].forEach((position: string) => {
      if (props[position]) {
        if (['left', 'top'].includes(position)) {
          alignments[attribute] = 'flex-start';
        } else if (['right', 'bottom'].includes(position)) {
          alignments[attribute] = 'flex-end';
        } else if (['centerH', 'centerV'].includes(position)) {
          alignments[attribute] = 'center';
        } else if (position === 'spread') {
          alignments[attribute] = 'space-between';
        } else if (position === 'base') {
          alignments[attribute] = 'baseline';
        }
      }
    });
  });

  if (center) {
    alignments.justifyContent = 'center';
    alignments.alignItems = 'center';
  }

  return alignments;
}

export interface ViewProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  margin?: number | 'auto';
  marginL?: number | 'auto';
  marginT?: number | 'auto';
  marginR?: number | 'auto';
  marginB?: number | 'auto';
  marginH?: number | 'auto';
  marginV?: number | 'auto';
  padding?: number;
  paddingL?: number;
  paddingT?: number;
  paddingR?: number;
  paddingB?: number;
  paddingH?: number;
  paddingV?: number;
  reverse?: boolean;
  flex?: number | string;
  flexG?: number;
  flexS?: number;
  column?: boolean;
  row?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  center?: boolean;
  centerV?: boolean;
  centerH?: boolean;
  base?: boolean;
  spread?: boolean;
  className?: string;
  divider?: 'top' | 'bottom';
  as?: keyof JSX.IntrinsicElements;
  $wrap?: boolean;
  dividerBottom?: boolean;
  dividerTop?: boolean;
  $dividerTop?: boolean;
  $dividerBottom?: boolean;
  trim?: boolean;
}

const View: FC<ViewProps> = styled.div<ViewProps>`
  ${(props) => extractPaddingValues(props)};
  ${(props) => extractMarginValues(props)};
  ${(props) => extractFlexStyle(props)};
  ${(props) => extractAlignmentsValues(props)};
  ${({ $wrap }) => $wrap && 'flex-wrap: wrap'};
  ${({ trim }) =>
    trim &&
    `white-space:nowrap;overflow-wrap:normal;overflow:hidden;text-overflow: ellipsis; width: 100%`};
`;

export default View;
