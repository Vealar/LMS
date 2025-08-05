import express from 'express';
import cors from 'cors';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import blockAttachmentRoutes from "./routes/attachmentsRoutes.js";
import submissionsRoutes from "./routes/submissionsRoutes.js";
import attachmentsRoutes from "./routes/attachmentsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/server/courses', courseRoutes);
app.use('/server/auth', authRoutes);
app.use("/server/auth", userRoutes);

app.use("/server/tests", testRoutes);

app.use('/server/files', submissionsRoutes);
app.use("/server/files", attachmentsRoutes);
app.use("/server/files", blockAttachmentRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
