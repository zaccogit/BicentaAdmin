import { Metadata } from 'next';
import Training from '../../../components/Training/Training';
import Layout from '../../../components/layout/Layout';

export const metadata: Metadata = {
  title: "Training",
  description: "Training del cerebro",
};

export default function TrainingPage() {
  return (
    <Layout title='Training'>
        <Training />
    </Layout>
  )
}
