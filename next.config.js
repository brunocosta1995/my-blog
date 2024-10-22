const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

module.exports = (phase) => {
    //usando databases diferentes quando é executado npm run dev e outro para build
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "nextjs-course",
        mondodb_password: "729245",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-site-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "nextjs-course",
      mondodb_password: "729245",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-site",
    },
  };
};
