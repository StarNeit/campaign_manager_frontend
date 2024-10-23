import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CampaignStatus, ICampaign } from '../../../shared/types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BadgeColor = {
  [CampaignStatus.Active]: 'primary',
  [CampaignStatus.Completed]: 'success',
  [CampaignStatus.Paused]: 'dark'
};

type Props = {
  data: ICampaign;
  onDelete: () => void;
};

export const CampaignCard: React.FC<Props> = ({ data, onDelete }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="ellipsis w-100">{data.name}</Card.Title>
      </Card.Header>

      <Card.Body>
        <div className="d-flex gap-3 fw-medium">
          <div>From: {moment(data.start_date).format('MMM DD, YYYY')}</div>
          <div>To: {moment(data.end_date).format('MMM DD, YYYY')}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-3 fw-bold">{data.budget}$</div>
          <Badge bg={BadgeColor[data.status]} className="text-uppercase small">
            {data.status}
          </Badge>
        </div>
      </Card.Body>

      <Card.Footer>
        <Row>
          <Col xs={6}>
            <Link to={`/campaign/edit/${data.id}`}>
              <Button className="w-100" variant="outline-primary">
                Edit
              </Button>
            </Link>
          </Col>
          <Col xs={6}>
            <Button
              className="w-100"
              variant="outline-danger"
              onClick={onDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
