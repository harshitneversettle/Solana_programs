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
var web3_js_1 = require("@solana/web3.js");
var dotenv = require("dotenv");
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, secret, sender, receiver, sender_balance, reveiver_balance, instruction1, transaction1, sender_balance1, reveiver_balance1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = new web3_js_1.Connection("https://api.devnet.solana.com", "confirmed");
                    secret = JSON.parse(process.env.privateKey);
                    sender = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(secret));
                    receiver = new web3_js_1.PublicKey("EcpZWqcdiagd3x7pr1Xknmw6yE5Lj5rDrQbtAhYUFC8a");
                    return [4 /*yield*/, connection.getBalance(sender.publicKey, "confirmed")];
                case 1:
                    sender_balance = _a.sent();
                    console.log("The balance of sender before sending sol : ".concat(sender_balance / web3_js_1.LAMPORTS_PER_SOL));
                    return [4 /*yield*/, connection.getBalance(receiver, "confirmed")];
                case 2:
                    reveiver_balance = _a.sent();
                    console.log("The balance of receiver before receiving sol : ".concat(reveiver_balance / web3_js_1.LAMPORTS_PER_SOL));
                    instruction1 = web3_js_1.SystemProgram.transfer({
                        fromPubkey: sender.publicKey,
                        toPubkey: receiver,
                        lamports: 1 * web3_js_1.LAMPORTS_PER_SOL,
                    });
                    transaction1 = new web3_js_1.Transaction().add(instruction1);
                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction1, [sender])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.getBalance(sender.publicKey, "confirmed")];
                case 4:
                    sender_balance1 = _a.sent();
                    console.log("The balance of sender after sending sol : ".concat(sender_balance1 / web3_js_1.LAMPORTS_PER_SOL));
                    return [4 /*yield*/, connection.getBalance(receiver, "confirmed")];
                case 5:
                    reveiver_balance1 = _a.sent();
                    console.log("The balance of receiver after receiving sol : ".concat(reveiver_balance1 / web3_js_1.LAMPORTS_PER_SOL));
                    return [2 /*return*/];
            }
        });
    });
}
main();
