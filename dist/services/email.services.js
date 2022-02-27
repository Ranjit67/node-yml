"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var config_1 = require("../config");
var template = require("../emailTempleat");
var EmailService = (function () {
    function EmailService() {
    }
    EmailService.prototype.emailSend = function (emails, subject, message) {
        var emailCredentials = {
            from: "Skyrise <support@skyrisecelebrity.com>",
            to: emails,
            subject: subject,
            html: template.normalMailBody(message),
        };
        return new Promise(function (resolve, reject) {
            var transport = nodemailer_1.default.createTransport({
                host: config_1.host,
                port: 465,
                secure: true,
                auth: {
                    user: config_1.email,
                    pass: config_1.password,
                },
            });
            transport
                .sendMail(emailCredentials)
                .then(function (info) {
                return resolve(info);
            })
                .catch(function (err) {
                return resolve(err);
            });
        });
    };
    EmailService.prototype.LinkEmailSend = function (emails, subject, message) {
        var emailCredentials = {
            from: "Skyrise <support@skyrisecelebrity.com>",
            to: emails,
            subject: subject,
            html: template.linkEmail(message),
        };
        return new Promise(function (resolve, reject) {
            var transport = nodemailer_1.default.createTransport({
                host: config_1.host,
                port: 465,
                secure: true,
                auth: {
                    user: config_1.email,
                    pass: config_1.password,
                },
            });
            transport
                .sendMail(emailCredentials)
                .then(function (info) {
                return resolve(info);
            })
                .catch(function (err) {
                return resolve(err);
            });
        });
    };
    return EmailService;
}());
exports.default = EmailService;
//# sourceMappingURL=email.services.js.map