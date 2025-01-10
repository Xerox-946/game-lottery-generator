// app/controller/user.js
const Controller = require('egg').Controller;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        const { username, password } = ctx.query;
        if (!username || !password) {
            this.ctx.body = {
                code: 500,
                msg: '用户名或密码不能为空',
                result: null
            }
            return
        }
        const userInfo = await ctx.service.user.getUserByName(username) // 获取用户信息
        if (userInfo && userInfo.UserID) {
            ctx.body = {
                code: 500,
                msg: '账户名已被注册，请重新输入',
                result: null
            }
            return
        }

        const result = await ctx.service.user.register(username, password);

        if (result) {
            ctx.body = {
                code: 200,
                msg: '注册成功',
                result: null
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '注册失败',
                result: null
            }
        }
    }

    async info() {
        const { ctx, app } = this;
        var tokenInfo = app.jwt.verify(ctx.header['access-token'], app.config.jwt.secret);
        if (!tokenInfo.username) {
            this.ctx.body = {
                code: 500,
                msg: '用户名不能为空',
                result: null
            }
            return
        }
        const userInfo = await ctx.service.user.getUserByName(tokenInfo.username) // 获取用户信息
        const user = userInfo.toJSON()
        const roleInfo = await service.role.getRoleByID(userInfo.roleId)
        user.role = roleInfo.toJSON()
        if (user && user.id) {
            ctx.body = {
                code: 200,
                msg: '获取用户信息成功',
                result: user
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '获取用户信息失败',
                result: null
            }
        }
    }

    async login() {
        // app 为全局属性，相当于所有的插件方法都植入到了 app 对象。
        const { ctx, app } = this;
        const { username, password } = ctx.request.body
        // 根据用户名，在数据库查找相对应的id操作
        const userInfo = await ctx.service.user.getUserByName(username)
        // 没找到说明没有该用户
        if (!userInfo || !userInfo.UserID) {
            ctx.body = {
                code: 500,
                msg: '账号不存在',
                result: null
            }
            return
        }
        // 找到用户，并且判断输入密码与数据库中用户密码。
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
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
        }, app.config.jwt.secret);

        ctx.body = {
            code: 200,
            message: '登录成功',
            result: {
                token
            },
        };
    }

    async logout() {
        const { ctx } = this;
        ctx.body = {
            code: 200,
            message: '登录成功',
        };
    }


    async test() {
        const { ctx, app } = this;
        const token = ctx.request.header.token; // 获取header 的token
        const decode = app.config.jwt.verify(token, app.config.jwt.secret);
        ctx.body = {
            code: 200,
            msg: '成功',
            data: {
                ...decode
            }
        }
    }
}

module.exports = UserController;