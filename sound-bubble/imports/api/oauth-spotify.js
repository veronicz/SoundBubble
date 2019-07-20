import { ServiceConfiguration } from 'meteor/service-configuration';

const init = () => {
  ServiceConfiguration.configurations.update(
    { service: 'spotify' },
    {
      $set: {
        clientId: 'e32de789ed4e489f9d2c5c8ac76bb6d6',
        secret: 'c5ed1e4ad31643f09f1c24ac4553d46f'
      }
    },
    { upsert: true }
  );
};

export default init;
