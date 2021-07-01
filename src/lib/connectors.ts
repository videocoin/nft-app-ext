import { InjectedConnector } from '@web3-react/injected-connector';
import { map } from 'lodash/fp';
import { AbstractConnector } from '@web3-react/abstract-connector';

const REACT_APP_NETWORKS = map<string, number>(parseInt)(
  window._env_.REACT_APP_NETWORKS?.split(',') || ['5']
);

export const injected = new InjectedConnector({
  supportedChainIds: REACT_APP_NETWORKS,
});

export const connectorsByName: { [name: string]: AbstractConnector } = {
  Injected: injected,
};

export const connectorName = 'Injected';
