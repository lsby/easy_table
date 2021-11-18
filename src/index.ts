export type 字符串类型转真实类型<S> = S extends '字符串'
    ? string
    : S extends '数字'
    ? number
    : S extends '布尔值'
    ? boolean
    : never

export type 条件操作 = '==' | '>' | '<' | '>=' | '<=' | '!=' | '包含' | '永真' | '永假'

export function 计算条件操作函数(条件操作: 条件操作) {
    if (条件操作 == '!=') return (a: any, b: any) => a != b
    else if (条件操作 == '<') return (a: any, b: any) => a < b
    else if (条件操作 == '<=') return (a: any, b: any) => a <= b
    else if (条件操作 == '==') return (a: any, b: any) => a == b
    else if (条件操作 == '>') return (a: any, b: any) => a > b
    else if (条件操作 == '>=') return (a: any, b: any) => a >= b
    else if (条件操作 == '包含') return (a: any, b: any) => a.toString().indexOf(b.toString()) != -1
    else if (条件操作 == '永假') return () => false
    else if (条件操作 == '永真') return () => true
    var 类型检查: never = 条件操作
    throw '意外的条件操作'
}

export function 新建表<列描述 extends { [列名: string]: '字符串' | '数字' | '布尔值' }>(列描述: 列描述) {
    var 数据: { [列名 in keyof 列描述]: 字符串类型转真实类型<列描述[列名]> }[] = []
    var r = {
        _数据: 数据,
        增加(值: { [列名 in keyof 列描述]: 字符串类型转真实类型<列描述[列名]> }) {
            var rx = 新建表(列描述)
            rx._数据 = Object.assign(r._数据)
            rx._数据.push(值)
            return rx
        },
        选择(条件列名: keyof 列描述, 条件操作: 条件操作, 条件值: string | number | boolean) {
            var 条件操作函数: (a: any, b: any) => boolean = 计算条件操作函数(条件操作)
            var 筛选 = r._数据.filter((a) => 条件操作函数(a[条件列名], 条件值))
            var rx = 新建表(列描述)
            rx._数据 = Object.assign(筛选)
            return rx
        },
        修改<列名 extends keyof 列描述>(
            操作列名: 列名,
            操作新值: 字符串类型转真实类型<列描述[列名]>,
            条件们: {
                条件列名: keyof 列描述
                条件操作: 条件操作
                条件值: string | number | boolean
            }[],
        ) {
            var rx = 新建表(列描述)
            rx._数据 = Object.assign(r._数据)
            for (var 行 of rx._数据) {
                var 判断结果 = (function 行满足条件们() {
                    for (var 条件 of 条件们) {
                        var 条件操作函数 = 计算条件操作函数(条件.条件操作)
                        var 判断结果 = 条件操作函数(行[条件.条件列名], 条件.条件值)
                        if (判断结果 == false) return false
                    }
                    return true
                })()
                if (判断结果 == false) continue
                行[操作列名] = 操作新值
            }
            return rx
        },
        获得数据() {
            return Object.assign(r._数据)
        },
    }
    return r
}

export default 新建表
