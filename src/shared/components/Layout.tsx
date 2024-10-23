import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'shared/components/Header';
import { useAppDispatch } from '../hooks/redux-toolkit';

import { getCampaignsList } from '../stores/campaign/campaignSlice';

export function GlobalLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCampaignsList());
  }, []);

  return (
    <>
      <Header />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default GlobalLayout;
