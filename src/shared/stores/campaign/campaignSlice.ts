import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'shared/stores';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICampaign } from '../../types';
import { getCampaignsListAPI } from '../../api/campaign/api';
import { AxiosResponse } from 'axios';
import { GetCampaignsListApiResponse } from '../../api/campaign/types';

interface CampaignState {
  campaigns: ICampaign[];
  loading: boolean;
}

const initialState: CampaignState = {
  campaigns: [],
  loading: false
};

export const getCampaignsList = createAsyncThunk(
  'getCampaignsList',
  getCampaignsListAPI
);

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaignsList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCampaignsList.fulfilled,
      (
        state,
        action: PayloadAction<AxiosResponse<GetCampaignsListApiResponse>>
      ) => {
        state.loading = false;
        if (action.payload.data.data) {
          state.campaigns = action.payload.data.data;
        }
      }
    );
    builder.addCase(getCampaignsList.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const campaigns = (state: RootState) => state.campaign.campaigns;

export default campaignSlice.reducer;
