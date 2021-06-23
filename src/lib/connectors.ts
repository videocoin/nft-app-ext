import { InjectedConnector } from '@web3-react/injected-connector';
import { map } from 'lodash/fp';
import { AbstractConnector } from '@web3-react/abstract-connector';

console.log(process.env.REACT_APP_NETWORKS);

const REACT_APP_NETWORKS = map<string, number>(parseInt)(
  process.env.REACT_APP_NETWORKS?.split(',') || ['5']
);

export const injected = new InjectedConnector({
  supportedChainIds: REACT_APP_NETWORKS,
});

export const connectorsByName: { [name: string]: AbstractConnector } = {
  Injected: injected,
};

export const connectorName = 'Injected';
