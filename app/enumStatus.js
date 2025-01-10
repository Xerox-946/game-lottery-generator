// 状态枚举
/**
 * 状态枚举
 * None报名未开始
 * Apply报名中   
 * Draw抽签中
 * DrawWait等待抽签结果
 * RaceWait等待比赛开始
 * RaceDay比赛日
 * RaceEnd比赛结束
 * RaceDefer比赛延期
 * RaceCancel比赛取消 
 */
const EnumStatus = {
    None: 0,
    Apply: 1,
    Draw: 2,
    DrawWait: 3,
    RaceWait: 4,
    RaceDay: 5,
    RaceEnd: 6,
    RaceDefer: 7,
    RaceCancel: 8,
}
