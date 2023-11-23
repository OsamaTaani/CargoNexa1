const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const driverRoutes = require('./routes/driverRouter'); 
const adminRoutes = require('./routes/adminRouter'); 
const createOrder = require("./routes/orderRouter");
const dashboardOrdersRouter = require('./routes/dashboardOrdersRouter');
const dashboardUsersRouter = require('./routes/dashboardUsersRouter');
const dashboardDriversController = require('./routes/dashboardDriversRouter');
const userProfile = require('./routes/userProfileRouter');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);
app.use(createOrder);
app.use('/admin' , adminRoutes);
app.use(dashboardOrdersRouter);
app.use(dashboardUsersRouter);
app.use(dashboardDriversController);
app.use(userProfile);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
