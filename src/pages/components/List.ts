import moment from 'moment';

import cer1 from '@/assets/certificate/cer1.jpg';
import cer2 from '@/assets/certificate/cer2.jpg';
import cer3 from '@/assets/certificate/cer3.png';
import cer4 from '@/assets/certificate/cer4.jpeg';
import cer5 from '@/assets/certificate/cer5.jpeg';
import cer6 from '@/assets/certificate/cer6.jpeg';

export const CertificateList = () => {
  const certificates = [
    {
      id: 1,
      name: 'พัฒนาเว็บด้วย JavaScript แบบ MERN Stack',
      date: '2023-08-18',
      source: cer1,
      url: 'https://www.udemy.com/certificate/UC-2aa521e5-2d5f-440b-b3d0-f7303590cf07'
    },
    {
      id: 2,
      name: 'JavaScript Building 20 Projects',
      date: '2023-12-28',
      source: cer2,
      url: 'https://www.udemy.com/certificate/UC-c9c7a95e-ff53-4fde-8743-5011f1441f6a'
    },
    {
      id: 3,
      name: 'Github for Developer',
      date: '2023-11-28',
      source: cer3,
      url: 'https://school.borntodev.com/certificate/xIrR8LOgwB18'
    },
    {
      id: 4,
      name: 'เจาะลึก TypeScript ตั้งแต่เริ่มต้นจนใช้งานจริง',
      date: '2023-08-01',
      source: cer4,
      url: 'https://www.udemy.com/certificate/UC-4a5fef1b-3027-42dd-b6c7-3161219fc1c3'
    },
    {
      id: 5,
      name: 'พัฒนาเว็บแอพพลิเคชั่นด้วย React Real-World Projects',
      source: cer5,
      url: 'https://www.udemy.com/certificate/UC-29eb2677-deb1-4abe-baef-450525266e47'
    },
    {
      id: 6,
      name: 'JavaScript 40 Workshop - Building 40 Projects',
      source: cer6,
      url: 'https://www.udemy.com/certificate/UC-85e8d315-6796-44de-9cff-b97c2ee676af'
    }
  ];
  return certificates.sort((a, b) => moment(b.date).diff(moment(a.date)));
};
