import axios from 'axios';
import {
  CreateCampaignApiResponse,
  GetCampaignApiResponse,
  GetCampaignsListApiResponse
} from './types';
import { ICampaign } from '../../types';

export const getCampaignsListAPI = async () => {
  return await axios.get<GetCampaignsListApiResponse>('/campaign');
};

export const createCampaignAPI = async (payload: Omit<ICampaign, 'id'>) => {
  return await axios.post<CreateCampaignApiResponse>(`/campaign`, payload);
};

export const updateCampaignAPI = async (payload: ICampaign) => {
  const { id, ...rest } = payload;

  return await axios.put<CreateCampaignApiResponse>(`/campaign/${id}`, rest);
};

export const deleteCampaignAPI = async (id: string) => {
  return await axios.delete<GetCampaignApiResponse>(`/campaign/${id}`);
};
