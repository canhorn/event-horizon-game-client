import { createClientScriptFromTemplate } from "../create/CreateScriptFromTemplate";

export const runClientScript = (id: string, name: string, data: any) => {
    createClientScriptFromTemplate(id, name).run<void>(data);
};
export const runClientScriptWithReturn = <T>(
    id: string,
    name: string,
    data: any
): T => createClientScriptFromTemplate(id, name).run(data);
