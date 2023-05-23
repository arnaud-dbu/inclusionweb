'use client';

import Modal from '@/app/(session)/web/[id]/partials/Modal';
import { useState } from 'react';
import NetworkSideMenu from './NetworkSideMenu';
import Web from './Web';

type Props = {
  data: any;
};

const MyWeb = ({ data }: Props) => {
  const [modalVisible, setModalVisible] = useState(close);

  return (
    <>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <NetworkSideMenu data={data} setModalVisible={setModalVisible} />
      <Web data={data} />
    </>
  );
};

export default MyWeb;
