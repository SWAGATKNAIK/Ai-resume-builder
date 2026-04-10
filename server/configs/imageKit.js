import ImageKit from '@imagekit/nodejs';

const imageKit = new ImageKit({
  privateKey: process.env._IMAGEKIT_PRIVATE_KEY,
});

export default imageKit;