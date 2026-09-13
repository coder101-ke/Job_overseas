const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;

    if (!url || !key) {
      return res.status(500).json({
        success: false,
        error: "Supabase environment variables are missing",
        hasUrl: !!url,
        hasKey: !!key
      });
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      jobs: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
