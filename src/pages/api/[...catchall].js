import app from '../../backend/index';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default app;
