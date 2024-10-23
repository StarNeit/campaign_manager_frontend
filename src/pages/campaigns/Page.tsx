import { useState } from 'react';
import { useAppSelector } from '../../shared/hooks/redux-toolkit';
import { CampaignCard } from './components/CampaignCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import { deleteCampaignAPI } from '../../shared/api/campaign/api';
import { useAppDispatch } from '../../shared/hooks/redux-toolkit';
import { getCampaignsList } from '../../shared/stores/campaign/campaignSlice';

const CampaignsPage = () => {
  const dispatch = useAppDispatch();
  const campaigns = useAppSelector((state) => state.campaign.campaigns);

  const [campaignId, setCampaignId] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    try {
      if (campaignId) {
        await deleteCampaignAPI(campaignId);
        dispatch(getCampaignsList());
        setCampaignId(null);
      }
    } catch (e) {
      window.alert(e);
    }
  };

  const handleCloseConfirmModal = () => {
    setCampaignId(null);
  };

  return (
    <Container fluid className="py-5 px-4">
      <Row>
        {campaigns?.map((data, index) => (
          <Col key={index} xl={2} lg={3} md={4} sm={6} className="mb-3">
            <CampaignCard data={data} onDelete={() => setCampaignId(data.id)} />
          </Col>
        ))}
      </Row>

      <ConfirmDialog
        message="Are you sure to delete this campaign?"
        open={!!campaignId}
        onConfirm={() => handleConfirmDelete()}
        onClose={handleCloseConfirmModal}
      />
    </Container>
  );
}

export default CampaignsPage;
