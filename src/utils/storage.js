//单独封装本地存储模块
//存
export const subdata = (key, value) => {
    if (typeof value === 'object') {
        //如果value是数组形式
        //那么转化为json字符串形式
        value = JSON.stringify(value)
    }
    //存到本地
    window.localStorage.setItem(key, value);
}

//取
export const dataFetch = key => {
    // 先取数据
    const data = window.localStorage.getItem(key);
    //判断data 是不是需要转换
    try {
        return JSON.parse(data)
            //如果转换失败直接进入catch
    } catch (err) {
        //直接return出去
        return data
    }
}

//删
export const deleteThe = key => {
    window.localStorage.removeItem(key)
}