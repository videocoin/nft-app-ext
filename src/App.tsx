import ArtsPage from 'components/ArtsPage';
import CreatorPage from 'components/CreatorPage';
import CreatorsPage from 'components/CreatorsPage';
import DetailsPage from 'components/DetailsPage';
import EditProfilePage from 'components/EditProfilePage';
import Footer from 'components/Footer';
import Home from 'components/Home';
import Modals from 'components/Modals';
import ProfilePage from 'components/ProfilePage';
import ProtectedRoute from 'components/ProtectedRoute';
import ScrollToTop from 'components/ScrollToTop';
import UploadMultipleItems from 'components/UploadPage/UploadMultipleItems';
import { connectorName, connectorsByName } from 'lib/connectors';
import { useEagerConnect, useInactiveListener } from 'lib/hooks';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RootStore, StoreContext, useStore } from 'store';

import { Center, Spinner } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import Header from './components/Header';
import routes from './routes';

const currentConnector = connectorsByName[connectorName];

export const store = new RootStore();

const Inner = observer(() => {
  const { isLoading } = useStore('metamaskStore');
  if (isLoading)
    return (
      <Center py={24}>
        <Spinner size="xl" />
      </Center>
    );
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.arts} element={<ArtsPage />} />
        <Route path={routes.art} element={<DetailsPage />} />
        <Route path={routes.creators} element={<CreatorsPage />} />
        <Route path={routes.creator} element={<CreatorPage />} />
        <ProtectedRoute path={routes.upload} element={UploadMultipleItems} />
        <ProtectedRoute element={ProfilePage} path={routes.profile} />
        <ProtectedRoute element={EditProfilePage} path={routes.editProfile} />
      </Routes>
    </>
  );
});

function App() {
  const { connector } = useWeb3React<Web3Provider>();
  const triedEager = useEagerConnect();
  const [activatingConnector, setActivatingConnector] =
    useState<AbstractConnector>();
  useInactiveListener(!triedEager || !!activatingConnector);
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  useEffect(() => {
    setActivatingConnector(currentConnector);
  }, []);
  return (
    <StoreContext.Provider value={store}>
      <ScrollToTop />
      <Header />
      <Inner />
      <Footer />
      <Modals />
    </StoreContext.Provider>
  );
}

export default App;
