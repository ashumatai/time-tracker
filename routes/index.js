import * as userRoutes from "/users.js";
import * as authRoutes from "/auth.js";
import * as orgRoutes from "/org.js";

const constructorMethod = (app) => {
  app.use('/', authRoutes);
  app.use('/users', userRoutes);
  app.use('/org', orgRoutes);

  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};

module.exports = constructorMethod;