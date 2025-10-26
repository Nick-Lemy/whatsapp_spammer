"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_core_1 = require("puppeteer-core");
var child_process_1 = require("child_process");
function sendWhatsAppMessage() {
    return __awaiter(this, arguments, void 0, function (contact, message, port) {
        var browser, pages, page, searchSelector, searchBox, messageBoxSelectorCandidates, messageBox, _i, messageBoxSelectorCandidates_1, sel, _a, i;
        if (contact === void 0) { contact = "You"; }
        if (message === void 0) { message = "Hello from Nick's Spammer"; }
        if (port === void 0) { port = 3005; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, puppeteer_core_1.default.connect({
                        browserURL: "http://localhost:".concat(port),
                    })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.pages()];
                case 2:
                    pages = _b.sent();
                    page = pages[0];
                    return [4 /*yield*/, page.goto("https://web.whatsapp.com", { waitUntil: "networkidle2" })];
                case 3:
                    _b.sent();
                    searchSelector = 'div[contenteditable="true"][data-tab="3"]';
                    return [4 /*yield*/, page.waitForSelector(searchSelector, { visible: true, timeout: 60000 })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.$(searchSelector)];
                case 5:
                    searchBox = _b.sent();
                    if (!searchBox)
                        throw new Error("Could not find the search box");
                    return [4 /*yield*/, searchBox.click({ clickCount: 3 })];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, searchBox.type(contact, { delay: 100 })];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, page.keyboard.press("Enter")];
                case 8:
                    _b.sent();
                    messageBoxSelectorCandidates = [
                        'div[contenteditable="true"][data-tab="10"]',
                        'div[contenteditable="true"][data-tab="1"]',
                    ];
                    messageBox = null;
                    _i = 0, messageBoxSelectorCandidates_1 = messageBoxSelectorCandidates;
                    _b.label = 9;
                case 9:
                    if (!(_i < messageBoxSelectorCandidates_1.length)) return [3 /*break*/, 14];
                    sel = messageBoxSelectorCandidates_1[_i];
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, page.waitForSelector(sel, {
                            visible: true,
                            timeout: 5000,
                        })];
                case 11:
                    messageBox = _b.sent();
                    if (messageBox)
                        return [3 /*break*/, 14];
                    return [3 /*break*/, 13];
                case 12:
                    _a = _b.sent();
                    return [3 /*break*/, 13];
                case 13:
                    _i++;
                    return [3 /*break*/, 9];
                case 14:
                    if (!messageBox)
                        throw new Error("Could not find message box");
                    return [4 /*yield*/, messageBox.focus()];
                case 15:
                    _b.sent();
                    i = 0;
                    _b.label = 16;
                case 16:
                    if (!(i < 1000)) return [3 /*break*/, 20];
                    return [4 /*yield*/, messageBox.type("".concat(message, " ").concat(i))];
                case 17:
                    _b.sent();
                    return [4 /*yield*/, page.keyboard.press("Enter")];
                case 18:
                    _b.sent();
                    _b.label = 19;
                case 19:
                    i++;
                    return [3 /*break*/, 16];
                case 20:
                    console.log("Sent message to ".concat(contact, ": \"").concat(message, "\""));
                    return [4 /*yield*/, browser.disconnect()];
                case 21:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function launchChrome(port) {
    if (port === void 0) { port = 3005; }
    var chrome = (0, child_process_1.spawn)("google-chrome", ["--remote-debugging-port=".concat(port), "--user-data-dir=/tmp/chrome-profile"], {
        detached: true,
        stdio: "ignore",
    });
    chrome.unref(); // Let Chrome run independently
    console.log("Chrome launched with PID:", chrome.pid);
    // Wait a bit for Chrome to start
    return new Promise(function (resolve) { return setTimeout(resolve, 3000); });
}
var args = process.argv.slice(2);
var contact = args[0];
var message = args[1];
var port = args[2] ? parseInt(args[2], 10) : 3005;
launchChrome(port).then(function () {
    sendWhatsAppMessage(contact, message, port).catch(console.error);
});
