export const errorHandler = (err, req, res, next) => {
  console.error("Xato:", err);

  const statusCode = err.status || 500;
  const message = err.message || "Serverda ichki xatolik yuz berdi";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
