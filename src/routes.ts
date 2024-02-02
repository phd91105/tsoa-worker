// WARNING: This file was auto-generated with tsoa for jsdom. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  fetchMiddlewares,
  IocContainer,
  IocContainerFactory,
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './controllers/user';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GithubController } from './controllers/github';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BatchController } from './controllers/batch';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OAuthController } from './controllers/auth/oauth';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './controllers/auth/jwt';
import { authenticationHandler } from './middlewares/auth';
import { iocContainer } from './ioc';
import { Hono } from 'hono/tiny';
import type { Context, Next } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
// swagger
import swaggerUI from '../templates/swagger';
import swaggerSpec from '../swagger.json';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    '_36_Enums.Role': {
        dataType: 'refAlias',
        type: {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["user"]},{"dataType":"enum","enums":["admin"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.NullableStringFieldUpdateOperationsInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.StringFieldUpdateOperationsInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.EnumRoleFieldUpdateOperationsInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"ref":"_36_Enums.Role"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.NullableDateTimeFieldUpdateOperationsInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"},{"dataType":"enum","enums":[null]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.DateTimeFieldUpdateOperationsInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.UserUpdateInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedAt":{"dataType":"union","subSchemas":[{"ref":"Prisma.DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"createdAt":{"dataType":"union","subSchemas":[{"ref":"Prisma.DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"lastLogin":{"dataType":"union","subSchemas":[{"ref":"Prisma.NullableDateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"password":{"dataType":"union","subSchemas":[{"ref":"Prisma.StringFieldUpdateOperationsInput"},{"dataType":"string"}]},"role":{"dataType":"union","subSchemas":[{"ref":"Prisma.EnumRoleFieldUpdateOperationsInput"},{"ref":"_36_Enums.Role"}]},"email":{"dataType":"union","subSchemas":[{"ref":"Prisma.StringFieldUpdateOperationsInput"},{"dataType":"string"}]},"name":{"dataType":"union","subSchemas":[{"ref":"Prisma.NullableStringFieldUpdateOperationsInput"},{"dataType":"string"},{"dataType":"enum","enums":[null]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    '_36_Enums.RunStatus': {
        dataType: 'refAlias',
        type: {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["waiting"]},{"dataType":"enum","enums":["running"]},{"dataType":"enum","enums":["success"]},{"dataType":"enum","enums":["failed"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'PrintOpts': {
        dataType: 'refObject',
        properties: {
            'format': {"dataType":"string"},
            'landscape': {"dataType":"boolean"},
            'printBackground': {"dataType":"boolean"},
            'scale': {"dataType":"double"},
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'BatchRequest': {
        dataType: 'refObject',
        properties: {
            'ref': {"dataType":"string","required":true},
            'printOpts': {"ref":"PrintOpts"},
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.JsonValue': {
        dataType: 'refAlias',
        type: {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"boolean"},{"ref":"Prisma.JsonObject"},{"ref":"Prisma.JsonArray"},{"dataType":"enum","enums":[null]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.JsonObject': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"Prisma.JsonValue"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.JsonArray': {
        dataType: 'refObject',
        properties: {
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.NullTypes.DbNull': {
        dataType: 'refObject',
        properties: {
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.NullTypes.JsonNull': {
        dataType: 'refObject',
        properties: {
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.NullableJsonNullValueInput': {
        dataType: 'refAlias',
        type: {"dataType":"union","subSchemas":[{"ref":"Prisma.NullTypes.DbNull"},{"ref":"Prisma.NullTypes.JsonNull"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.InputJsonValue': {
        dataType: 'refAlias',
        type: {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"boolean"},{"ref":"Prisma.InputJsonObject"},{"ref":"Prisma.InputJsonArray"},{"dataType":"nestedObjectLiteral","nestedProperties":{}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.InputJsonObject': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"Prisma.InputJsonValue"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.InputJsonArray': {
        dataType: 'refObject',
        properties: {
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.NullableEnumRunStatusFieldUpdateOperationsInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"union","subSchemas":[{"ref":"_36_Enums.RunStatus"},{"dataType":"enum","enums":[null]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.NullableIntFieldUpdateOperationsInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"divide":{"dataType":"double"},"multiply":{"dataType":"double"},"decrement":{"dataType":"double"},"increment":{"dataType":"double"},"set":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Prisma.BatchStatusUpdateInput': {
        dataType: 'refAlias',
        type: {"dataType":"nestedObjectLiteral","nestedProperties":{"updatedById":{"dataType":"union","subSchemas":[{"ref":"Prisma.NullableIntFieldUpdateOperationsInput"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"updatedAt":{"dataType":"union","subSchemas":[{"ref":"Prisma.DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"createdById":{"dataType":"union","subSchemas":[{"ref":"Prisma.NullableIntFieldUpdateOperationsInput"},{"dataType":"double"},{"dataType":"enum","enums":[null]}]},"createdAt":{"dataType":"union","subSchemas":[{"ref":"Prisma.DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"filePath":{"dataType":"union","subSchemas":[{"ref":"Prisma.NullableStringFieldUpdateOperationsInput"},{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"status":{"dataType":"union","subSchemas":[{"ref":"Prisma.NullableEnumRunStatusFieldUpdateOperationsInput"},{"ref":"_36_Enums.RunStatus"},{"dataType":"enum","enums":[null]}]},"params":{"dataType":"union","subSchemas":[{"ref":"Prisma.NullableJsonNullValueInput"},{"ref":"Prisma.InputJsonValue"}]},"name":{"dataType":"union","subSchemas":[{"ref":"Prisma.NullableStringFieldUpdateOperationsInput"},{"dataType":"string"},{"dataType":"enum","enums":[null]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'SignUp': {
        dataType: 'refObject',
        properties: {
            'email': {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"email must be at least 6 characters","value":6},"maxLength":{"errorMsg":"email must be at most 100 characters","value":100},"pattern":{"errorMsg":"email must be a valid email","value":"^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$"}}},
            'name': {"dataType":"string","validators":{"minLength":{"errorMsg":"name must be at least 3 characters","value":3},"maxLength":{"errorMsg":"name must be at most 20 characters","value":20}}},
            'password': {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"password must be at least 8 characters","value":8},"maxLength":{"errorMsg":"password must be at most 16 characters","value":16},"pattern":{"errorMsg":"password must contain at least one uppercase letter, one lowercase letter and one number","value":"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"}}},
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'SignIn': {
        dataType: 'refObject',
        properties: {
            'email': {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"email must be a valid email","value":"^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$"}}},
            'password': {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"password must be at least 8 characters","value":8},"maxLength":{"errorMsg":"password must be at most 16 characters","value":16},"pattern":{"errorMsg":"password must contain at least one uppercase letter, one lowercase letter and one number","value":"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"}}},
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes<T extends Hono>(router: T) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
                 
    return router
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .get('/user/:id', async (ctx: Context, next: Next) => {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
                authenticationHandler([{"jwt":["admin"]}]),
              ...(fetchMiddlewares<Context>(UserController)),
              ...(fetchMiddlewares<Context>(UserController.prototype.findById)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.findById.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .patch('/user/:id', async (ctx: Context, next: Next) => {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"Prisma.UserUpdateInput"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
                authenticationHandler([{"jwt":["admin"]}]),
              ...(fetchMiddlewares<Context>(UserController)),
              ...(fetchMiddlewares<Context>(UserController.prototype.updateById)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.updateById.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .post('/commit/filter', async (ctx: Context, next: Next) => {
            const args = {
                    csv: {"in":"formData","name":"csv","required":true,"dataType":"file"},
                    organization: {"in":"formData","name":"organization","required":true,"dataType":"string"},
                    repos: {"in":"formData","name":"repos","required":true,"dataType":"string"},
                    branch: {"in":"formData","name":"branch","required":true,"dataType":"string"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<GithubController>(GithubController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
                authenticationHandler([{"githubToken":[]}]),
              ...(fetchMiddlewares<Context>(GithubController)),
              ...(fetchMiddlewares<Context>(GithubController.prototype.cherryPick)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.cherryPick.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .post('/batch', async (ctx: Context, next: Next) => {
            const args = {
                    batchRequest: {"in":"body","name":"batchRequest","required":true,"ref":"BatchRequest"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<BatchController>(BatchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
                authenticationHandler([{"jwt":[]}]),
              ...(fetchMiddlewares<Context>(BatchController)),
              ...(fetchMiddlewares<Context>(BatchController.prototype.createBatch)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.createBatch.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .get('/batch', async (ctx: Context, next: Next) => {
            const args = {
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<BatchController>(BatchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
                authenticationHandler([{"jwt":[]}]),
              ...(fetchMiddlewares<Context>(BatchController)),
              ...(fetchMiddlewares<Context>(BatchController.prototype.getBatch)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.getBatch.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .patch('/batch/:id', async (ctx: Context, next: Next) => {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    body: {"in":"body","name":"body","required":true,"ref":"Prisma.BatchStatusUpdateInput"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<BatchController>(BatchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
                authenticationHandler([{"jwt":[]}]),
              ...(fetchMiddlewares<Context>(BatchController)),
              ...(fetchMiddlewares<Context>(BatchController.prototype.updateStatus)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.updateStatus.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .post('/batch/fileUpload/:id', async (ctx: Context, next: Next) => {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<BatchController>(BatchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
                authenticationHandler([{"jwt":[]}]),
              ...(fetchMiddlewares<Context>(BatchController)),
              ...(fetchMiddlewares<Context>(BatchController.prototype.fileUpload)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.fileUpload.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .get('/batch/file/:filePath', async (ctx: Context, next: Next) => {
            const args = {
                    filePath: {"in":"path","name":"filePath","required":true,"dataType":"string"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<BatchController>(BatchController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
              ...(fetchMiddlewares<Context>(BatchController)),
              ...(fetchMiddlewares<Context>(BatchController.prototype.getFile)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.getFile.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .get('/oauth/github', async (ctx: Context, next: Next) => {
            const args = {
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<OAuthController>(OAuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
              ...(fetchMiddlewares<Context>(OAuthController)),
              ...(fetchMiddlewares<Context>(OAuthController.prototype.githubAuth)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.githubAuth.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .get('/oauth/github/callback', async (ctx: Context, next: Next) => {
            const args = {
                    code: {"in":"query","name":"code","required":true,"dataType":"string"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<OAuthController>(OAuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
              ...(fetchMiddlewares<Context>(OAuthController)),
              ...(fetchMiddlewares<Context>(OAuthController.prototype.githubCallback)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.githubCallback.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .post('/auth/register', async (ctx: Context, next: Next) => {
            const args = {
                    user: {"in":"body","name":"user","required":true,"ref":"SignUp"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
              ...(fetchMiddlewares<Context>(AuthController)),
              ...(fetchMiddlewares<Context>(AuthController.prototype.signUp)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.signUp.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .post('/auth/login', async (ctx: Context, next: Next) => {
            const args = {
                    user: {"in":"body","name":"user","required":true,"ref":"SignIn"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
              ...(fetchMiddlewares<Context>(AuthController)),
              ...(fetchMiddlewares<Context>(AuthController.prototype.signIn)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.signIn.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .post('/auth/refreshToken', async (ctx: Context, next: Next) => {
            const args = {
                    refreshToken: {"in":"body-prop","name":"refreshToken","required":true,"dataType":"string"},
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
              ...(fetchMiddlewares<Context>(AuthController)),
              ...(fetchMiddlewares<Context>(AuthController.prototype.refresh)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.refresh.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .get('/docs', async (ctx: Context, next: Next) => {
          return ctx.html(swaggerUI);
        })
        .get('/docs/spec', async (ctx: Context, next: Next) => {
          return ctx.json(swaggerSpec);
        })
        .get('/auth/profile', async (ctx: Context, next: Next) => {
            const args = {
            };

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(ctx.req) : iocContainer;

            const controller: any = container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const handlers = [
                authenticationHandler([{"jwt":[]}]),
              ...(fetchMiddlewares<Context>(AuthController)),
              ...(fetchMiddlewares<Context>(AuthController.prototype.profile)),
              async () => {
                let validatedArgs: any;

                try {
                  validatedArgs = await getValidatedArgs(args, ctx);
                } catch (err: any) {
                  if (err instanceof ValidateError) {
                    return ctx.json({ fields: err.fields }, (err.status || 422) as StatusCode);
                  }

                  return ctx.json({
                    message: err.message,
                    cause: err.cause,
                  });
                }
                const result = await controller.profile.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

async function runHandlers(ctx: Context, handlers: any) {
  const [handler, ...next] = handlers;

  return handler(ctx, next.length ? () => runHandlers(ctx, next) : undefined);
}

function identifyObject(obj: any) {
  if (obj === null) {
    return 'null';
  } else if (obj === undefined) {
    return 'undefined';
  } else if (typeof obj === 'string') {
    return 'String';
  } else if (typeof obj === 'boolean') {
    return "Boolean";
  } else if (typeof obj === 'number') {
    return 'Number';
  } else if (obj instanceof ArrayBuffer) {
    return 'ArrayBuffer';
  } else if (obj instanceof Buffer) {
    return 'Buffer';
  } else if (typeof obj === 'object') {
    return 'Object';
  } else {
    throw new Error('Unknown type');
  }
}

function returnHandler(
  ctx: Context,
  controller: Controller,
  data?: string | object | number | boolean,
) {
  switch (identifyObject(data)) {
    case 'Number':
    case 'Boolean':
    case 'String':
      if (!data) return;
      return ctx.text(
        data.toString() as string,
        // The default status in required for hono to set the headers
        (controller.getStatus() || 200) as StatusCode,
        controller.getHeaders() as Record<string, string>,
      );    
    case 'ArrayBuffer':    
    case 'Buffer':    
      // Doesn't seem to be a built in way to handle buffers in hono
      return new Response(data as Buffer, {
        status: controller.getStatus(),
        headers: controller.getHeaders() as Record<string, string>,
      });
    case 'Object':
      // The default status in required for hono to set the headers
      return ctx.json(
        data as unknown,
        (controller.getStatus() || 200) as StatusCode,
        controller.getHeaders() as Record<string, string>,
      );

    case 'null':
    case 'undefined':
      return new Response(null, {
        status: controller.getStatus(),
        headers: controller.getHeaders() as Record<string, string>,
      });
    }
}

async function getBody(ctx: Context) {
  const contentType = ctx.req.header('content-type')?.toLowerCase() || '';

  if (contentType.startsWith('application/json')) {
    return ctx.req.json();
  }

  if (contentType.startsWith('application/x-www-form-urlencoded') || contentType.startsWith('multipart/form-data')) {
    return ctx.req.parseBody();
  }

  return ctx.req.text();
}

async function getValidatedArgs(
    args: any,
    ctx: any,    
  ) {
    const errorFields: FieldErrors = {};
    const parsedBody = await getBody(ctx);
    const values = await Promise.all(Object.keys(args).map(async (key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return {
            ...ctx.request,
            ctx,
          };
        case 'query':
          return validationService.ValidateParam(
            args[key],
            ctx.req.query(name),
            name,
            errorFields,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'path':
          return validationService.ValidateParam(
            args[key],
            ctx.req.param(name),
            name,
            errorFields,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'header':
          return validationService.ValidateParam(
            args[key],
            ctx.req.headers.get(name) ?? undefined,
            name,
            errorFields,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body':
          return validationService.ValidateParam(
            args[key],
            parsedBody,
            name,
            errorFields,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body-prop':
          return validationService.ValidateParam(
            args[key],
            parsedBody[name],
            name,
            errorFields,
            'body.',
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(
              args[key],
              parsedBody[name],
              name,
              errorFields,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else if (
            args[key].dataType === 'array' &&
            args[key].array.dataType === 'file'
          ) {
            return validationService.ValidateParam(
              args[key],
              parsedBody.files,
              name,
              errorFields,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              parsedBody[name],
              name,
              errorFields,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          }
      }
    }));
    if (Object.keys(errorFields).length > 0) {
      throw new ValidateError(errorFields, '');
    }
    return values;
  }