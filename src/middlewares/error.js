module.exports = (err, _req, res, _next) => {
  console.log('first!!!!!!!!!!!!!!!!!!!!!');
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(400).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};