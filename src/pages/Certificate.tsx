import { useState } from 'react';
import { Grid, Modal } from '@mui/joy';

import { CertificateList } from '@/hook/List';

const Certificate = () => {
  const CerList = CertificateList();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-full p-10 overflow-auto">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 }}>
        {CerList.map((cer) => (
          <Grid xs={4} sm={4} md={6} lg={6} xl={4} key={cer.id} className="mb-10 max-h-72">
            <img
              src={cer.source}
              className="object-fill w-full h-full mb-3 cursor-pointer"
              alt="Certificate"
              onClick={() => handleOpen(cer.source)}
            />
            <a
              href={cer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-500 dark:hover:text-gray-100">
              {cer.name}
            </a>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'auto'
          }}>
          <img src={selectedImage} style={{ width: '100%', height: 'auto' }} alt="Enlarged" />
        </div>
      </Modal>
    </div>
  );
};

export default Certificate;
