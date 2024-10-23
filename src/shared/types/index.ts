export interface ICampaign {
  id: string;
  name: string;
  budget: number;
  status: CampaignStatus;
  start_date: string;
  end_date: string;
}

export enum CampaignStatus {
  Active = 'active',
  Paused = 'paused',
  Completed = 'completed'
}
