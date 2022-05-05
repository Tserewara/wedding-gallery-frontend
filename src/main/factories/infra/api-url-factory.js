const apiUrlFactory = (path) => `${import.meta.env.VITE_API_URL}${path}`;

export default apiUrlFactory;
