import React from 'react';
import { useParams } from 'react-router-dom';
import IotServicePage from '../components/iot/IotServicePage';
import { getIotService } from '../components/iot/iotData';
import NotFound from './NotFound';

const IotServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getIotService(slug);

  if (!service) {
    return <NotFound />;
  }

  return <IotServicePage service={service} />;
};

export default IotServiceDetailPage;
