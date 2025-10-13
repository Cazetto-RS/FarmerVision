
const sendResponse = (res, {
  success = true,
  statusCode = 200,
  message = "Operação realizada com sucesso",
  data = null,
  quant_rows = null
} = {}) => {
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
    quant_rows: Array.isArray(data) ? data.length : quant_rows ?? (data ? 1 : 0)
  });
};

// - Resposta padrão de sucesso
export const success = (res, { message = "Operação realizada com sucesso", data = null } = {}) => {
  return sendResponse(res, { success: true, statusCode: 200, message, data });
};

// - Recurso criado com sucesso (201)
export const created = (res, { message = "Recurso criado com sucesso", data = null } = {}) => {
  return sendResponse(res, { success: true, statusCode: 201, message, data });
};

// - Sem conteúdo (204) → usado em deleções ou quando não há retorno
export const noContent = (res, { message = "Operação concluída sem conteúdo" } = {}) => {
  return res.status(204).json({
    success: true,
    statusCode: 204,
    message,
    data: null,
    quant_rows: 0
  });
};

// - Recurso não encontrado (404)
export const notFound = (res, { message = "Recurso não encontrado" } = {}) => {
  return sendResponse(res, { success: false, statusCode: 404, message, data: null, quant_rows: 0 });
};

// - Erro de servidor ou regra de negócio
export const error = (res, { statusCode = 500, message = "Erro interno do servidor", data = null } = {}) => {
  return sendResponse(res, { success: false, statusCode, message, data });
};
