import { Request, Response, NextFunction, } from "express";
import { attachMiddleware } from "@decorators/express";
import { ObjectSchema, ObjectShape, ValiError, parseAsync, strict } from "valibot";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  function Pipe<TObjectShTObjectShape extends ObjectSchema<any,object>>(schema:TObjectShTObjectShape) {
    return function (
target: unknown,
        propertyKey: string,
        _descriptor: PropertyDescriptor
    ) {
        attachMiddleware(
            target,
            propertyKey,
            async (req: Request, res: Response, next: NextFunction) => {
                const schemas = strict( schema)
                try{
                    req.params = await parseAsync(schemas,req.params)      
                    next();

                }catch(err){
                    const error =(err as ValiError)
                    
                    return  res.status(400).json({
                                success: false,
                                message:error.message,
                            });
                }
                
            }
        );
    };
}
