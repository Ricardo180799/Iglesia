const db = require("../Config/DB");

exports.GetDonationByEventId = async (Event_Id) => {
  const query = "SELECT * FROM donations WHERE Event_Id = ?";
  try {
    const [rows] = await db.execute(query, [Event_Id]);
    return rows[0] || null;
  } catch (err) {
    throw err;
  }
};
exports.AddDonation = async (User_Id, Stripe_Id, Amount, Currency, Type) => {
  const query =
    "INSERT INTO donations (User_Id, Stripe_Id,Amount,CURRENCY,Type,Status)VALUES(?,?,?,?,?,?)";
  try {
    await db.execute(query, [
      User_Id,
      Stripe_Id,
      Amount,
      Currency,
      Type,
      "pending",
    ]);
    return true;
  } catch (err) {
    throw err;
  }
};
exports.UpdateDonationByStripeId = async (status, Stripe_Id, Event_Id) => {
  const query =
    "UPDATE donations SET Status = ?, Event_Id = ? WHERE Stripe_Id = ?";
  try {
    await db.execute(query, [status, Event_Id, Stripe_Id]);
    return true;
  } catch (err) {
    throw err;
  }
};
