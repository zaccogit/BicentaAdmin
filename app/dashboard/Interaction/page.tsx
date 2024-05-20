import { Metadata } from 'next';
import Interaction from '../../../components/Interaction/Interaction';
import Layout from '../../../components/layout/Layout';


export const metadata: Metadata = {
  title: "Interacciones",
  description: "Interacciones con el cerebro",
};

export default function InteractionPage() {
  return (
    <Layout title='Interaction'>
        <Interaction />
    </Layout>
  )
}
