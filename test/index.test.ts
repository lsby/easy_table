import 'mocha'
import { 新建表 } from '../src/index'
import * as tools from '@lsby/js_tools'

describe('测试组', function () {
    it('测试1', async function () {
        var t = 新建表({ 姓名: '字符串', 班级: '数字' })

        t = t.增加({ 姓名: '小明', 班级: 1 })
        tools.断言相等(JSON.stringify(t.获得数据()), JSON.stringify([{ 姓名: '小明', 班级: 1 }]))

        t = t.增加({ 姓名: '小红', 班级: 1 })
        tools.断言相等(
            JSON.stringify(t.获得数据()),
            JSON.stringify([
                { 姓名: '小明', 班级: 1 },
                { 姓名: '小红', 班级: 1 },
            ]),
        )

        t = t.增加({ 姓名: '可达鸭', 班级: 1 })
        tools.断言相等(
            JSON.stringify(t.获得数据()),
            JSON.stringify([
                { 姓名: '小明', 班级: 1 },
                { 姓名: '小红', 班级: 1 },
                { 姓名: '可达鸭', 班级: 1 },
            ]),
        )

        t = t.选择('姓名', '!=', '可达鸭')
        tools.断言相等(
            JSON.stringify(t.获得数据()),
            JSON.stringify([
                { 姓名: '小明', 班级: 1 },
                { 姓名: '小红', 班级: 1 },
            ]),
        )

        t = t.修改('班级', 2, [{ 条件列名: '姓名', 条件操作: '==', 条件值: '小明' }])
        tools.断言相等(
            JSON.stringify(t.获得数据()),
            JSON.stringify([
                { 姓名: '小明', 班级: 2 },
                { 姓名: '小红', 班级: 1 },
            ]),
        )
    })
})
