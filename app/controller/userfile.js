// app/controller/user.js
const Controller = require('egg').Controller;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class UserController extends Controller {

    async login() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body
        const userInfo = await ctx.service.userfile.getUserByName(username)
        if (!userInfo || !userInfo.UserID) {
            ctx.body = {
                code: 500,
                msg: '账号不存在',
                result: null
            }
            return
        }
        if (userInfo && password != userInfo.Password) {
            ctx.body = {
                code: 500,
                msg: '账号密码错误',
                result: null
            }
            return
        }
        const token = app.jwt.sign({
            id: userInfo.id,
            username: userInfo.Name,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) 
        }, app.config.jwt.secret);

        ctx.body = {
            code: 200,
            message: '登录成功',
            result: {
                token
            },
        };
    }
}

module.exports = UserController;