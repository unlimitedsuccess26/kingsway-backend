"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = exports.wrapAsync = void 0;
// Middleware function to wrap controllers with try-catch
const wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.wrapAsync = wrapAsync;
const slugify = (input) => {
    return input.toLowerCase().replace(/\s+/g, '-');
};
exports.slugify = slugify;
