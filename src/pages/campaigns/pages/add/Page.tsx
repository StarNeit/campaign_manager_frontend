import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../shared/hooks/redux-toolkit';
import { CampaignForm } from '../../components/CampaignForm';
import { ICampaign } from '../../../../shared/types';
import { createCampaignAPI } from '../../../../shared/api/campaign/api';
import { getCampaignsList } from '../../../../shared/stores/campaign/campaignSlice';

export function CampaignsAddPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (value: Omit<ICampaign, 'id'>) => {
    try {
      await createCampaignAPI(value);
      dispatch(getCampaignsList());
      navigate('/');
    } catch (e) {
      window.alert(e);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center pt-5">
      <h2 className="fw-bold py-5">Add new Campaign</h2>

      <div className="form-wrapper px-3">
        <CampaignForm onSubmit={handleSubmit} initialData={null} />
      </div>
    </div>
  );
}

export default CampaignsAddPage;
