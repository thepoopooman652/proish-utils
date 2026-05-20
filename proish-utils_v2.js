//=========================================================================================//
//=                                          ---                                          =//
//=                                    Proish Utils v2                                    =//
//=                         A helpful library of useful functions                         =//
//=                                          ---                                          =//
//=                             Copyright 2026 ProishTheIdiot                             =//
//=                                  GNU GPL v3 License                                   =//
//=                                  (GPL-3.0-or-later)                                   =//
//=                                          ---                                          =//
//=                                    Version: v2.2.3                                    =//
//=                                   Created: May 2026                                   =//
//=                                          ---                                          =//
//=                                      Version Name:                                    =//
//=                                  Browser Compatibilty                                 =//
//=                                          ---                                          =//
//=                                     Version Info:                                     =//
//=                      This version added compatibility for browsers                    =//
//=                           With ..2 adding some extra utilities                        =//
//=                                          ---                                          =//
//=                                                                                       =//
//=  Last Updated: 2026-05-20 18:19 EST                                                   =//
//=  WIP Changes: Brainstorm and implement more utilities                                 =//
//=  Recent Changes:                                                                      =//
//=  - Removed the imports for the GPL v3 license text and moved the text itself          =//
//=    into a varible (libraryInfo.license.text) and added 2 console.log statements that  =//
//=    log a short message that states this library is being used as well as logging      =//
//=    the GPL text and copyright info that is required to be included by GPLv3           =//
//=                                                                                       =//
//=========================================================================================//

// GPL License text:
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

console.log("You (or the person that created the page/tool/software your using) is using a library called Proish Utilities v2, which is created by ProishTheIdiot");

// Environment protection flags
const isNode = typeof module !== 'undefined' && module.exports;

const libraryInfo = {
    versionInfo: {
        fileVersion: "proish-utils_v2.2.3",
        versionNum: "v2.2.3",
        versionName: "Proish Utilities Version 2.2.3 - Browser Compatibility & Extra Utilities",
    },
    license: { 
        name: "GNU GPL v3 or later",
        text: "Copyright (C) 2026 ProishTheIdiot\n\nThis program is free software: you can redistribute it and/or modify\nit under the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License\nalong with this program.  If not, see <https://www.gnu.org/licenses/>.",
        url: "https://www.gnu.org/licenses/gpl-3.0.html",
        urlPlainText: "https://www.gnu.org/licenses/gpl-3.0.txt",
        copyright: "Copyright 2026 ProishTheIdiot",
    },

};

console.log(libraryInfo.license.text); // log the required statement from the GNU GPL v3 license
console.log("Run 'showLicense(); in your console to show the full GNU GPL v3 license, which will be fetched from the GNU website.");

function showLicense() {
    fetch(libraryInfo.license.urlPlainText)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => console.log("\n \n " + text))
    .catch(error => console.error('Error:', error));   
};

const config = {
    utilsExportName: "proishUtils", // Export identity target
    testing: false, // TOGGLE THIS FLAG TO TRUE TO ACTIVATE THE SELF-TEST PIPELINE
    logging: {
        level: undefined, // debug, info, warn, error, or undefined to use config.default.logging.level
    },
    trig: {
        haversineConversions: {
            kilometers: 1,
            meters: 1000,
            centimeters: 100000,
            miles: 0.621371,
            yards: 1093.61,
            feet: 3280.84,
            inches: 39370.1,
            'naut miles': 0.539957,
        },
        haversineDist: {
            unit: undefined,    
            precision: undefined, 
        },
    },
    default: { 
        utilsExportName: "proishUtils",
        testMessage: "This is a test message.", 
        logging: {
            level: "error",
        },
        trig: {
            haversineDist: {
                unit: "miles", 
                precision: 5, 
            },
        },
    },
};

// Structured Logging Subsystem
const logging = {
    logLevels: { debug: 1, info: 2, warn: 3, error: 4, none: 5 },
    
    getLogLevelWeight() {
        const rawLevel = config.logging?.level || config.default?.logging?.level || 'error';
        return this.logLevels[String(rawLevel).toLowerCase()] || 4;
    },
    
    debug(...args) { 
        if (this.getLogLevelWeight() <= 1) console.log("[DEBUG]", ...args); 
    },
    
    info(...args) { 
        if (this.getLogLevelWeight() <= 2) console.log("[INFO]", ...args); 
    },
    
    warn(...args) { 
        if (this.getLogLevelWeight() <= 3) console.warn("[WARN]", ...args); 
    },
    
    error(...args) { 
        if (this.getLogLevelWeight() <= 4) console.error("[ERROR]", ...args); 
    }
};

const utils = {

    strings: {
        test(msg) {
            if (!msg) {
                logging.debug("strings.test() invoked without parameters. Emitting default fallback message.");
                return config.default.testMessage;
            }
            return msg;
        },
        getChars(str, combine) {
            if (typeof str !== "string") {
                const err = new TypeError("strings.getChars() expects a valid string primary input.");
                logging.error(err.message, { received: typeof str });
                throw err;
            }
            
            const charCounts = {};
            if (!combine) {
                for (const char of str) {
                    charCounts[char] = (charCounts[char] || 0) + 1;
                }
                return charCounts;
            } else if (typeof combine !== "boolean") {
                const err = new TypeError("'combine' argument must evaluate cleanly to a boolean.");
                logging.error(err.message, { received: typeof combine });
                throw err;
            } else {
                const counts = this.getChars(str, false);
                return Object.entries(counts)
                    .map(([char, count]) => char.repeat(count))
                    .join('');
            }
        },
        generateString(length) {
            const parsedLength = parseInt(length, 10);
            if (isNaN(parsedLength) || parsedLength <= 0) {
                const err = new TypeError("generateString() expects a positive integer value.\nProvided Argument: " + length);
                logging.error(err.message);
                throw err;
            }
            const characterList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+-=[]{}\\|?/<>,.";
            let string = "";
            while (string.length < parsedLength) {
                let newPosition = Math.floor(Math.random() * characterList.length);
                string += characterList.charAt(newPosition);
            }
            logging.debug(`Generated random string of length ${parsedLength}`);
            return string;
        },
        reverse(strVal) {
            if (typeof strVal !== "string") {
                const err = new TypeError("reverse() expects a string datatype reference.");
                logging.error(err.message);
                throw err;
            }
            let reversed = "";
            for (let i = strVal.length - 1; i >= 0; i--) {
                reversed += strVal[i];
            }
            return reversed;
        },
        trimSpaces(strVal) {
            if (typeof strVal !== "string") {
                const err = new TypeError("trimSpaces() expects a string input argument.");
                logging.error(err.message);
                throw err;
            }
            return strVal.replace(/\s+/g, "");
        },
        isPalindrome(strVal) {
            if (typeof strVal !== "string") {
                const err = new TypeError("isPalindrome() expects a string validation check target.");
                logging.error(err.message);
                throw err;
            }
            try {
                let lower = strVal.toLowerCase();
                let trimmed = utils.strings.trimSpaces(lower);
                let original = trimmed;
                let reversed = utils.strings.reverse(trimmed);
                return original === reversed;
            } catch (err) {
                logging.error("Underlying failure inside isPalindrome structural pipeline execution.", err);
                throw err;
            }
        },
        stringToInteger(string, changeLetters) {
            if (typeof string !== "string") {
                const err = new TypeError("stringToInteger() expects a base string input parameter.");
                logging.error(err.message);
                throw err;
            }
            let integer = string.replace(/\D/g, "");
            if (!changeLetters) {
                if (integer === "") {
                    const err = new Error("String contains no extractable integers.\nProvided Argument: " + string);
                    logging.error(err.message);
                    throw err;
                }
                return parseInt(integer, 10);
            } else if (typeof changeLetters !== "boolean") {
                const err = new TypeError("'changeLetters' configuration option must be a strict boolean value.");
                logging.error(err.message);
                throw err;
            } else {
                let result = "";
                for (let i = 0; i < string.length; i++) {
                    let code = string.toUpperCase().charCodeAt(i);
                    if (code > 64 && code < 91) result += (code - 64) + "";
                }
                return parseInt(result.slice(0, result.length - 1) || 0, 10);
            }
        },
        leftpad(strVal, len, ch) {
            strVal = String(strVal);
            let i = -1;
            if (!ch && ch !== 0) ch = ' ';
            len = len - strVal.length;
            while (++i < len) {
                strVal = ch + strVal;
            }
            return strVal;
        },
    },

    cryptoFuncs: {
        test(msg) {
            return msg;
        },
        genUUID() {
            try {
                if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                    return crypto.randomUUID();
                }
                if (typeof require !== 'undefined') {
                    return require("crypto").randomUUID();
                }
                throw new Error("Secure random UUID generation environment modules are missing.");
            } catch (err) {
                logging.error("Failed to generate secure UUID. Verify execution context parameters.", err.message);
                throw err;
            }
        },
        hash: {
            SHA512(strVal) {
                if (typeof require === 'undefined') {
                    const err = new Error("Synchronous SHA512 execution requires a Node.js runtime container.");
                    logging.error(err.message);
                    throw err;
                }
                try {
                    return require("crypto").createHash("sha512").update(String(strVal)).digest("hex");
                } catch (err) {
                    logging.error("SHA512 hashing failure execution context error details:", err.message);
                    throw err;
                }
            },
            SHA384(strVal) {
                if (typeof require === 'undefined') {
                    const err = new Error("Synchronous SHA384 execution requires a Node.js runtime container.");
                    logging.error(err.message);
                    throw err;
                }
                try {
                    return require("crypto").createHash("sha384").update(String(strVal)).digest("hex");
                } catch (err) {
                    logging.error("SHA384 hashing failure execution context error details:", err.message);
                    throw err;
                }
            },
            SHA256(strVal) {
                if (typeof require === 'undefined') {
                    const err = new Error("Synchronous SHA256 execution requires a Node.js runtime container.");
                    logging.error(err.message);
                    throw err;
                }
                try {
                    return require("crypto").createHash("sha256").update(String(strVal)).digest("hex");
                } catch (err) {
                    logging.error("SHA256 hashing failure execution context error details:", err.message);
                    throw err;
                }
            },
        },
    },   

    trig: {
        sin: (x) => Math.sin(x),
        cos: (x) => Math.cos(x),
        tan: (x) => Math.tan(x),
        csc: (x) => 1 / Math.sin(x),
        sec: (x) => 1 / Math.cos(x),
        cot: (x) => 1 / Math.tan(x),
        asin: (x) => Math.asin(x),
        acos: (x) => Math.acos(x),
        atan: (x) => Math.atan(x),
        atan2: (y, x) => Math.atan2(y, x),
        acsc: (x) => Math.asin(1 / x),
        asec: (x) => Math.acos(1 / x),
        acot: (x) => Math.atan(1 / x),
        sinh: (x) => Math.sinh(x),
        cosh: (x) => Math.cosh(x),
        tanh: (x) => Math.tanh(x),
        csch: (x) => 1 / Math.sinh(x),
        sech: (x) => 1 / Math.cosh(x),
        coth: (x) => 1 / Math.tanh(x),
        asinh: (x) => Math.asinh(x),
        acosh: (x) => Math.acosh(x),
        atanh: (x) => Math.atanh(x),
        acsch: (x) => Math.asinh(1 / x),
        asech: (x) => Math.acosh(1 / x),
        acoth: (x) => Math.atanh(1 / x),
        versin:     (x) => 1 - Math.cos(x),
        coversin:   (x) => 1 - Math.sin(x),
        vercos:     (x) => 1 + Math.cos(x),
        covercos:   (x) => 1 + Math.sin(x),
        haversin:   (x) => (1 - Math.cos(x)) / 2,
        havercos:   (x) => (1 + Math.cos(x)) / 2,
        hacoversin: (x) => (1 - Math.sin(x)) / 2,
        hacovercos: (x) => (1 + Math.sin(x)) / 2,
        exsec: (x) => 1 / Math.cos(x) - 1,
        excsc: (x) => 1 / Math.sin(x) - 1,
        crd: (x) => 2 * Math.sin(x / 2),
        sinDeg: (x) => Math.sin((x * Math.PI) / 180),
        cosDeg: (x) => Math.cos((x * Math.PI) / 180),
        tanDeg: (x) => Math.tan((x * Math.PI) / 180),
        cscDeg: (x) => 1 / Math.sin((x * Math.PI) / 180),
        secDeg: (x) => 1 / Math.cos((x * Math.PI) / 180),
        cotDeg: (x) => 1 / Math.tan((x * Math.PI) / 180),
        toRad: (deg) => (deg * Math.PI) / 180,
        toDeg: (rad) => (rad * 180) / Math.PI,
        hypot: (a, b) => Math.hypot(a, b),
        sinc:     (x) => x === 0 ? 1 : Math.sin(x) / x,
        sincNorm: (x) => x === 0 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x),
        lawOfCosinesAngle: (a, b, c) => Math.acos((a**2 + b**2 - c**2) / (2 * a * b)),
        
        haversineDistance: (lat1, lon1, lat2, lon2, unit, precision) => {
            const coordinates = [lat1, lon1, lat2, lon2];
            if (coordinates.some(coord => typeof coord !== 'number' || isNaN(coord))) {
                const err = new TypeError("haversineDistance requires numerical latitude and longitude parameter points.");
                logging.error(err.message, { coordinates });
                throw err;
            }

            try {
                const R = 6371; 
                const dLat = ((lat2 - lat1) * Math.PI) / 180;
                const dLon = ((lon2 - lon1) * Math.PI) / 180;
                const a =
                    Math.sin(dLat / 2) ** 2 +
                    Math.cos((lat1 * Math.PI) / 180) *
                    Math.cos((lat2 * Math.PI) / 180) *
                    Math.sin(dLon / 2) ** 2;
                
                const distanceKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const conversions = config.trig.haversineConversions;
            
                let finalUnit = unit || config.trig.haversineDist.unit || config.default.trig.haversineDist.unit;
                finalUnit = String(finalUnit).toLowerCase();
                if (!conversions[finalUnit]) {
                    logging.warn(`Requested metric unit scale mapping "${finalUnit}" not valid. Reverting back to library structural defaults.`);
                    finalUnit = String(config.default.trig.haversineDist.unit).toLowerCase();
                }
            
                let finalPrecision = precision !== undefined ? precision : (config.trig.haversineDist.precision !== undefined ? config.trig.haversineDist.precision : config.default.trig.haversineDist.precision);
                finalPrecision = parseInt(finalPrecision, 10);
                if (isNaN(finalPrecision) || finalPrecision < 0) {
                    logging.warn(`Precision specification fallback trigger executed. Provided setting value was evaluated invalid.`);
                    finalPrecision = config.default.trig.haversineDist.precision;
                }
            
                const finalDistance = distanceKm * conversions[finalUnit];
                const finalOutputValue = Number(finalDistance.toFixed(finalPrecision));
                
                logging.debug(`Calculated Distance Output: ${finalOutputValue} (Unit: ${finalUnit}, Precision Rounding: ${finalPrecision})`);
                return finalOutputValue;
            } catch (err) {
                logging.error("Critical arithmetic or pipeline failure during great-circle mathematical resolution tracking evaluation steps.", err);
                throw err;
            }
        },
    },

    math: {
        clamp(value, min, max) {
            if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
                const err = new TypeError("math.clamp() expects all arguments to evaluate as numbers.");
                logging.error(err.message, { received: { value: typeof value, min: typeof min, max: typeof max } });
                throw err;
            }
            if (min > max) {
                logging.warn("math.clamp() received a min value greater than max. Swapping thresholds automatically.");
                [min, max] = [max, min];
            }
            return Math.max(min, Math.min(max, value));
        },
        lerp(start, end, amt) {
            if (typeof start !== 'number' || typeof end !== 'number' || typeof amt !== 'number') {
                const err = new TypeError("math.lerp() expects numerical inputs for start, end, and interpolation amount.");
                logging.error(err.message);
                throw err;
            }
            return start + (end - start) * amt;
        },
        scale(val, inMin, inMax, outMin, outMax) {
            if ([val, inMin, inMax, outMin, outMax].some(n => typeof n !== 'number' || isNaN(n))) {
                const err = new TypeError("math.scale() requires five valid numeric tracking parameters.");
                logging.error(err.message);
                throw err;
            }
            if (inMin === inMax) {
                logging.warn("math.scale() division by zero context exception: inMin equals inMax. Returning outMin.");
                return outMin;
            }
            return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        }
    },

    async: {
        sleep(ms) {
            const parsedMs = parseInt(ms, 10);
            if (isNaN(parsedMs) || parsedMs < 0) {
                const err = new TypeError("async.sleep() requires a non-negative integer millisecond definition.");
                logging.error(err.message);
                throw err;
            }
            return new Promise(resolve => setTimeout(resolve, parsedMs));
        },
        async retry(fn, retries = 3, delay = 1000) {
            if (typeof fn !== 'function') {
                const err = new TypeError("async.retry() expects an executable function or promise factory wrapper.");
                logging.error(err.message);
                throw err;
            }
            let lastError;
            for (let i = 0; i < retries; i++) {
                try {
                    return await fn();
                } catch (err) {
                    lastError = err;
                    logging.warn(`async.retry() invocation pipeline attempt ${i + 1} failed. Re-trying execution thread context...`, err.message);
                    if (i < retries - 1) {
                        await this.sleep(delay);
                    }
                }
            }
            logging.error(`async.retry() processing threshold exhausted. Operation critically terminated across all ${retries} attempts.`);
            throw lastError;
        },
        timeout(promise, ms) {
            const parsedMs = parseInt(ms, 10);
            if (isNaN(parsedMs) || parsedMs < 0) {
                const err = new TypeError("async.timeout() requires a non-negative integer timeline constraint.");
                logging.error(err.message);
                throw err;
            }
            if (!(promise instanceof Promise)) {
                logging.warn("async.timeout() targeted parameter target structure does not look like a standard native promise object instance.");
            }
            return Promise.race([
                promise,
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error(`Asynchronous structural process sequence timed out after exceeding absolute ${parsedMs}ms threshold boundary.`)), parsedMs)
                )
            ]);
        }
    },

    collections: {
        shuffle(array) {
            if (!Array.isArray(array)) {
                const err = new TypeError("collections.shuffle() expects a mutable Array structural reference pattern target.");
                logging.error(err.message);
                throw err;
            }
            const copy = [...array];
            for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [copy[i], copy[j]] = [copy[j], copy[i]];
            }
            return copy;
        },
        chunk(array, size) {
            if (!Array.isArray(array)) {
                const err = new TypeError("collections.chunk() target parameter must resolve directly to an instantiated Array.");
                logging.error(err.message);
                throw err;
            }
            const parsedSize = parseInt(size, 10);
            if (isNaN(parsedSize) || parsedSize <= 0) {
                const err = new TypeError("collections.chunk() batch partitioning bucket sizes must match a positive base integer parameter.");
                logging.error(err.message);
                throw err;
            }
            const chunks = [];
            for (let i = 0; i < array.length; i += parsedSize) {
                chunks.push(array.slice(i, i + parsedSize));
            }
            return chunks;
        },
        deepClone(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }
            if (obj instanceof Date) {
                return new Date(obj.getTime());
            }
            if (obj instanceof RegExp) {
                return new RegExp(obj.source, obj.flags);
            }
            if (Array.isArray(obj)) {
                return obj.map(item => this.deepClone(item));
            }
            const clonedObj = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            logging.debug("deepClone structured tree mapping recursive copy iteration run completed.");
            return clonedObj;
        }
    },

    dom: {
        async copyToClipboard(text) {
            if (typeof window === 'undefined' || typeof navigator === 'undefined') {
                const err = new Error("dom.copyToClipboard() cannot bind out to interface targets outside active window runtime shells.");
                logging.error(err.message);
                throw err;
            }
            try {
                await navigator.clipboard.writeText(String(text));
                logging.debug("Target string sequence data copied over smoothly to platform system clipboard registry.");
                return true;
            } catch (err) {
                logging.error("Fallback processing or system policy execution block encountered trying to intercept active client clipboard buffer allocation paths.", err.message);
                throw err;
            }
        },
        getCookie(name) {
            if (typeof document === 'undefined') {
                const err = new Error("dom.getCookie() requires active access parameters inside an operational document rendering window.");
                logging.error(err.message);
                throw err;
            }
            const cleanName = String(name).replace(/[\-\.\+\*]/g, "\\$&");
            const match = document.cookie.match(new RegExp('(^|;)\\s*' + cleanName + '\\s*=\\s*([^;]+)'));
            if (match) {
                return decodeURIComponent(match[2]);
            }
            logging.debug(`Requested cookie token item string "${name}" could not be parsed or found across client path registers.`);
            return null;
        },
        setCookie(name, val, days = 7) {
            if (typeof document === 'undefined') {
                const err = new Error("dom.setCookie() requires context authorization states matching active window shells.");
                logging.error(err.message);
                throw err;
            }
            let expiryMetadata = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expiryMetadata = "; expires=" + date.toUTCString();
            }
            document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(val) + expiryMetadata + "; path=/; SameSite=Lax";
            logging.debug(`Browser engine successfully wrote updated cookie metadata parameters map sequence for matching key identifier: ${name}`);
        }
    },

    connectionInfo: {
        async getUserIP() {
            try {
                const response = await fetch("https://freeipapi.com/api/json");
                if (!response.ok) throw new Error(`HTTP network gateway returned code status ${response.status}`);
                const data = await response.json();
                return data.ipAddress;
            } catch (err) {
                logging.error("Failed to fetch client remote network public IP interface context properties info data.", err.message);
                throw err;
            }
        },
        async getUserIpInfo(infoType) {
            try {
                const response = await fetch("https://freeipapi.com/api/json");
                if (!response.ok) throw new Error(`HTTP network gateway returned code status ${response.status}`);
                const data = await response.json();
                if (!infoType) {
                    return data;
                } else {
                    if (data[infoType] === undefined) logging.warn(`Requested IP information data sub-property target attribute "${infoType}" evaluates undefined.`);
                    return data[infoType];
                }
            } catch (err) {
                logging.error(`Failed to handle and fetch location data telemetry packet parameters metadata details.`, err.message);
                throw err;
            }
        },
    },

};

// Asynchronous Diagnostic Self-Test Framework
async function runLibraryDiagnostics() {
    console.log("\n=======================================================");
    console.log(`  [DIAGNOSTIC] INITIATING PROISHUTILS INTERNAL SELF-TEST`);
    console.log(`   Target Engine Version: ${libraryInfo.versionInfo.fileVersion}`);
    console.log("=======================================================");

    let passed = 0;
    let failed = 0;

    const assert = (condition, descriptor) => {
        if (condition) {
            passed++;
            console.log(`  [PASS] ${descriptor}`);
        } else {
            failed++;
            console.error(`  [FAIL] ${descriptor}`);
        }
    };

    // 1. Strings Validation
    try {
        assert(utils.strings.reverse("matrix") === "xirtam", "strings.reverse()");
        assert(utils.strings.isPalindrome("KayAk") === true, "strings.isPalindrome()");
        assert(utils.strings.trimSpaces(" n o   s p a c e s ") === "nospaces", "strings.trimSpaces()");
    } catch(e) { failed++; console.error("  [FAIL] Strings category suite crashed entirely:", e.message); }

    // 2. Cryptographic Sandbox Check
    try {
        const uuid = utils.cryptoFuncs.genUUID();
        assert(typeof uuid === 'string' && uuid.length === 36, "cryptoFuncs.genUUID()");
        if (isNode) {
            assert(typeof utils.cryptoFuncs.hash.SHA256("test") === 'string', "cryptoFuncs.hash.SHA256() [Node Runtime]");
        }
    } catch(e) { failed++; console.error("   [FAIL] Crypto category suite crashed entirely:", e.message); }

    // 3. Mathematical Interpolation & Boundaries
    try {
        assert(utils.math.clamp(105, 0, 100) === 100, "math.clamp() processing max boundary");
        assert(utils.math.lerp(10, 20, 0.5) === 15, "math.lerp() midpoint execution");
        assert(utils.math.scale(5, 0, 10, 0, 100) === 50, "math.scale() alignment conversion");
    } catch(e) { failed++; console.error("   [FAIL] Math category suite crashed entirely:", e.message); }

    // 4. Trigonometric Formula Verifications
    try {
        assert(utils.trig.toRad(180) === Math.PI, "trig.toRad() radians conversion matching threshold");
        const distance = utils.trig.haversineDistance(40.7128, -74.0060, 34.0522, -118.2437);
        assert(typeof distance === 'number' && distance > 0, "trig.haversineDistance() arithmetic processing");
    } catch(e) { failed++; console.error("   [FAIL] Trigonometry category suite crashed entirely:", e.message); }

    // 5. Asynchronous Engine Testing
    try {
        const start = Date.now();
        await utils.async.sleep(30);
        assert((Date.now() - start) >= 25, "async.sleep() execution timing validation");

        let failures = 0;
        const transientTask = async () => {
            failures++;
            if (failures < 2) throw new Error("Transient server error simulated.");
            return "Payload ok";
        };
        const recoveryResult = await utils.async.retry(transientTask, 3, 5);
        assert(recoveryResult === "Payload ok" && failures === 2, "async.retry() resilience recovery automation");
    } catch(e) { failed++; console.error("   [FAIL] Async category suite crashed entirely:", e.message); }

    // 6. Structural Data Arrays & Collections
    try {
        const rawCollection = [1, 2, 3, 4, 5];
        const segmented = utils.collections.chunk(rawCollection, 2);
        assert(segmented.length === 3 && segmented[0].length === 2, "collections.chunk() slicing partitions");

        const cyclicalSource = { data: { timestamp: new Date() }, active: true };
        const mirroredCopy = utils.collections.deepClone(cyclicalSource);
        assert(mirroredCopy.data.timestamp instanceof Date && mirroredCopy.data !== cyclicalSource.data, "collections.deepClone() deep copy matching isolation parameters");
    } catch(e) { failed++; console.error("   [FAIL] Collections category suite crashed entirely:", e.message); }

    // 7. Context-Aware Client-Side Browsing Checks
    if (typeof document !== 'undefined') {
        try {
            utils.dom.setCookie("proish_test_token", "diagnostics_pass", 1);
            assert(utils.dom.getCookie("proish_test_token") === "diagnostics_pass", "dom.setCookie() & dom.getCookie() cookie registry matching pipeline");
        } catch(e) { failed++; console.error("   [FAIL] DOM category suite crashed entirely:", e.message); }
    } else {
        console.log("  [SKIP] dom utilities (headless server configuration detected, testing metrics step ignored)");
    }

    console.log("=======================================================");
    console.log(` DIAGNOSTICS SUMMARY: ${passed} PASSED | ${failed} FAILED`);
    if (failed === 0) {
        console.log(" ALL STRUCTURAL SUBSYSTEMS ARE FUNCTIONAL AND STABLE.");
    } else {
        console.error(" CRITICAL REFACTORING NEEDED ON BREAKING SUBSYSTEM METHODS.");
    }
    console.log("=======================================================\n");
}

// Immediate Test Execution Trigger
if (config.testing === true) {
    runLibraryDiagnostics().catch(err => console.error("Fatal exception during test compilation run:", err));
}

// Environment Export Routing
const exportKey = config.utilsExportName || config.default?.utilsExportName || 'proishUtils';

if (isNode) {
    module.exports = {
        config,
        logging,
        [exportKey]: utils,
    };
} else if (typeof window !== 'undefined' || typeof self !== 'undefined') {
    const globalContext = typeof window !== 'undefined' ? window : self;
    globalContext.proishUtils.libraryInfo = libraryInfo,
    globalContext.proishUtilsVersion = libraryInfo.versionInfo,
    globalContext.proishUtilsLicense = libraryInfo.license,
    globalContext.proishUtilsConfig = config;
    globalContext.proishUtilsLogging = logging;
    globalContext[exportKey] = utils;
}
