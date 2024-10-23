import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import { CampaignStatus, ICampaign } from '../../../shared/types';

type Props = {
  campaigns: ICampaign[];
};

const AnalysisChart: React.FC<Props> = ({ campaigns }) => {
  const chartOption = useMemo(() => {
    const completed = campaigns.filter(
      (item) => item.status === CampaignStatus.Completed
    );
    const active = campaigns.filter(
      (item) => item.status === CampaignStatus.Active
    );
    const paused = campaigns.filter(
      (item) => item.status === CampaignStatus.Paused
    );

    const calcPercentage = (value: number) => {
      return Math.floor((value / campaigns.length) * 100) + ' %';
    };

    return {
      title: {
        text: '',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            {
              value: active.length,
              name: `Active ${calcPercentage(active.length)}`
            },
            {
              value: paused.length,
              name: `Paused ${calcPercentage(paused.length)}`
            },
            {
              value: completed.length,
              name: `Completed ${calcPercentage(completed.length)}`
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }, [campaigns]);

  return <ReactEcharts className="chat-wrapper" option={chartOption} />;
};

export default AnalysisChart;
