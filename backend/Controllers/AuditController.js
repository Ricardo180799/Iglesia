const {
  audit,
  getAudit,
  getEspecificAudit,
  DeleteAudit,
} = require("../Repositorio/Audit");
exports.audits = (Action, Module, Details) => async (req, res, next) => {
  const User_Id = req.usuario?.ID ?? null;
  try {
    await audit(User_Id, Action, Module, Details);
    console.log("Accion auditada");
    next();
  } catch (err) {
    next(err);
  }
};
exports.getAudits = async (req, res, next) => {
  try {
    const info = await getAudit();
    return res.json({ info });
  } catch (err) {
    next(err);
  }
};
exports.getEspecificAudits = async (req, res, next) => {
  const { User_Id } = req.body;
  try {
    const info = await getEspecificAudit(User_Id);
    return res.json({ info });
  } catch (err) {
    next(err);
  }
};
exports.DeleteAudits = async (req, res, next) => {
  const { ID } = req.body;
  try {
    await DeleteAudit(ID);
    return res.json({ message: "Audit eliminado" });
  } catch (err) {
    next(err);
  }
};
