module.exports = (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Jobs Overseas API is running"
    });
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed"
  });
};
