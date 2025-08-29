const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd = [];
    let even = [];
    let alphabets = [];
    let special = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even.push(item.toString());
        else odd.push(item.toString());
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special.push(item);
      }
    });

    let allAlpha = alphabets.join("");
    let concatStr = allAlpha
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.json({
      is_success: true,
      user_id: "yourname_ddmmyyyy",  // <-- replace with yours
      email: "yourmail@xyz.com",     // <-- replace with yours
      roll_number: "YOURROLL123",    // <-- replace with yours
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: special,
      sum: sum.toString(),
      concat_string: concatStr
    });
  } catch (err) {
    res.json({ is_success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
