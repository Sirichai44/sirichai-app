import moment from 'moment';

import cer1 from '@/assets/certificate/cer1.jpg';
import cer2 from '@/assets/certificate/cer2.jpg';
import cer3 from '@/assets/certificate/cer3.png';
import cer4 from '@/assets/certificate/cer4.jpeg';
import cer5 from '@/assets/certificate/cer5.jpeg';
import cer6 from '@/assets/certificate/cer6.jpeg';
import cer7 from '@/assets/certificate/cer7.jpeg';
import cer8 from '@/assets/certificate/cer8.jpeg';
import cer9 from '@/assets/certificate/cer9.jpeg';
import cer10 from '@/assets/certificate/cer10.jpeg';
import cer11 from '@/assets/certificate/cer11.jpeg';
import cer12 from '@/assets/certificate/cer12.jpeg';
import cer13 from '@/assets/certificate/cer13.jpeg';
import cer14 from '@/assets/certificate/cer14.jpeg';
import cer15 from '@/assets/certificate/cer15.jpg';
import cer16 from '@/assets/certificate/cer16.jpeg';
import cer17 from '@/assets/certificate/cer17.png';

export const CertificateList = () => {
  const certificates: {
    id: number;
    name: string;
    date: string;
    source: string;
    url: string;
  }[] = [
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
      date: '2023-07-04',
      source: cer5,
      url: 'https://www.udemy.com/certificate/UC-29eb2677-deb1-4abe-baef-450525266e47'
    },
    {
      id: 6,
      name: 'JavaScript 40 Workshop - Building 40 Projects',
      date: '2023-06-17',
      source: cer6,
      url: 'https://www.udemy.com/certificate/UC-85e8d315-6796-44de-9cff-b97c2ee676af'
    },
    {
      id: 7,
      name: 'Analyze Data to Answer Questions',
      date: '2023-01-29',
      source: cer7,
      url: 'https://www.coursera.org/account/accomplishments/verify/7LW8PTBSBD8N'
    },
    {
      id: 8,
      name: 'Ask Questions to Make Data-Driven Decisions',
      date: '2023-01-25',
      source: cer8,
      url: 'https://www.coursera.org/account/accomplishments/verify/UWNEAHPQWNU6'
    },
    {
      id: 9,
      name: 'Data Analysis with R Programming',
      date: '2023-01-29',
      source: cer9,
      url: 'https://www.coursera.org/account/accomplishments/verify/JMZE7ZWTMB3Z'
    },
    {
      id: 10,
      name: 'Foundations: Data, Data, Everywhere',
      date: '2023-01-25',
      source: cer10,
      url: 'https://www.coursera.org/account/accomplishments/verify/MNQ9BKW9BDYM'
    },
    {
      id: 11,
      name: 'Google Data Analytics Capstone: Complete a Case Study',
      date: '2023-01-29',
      source: cer11,
      url: 'https://www.coursera.org/account/accomplishments/verify/V8ZTJZV98VKM'
    },
    {
      id: 12,
      name: 'Google Data Analytics',
      date: '2023-01-30',
      source: cer12,
      url: 'https://www.coursera.org/account/accomplishments/professional-cert/3PY78NWELWMM'
    },
    {
      id: 13,
      name: 'Prepare Data for Exploration',
      date: '2023-01-26',
      source: cer13,
      url: 'https://www.coursera.org/account/accomplishments/verify/YTGHPCG56JVW'
    },
    {
      id: 14,
      name: 'Process Data from Dirty to Clean',
      date: '2023-01-29',
      source: cer14,
      url: 'https://www.coursera.org/account/accomplishments/verify/CZYLM7XVVZZR'
    },
    {
      id: 15,
      name: 'Python for Software Engineering Bootcamp',
      date: '2023-07-03',
      source: cer15,
      url: 'https://www.udemy.com/certificate/UC-68383fa4-ea30-497c-b6dd-453f098ae7c6'
    },
    {
      id: 16,
      name: 'Share Data Through the Art of Visualization',
      date: '2023-01-30',
      source: cer16,
      url: 'https://www.coursera.org/account/accomplishments/verify/BBRHMXJJXZM7'
    },
    {
      id: 17,
      name: 'VERIFIED CERTIFICATE of PARTICIPATION',
      date: '2023-01-23',
      source: cer17,
      url: 'https://www.borntodev.com/devlab/certificate_online/dbb796c02db2c5de42755f1c7008c5de'
    }
  ];

  return certificates.sort((a, b) => moment(b.date).diff(moment(a.date)));
};
