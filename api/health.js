const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { error } = await supabase
        .from("jobs")
        .select("id")
        .limit(1);

      if (error) {
        return res.status(500).json({
          success: false,
          message: "Supabase connection failed",
          error: error.message
        });
      }

      return res.status(200).json({
        success: true,
        message: "Jobs Overseas API and Supabase are connected"
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  }

  return res.status(404).json({
    success: false,
    message: "API route not found"
  });
};
