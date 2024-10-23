import { ICampaign } from '../../types';

/**
 * Maybe use AI to generate typescript interface based on the response.
 */
export type GetCampaignsListApiResponse = {
  data: ICampaign[];
};

export type GetCampaignApiResponse = {
  data: ICampaign;
};

export type CreateCampaignApiResponse = {
  message: string;
};
