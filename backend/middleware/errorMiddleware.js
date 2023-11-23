const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const handleError = (err, req, res, next) => {
  if (err) {
    // Check if an error object exists
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  } else {
    next(); // If no error, pass control to the next middleware
  }
};
export { notFound, handleError };
