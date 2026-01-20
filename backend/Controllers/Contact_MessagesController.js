const {
  getContact_message,
  DeleteContact_message,
  UpdateContact_message,
  AddContact_message,
} = require("../Repositorio/Contact_messages");

exports.getContact_messages = async (req, res, next) => {
  try {
    const info = await getContact_message();

    return res.json({ info });
  } catch (err) {
    next(err);
  }
};
exports.DeleteContact_messages = async (req, res, next) => {
  const { id } = req.body;
  try {
    await DeleteContact_message(id);

    return res.json({ message: "Contacto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.UpdateContact_messages = async (req, res, next) => {
  const { Name, Email, Phone, Message, Type } = req.body;
  try {
    await UpdateContact_message(Name, Email, Phone, Message, Type);

    res.json({ message: "Contacto actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};
exports.AddContact_messages = async (req, res, next) => {
  const { Name, Apellidos, Email, Teléfono, Mensaje, Tipo } = req.body;
  try {
    await AddContact_message(Name, Apellidos, Email, Teléfono, Mensaje, Tipo);

    res.json({ message: "Formulario enviado correctamente" });
  } catch (err) {
    next(err);
  }
};
