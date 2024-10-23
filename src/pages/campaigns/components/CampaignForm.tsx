import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as formik from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { CampaignStatus } from '../../../shared/types';

const defaultValue = {
  name: '',
  status: CampaignStatus.Active,
  budget: 0,
  start_date: '',
  end_date: ''
};

type CampaignInput = {
  name: string;
  budget: number;
  status: CampaignStatus;
  start_date: string;
  end_date: string;
};

type Props = {
  onSubmit: (value: CampaignInput) => void;
  initialData: CampaignInput | null;
};

export const CampaignForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required(),
    budget: yup.number().required(),
    status: yup.string().required(),
    start_date: yup.string().required(),
    end_date: yup
      .string()
      .required()
      .test(
        'end_date',
        'End date cannot be before start date',
        function (value) {
          const { start_date } = this.parent;
          return start_date && value ? value >= start_date : true;
        }
      )
  });

  const handleClickSubmit = (value: CampaignInput) => {
    onSubmit(value);
  };

  const formatInitialData = (payload: CampaignInput) => {
    return {
      ...payload,
      start_date: moment(payload.start_date).format('YYYY-MM-DD'),
      end_date: moment(payload.end_date).format('YYYY-MM-DD')
    };
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleClickSubmit}
      initialValues={
        initialData ? formatInitialData(initialData) : defaultValue
      }>
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              isValid={touched.name && !errors.name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              size="lg"
              type="number"
              name="budget"
              value={values.budget}
              onChange={handleChange}
              isValid={touched.budget && !errors.budget}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              size="lg"
              name="status"
              value={values.status}
              onChange={handleChange}
              isValid={touched.status && !errors.status}>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Row>
            <Form.Group as={Col} sm={6} xs={12} className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                size="lg"
                type="date"
                name="start_date"
                value={values.start_date}
                onChange={handleChange}
                isValid={touched.start_date && !errors.start_date}
              />
            </Form.Group>
            <Form.Group as={Col} sm={6} xs={12} className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                size="lg"
                type="date"
                name="end_date"
                value={values.end_date}
                onChange={handleChange}
                isValid={touched.end_date && !errors.end_date}
              />
            </Form.Group>
          </Row>

          <Button className="w-100 mt-5" size="lg" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
