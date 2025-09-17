// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import router from './routes/user-routes.js';
// import blogRouter from './routes/blog-routes.js';

// dotenv.config();
// const app = express();
// app.use(cors({ origin: 'http://localhost:3000'}));
// app.use(express.json());
// app.use(express.json());

// app.use("/api/user", router);
// app.use("/api/blog", blogRouter);

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => app.listen(5000))
//   .then(() => console.log('Connected to DB at port 5000'))
//   .catch((err) => console.log("Could not connect to the database", err));

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';

dotenv.config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',        // exact origin (no *)
  credentials: true,                      // allow cookies/credentials
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'], // add others if you send them
};

app.use(cors(corsOptions));
// make sure preflight requests get the headers too
app.options('*', cors(corsOptions));

app.use(express.json()); // (remove the duplicate)

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(5000))
  .then(() => console.log('Connected to DB at port 5000'))
  .catch((err) => console.log("Could not connect to the database", err));

