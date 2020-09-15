import { http } from './app';
const port = process.env.PORT || 3001;

http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
