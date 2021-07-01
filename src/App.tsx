import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'components/Home';
import Header from './components/Header';
import { GlobalStyles } from 'globalStyles';
import Footer from 'components/Footer';
import routes from './routes';
import VideoDetailsPage from 'components/VideoDetailsPage';
import ScrollToTop from 'components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import CreatorsPage from 'components/CreatorsPage';
import CreatorPage from 'components/CreatorPage';
import VideoArtsPage from 'components/VideoArtsPage';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEagerConnect, useInactiveListener } from 'lib/hooks';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { connectorName, connectorsByName } from 'lib/connectors';
import UploadPage from 'components/UploadPage';
import UploadSingleItem from 'components/UploadPage/UploadSingleItem';
import { RootStore, StoreContext } from 'store';
import Modals from 'components/Modals';
import ProfilePage from 'components/ProfilePage';
import EditProfilePage from 'components/EditProfilePage';
const queryClient = new QueryClient();

const currentConnector = connectorsByName[connectorName];

export const store = new RootStore();

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
    <BrowserRouter>
      <StoreContext.Provider value={store}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path="/drops" element={<Home />} />
            <Route path={routes.videos} element={<VideoArtsPage />} />
            <Route path={routes.video} element={<VideoDetailsPage />} />
            <Route path={routes.creators} element={<CreatorsPage />} />
            <Route path={routes.creator} element={<CreatorPage />} />
            <Route path={routes.upload} element={<UploadPage />} />
            <Route path={routes.uploadSingle} element={<UploadSingleItem />} />
            <Route path={routes.profile} element={<ProfilePage />} />
            <Route path={routes.editProfile} element={<EditProfilePage />} />
          </Routes>
          <Footer />
          <Modals />
          <ToastContainer position="bottom-left" />
        </QueryClientProvider>
      </StoreContext.Provider>
    </BrowserRouter>
  );
}

export default App;
