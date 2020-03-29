import './bootstrap';
import app from './app';

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
