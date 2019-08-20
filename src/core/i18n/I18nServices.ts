import { II18nMap } from "../../engine/i18n/model/II18nMap";
import { getI18nState, setI18nState } from "../../engine/i18n/store/I18nStore";
import defaultJson from "./default.json";

export const supportedLocaleList = ["en_US", "de_DE", "fr_FR"];
export const getResourceBundle = (locale: string) =>
    getResourceBundleByBundleName(`default.${locale}.json`).catch(_ =>
        setResourceBundle(defaultJson)
    );
export const setDefaultResourceBundle = () => setResourceBundle(defaultJson);
const getResourceBundleByBundleName = async (resourceBundleName: string) => {
    const headers = new Headers();
    headers.append("pragma", "no-cache");
    headers.append("cache-control", "no-cache");
    const response = await fetch(`/i18n/${resourceBundleName}`, {
        method: "GET",
        headers,
    });
    const response_1 = await response.json();
    return setResourceBundle(response_1);
};
const setResourceBundle = (resourceBundle: II18nMap) =>
    setI18nState(resourceBundle);

export const translation = (
    key: string,
    ...replaces: Array<string | number>
): string =>
    replaces.reduceRight<string>(
        (current, replace, index) =>
            replaceAtIndex(current, replace.toString(), index),
        getCurrentKeyValue(key)
    );
const getCurrentKeyValue = (key: string) => getI18nState()[key] || `{{${key}}}`;
const replaceAtIndex = (
    keyValue: string,
    replacementValue: string,
    index: number
) => keyValue.replace(`\{${index}\}`, replacementValue);
export type ITranslationResolver = (
    key: string,
    ...replaces: Array<string | number>
) => string;

setResourceBundle(defaultJson);