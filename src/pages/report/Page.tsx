import { useAppSelector } from '../../shared/hooks/redux-toolkit';
import AnalysisChart from './components/AnalysisChart';

const ReportPage = () => {
  const campaigns = useAppSelector((state) => state.campaign.campaigns);

  return (
    <div className="p-5">
      <AnalysisChart campaigns={campaigns} />
    </div>
  );
};

export default ReportPage;
