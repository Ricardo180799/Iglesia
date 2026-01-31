const {
  audit,
  getAudit,
  getEspecificAudit,
  DeleteAudit,
} = require("../Repositorio/Audit");
const catchAsync = require("../Utils/CatchAsync"); 


exports.audits = (Action, Module, Details) => catchAsync(async (req, res, next) => {
  const User_Id = req.usuario?.ID ?? null;

  await audit(User_Id, Action, Module, Details);
  console.log(`Acción auditada: ${Action} en ${Module}`);

  if (res.locals.response) {
    const { status, body } = res.locals.response;
    
    return res.status(status).json(body);
  }

  res.status(200).json({
    status: "success",
    message: "Operación completada y auditada"
  });
});


exports.getAudits = catchAsync(async (req, res, next) => {
  const info = await getAudit();
  
  res.status(200).json({
    status: "success",
    results: info.length,
    data: { info }
  });
});


exports.getEspecificAudits = catchAsync(async (req, res, next) => {
  const { User_Id } = req.params;

  const info = await getEspecificAudit(User_Id);

  res.status(200).json({
    status: "success",
    data: { info }
  });
});


exports.DeleteAudits = catchAsync(async (req, res, next) => {
  const { ID } = req.params;

  await DeleteAudit(ID);

  res.status(200).json({
    status: "success",
    message: "Registro de auditoría eliminado correctamente"
  });
});