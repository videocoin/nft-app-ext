import React, { SyntheticEvent, useCallback } from 'react';
import { map } from 'lodash/fp';
import styled from 'styled-components';
import View from './View';

interface Tab<T> {
  id: T;
  name: string;
}

interface Props<T> {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
}

const TabNavButton = styled.button<{ active: boolean }>`
  color: ${({ active }) => (active ? '#17161A' : '#17161a80')};
  font-size: 33px;
  font-weight: bold;
  padding-bottom: 30px;
  border-bottom: 10px solid
    ${({ active }) => (active ? '#17161A' : 'transparent')};
  &:not(:last-child) {
    margin-right: 100px;
  }
`;

const TabNav = <T extends number>({ tabs, onChange, activeTab }: Props<T>) => {
  const handleChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { tab } = e.currentTarget.dataset;
    if (!tab) return;
    onChange(+tab as T);
  };
  const renderButton = useCallback(
    ({ name, id }: Tab<T>) => {
      return (
        <TabNavButton
          active={activeTab === id}
          key={id}
          data-tab={id}
          onClick={handleChange}
        >
          {name}
        </TabNavButton>
      );
    },
    [activeTab]
  );

  return <View row>{map(renderButton, tabs)}</View>;
};

export default TabNav;
