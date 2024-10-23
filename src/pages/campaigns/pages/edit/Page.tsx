import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CampaignForm } from '../../components/CampaignForm';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../shared/hooks/redux-toolkit';
import { ICampaign } from '../../../../shared/types';
import { updateCampaignAPI } from '../../../../shared/api/campaign/api';
import { getCampaignsList } from '../../../../shared/stores/campaign/campaignSlice';

export function CampaignsEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const campaigns = useAppSelector((state) => state.campaign.campaigns);

  const campaign = useMemo(() => {
    return campaigns?.find((item) => item.id === id) ?? null;
  }, [campaigns]);

  const handleSubmit = async (values: Omit<ICampaign, 'id'>) => {
    try {
      await updateCampaignAPI({ id: id as string, ...values });
      dispatch(getCampaignsList());
      navigate('/');
    } catch (e) {
      window.alert(e);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center pt-5">
      <h2 className="fw-bold py-5">Edit Campaign</h2>

      <div className="form-wrapper px-3">
        {campaign && (
          <CampaignForm onSubmit={handleSubmit} initialData={campaign} />
        )}
      </div>
    </div>
  );
}

export default CampaignsEditPage;
