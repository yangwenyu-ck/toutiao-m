import request from "../utils/request.js"
import store from "../store/index.js"

//验证登录信息
export const loginAuth = data => request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
})

//验证码一分钟只能发送一次 
//此接口暂时不可用
export const verification = mobile => request({
    method: 'GET',
    url: '/v1_0/sms/codes/${mobile}'
})

//获取用户信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        // 发送请求头数据
        headers: {
            // 注意：该接口需要授权才能访问
            //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
            Authorization: 'Bearer ${store.state.user.token}'
        }
    })
}

//列表数据
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}

//列表频道内容接口
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}

/**
 * 获取所有频道
 */
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

/**
 * 添加用户频道
 */
export const addUserChannel = channels => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels
        }
    })
}

/**
 * 删除用户频道
 */
export const deleteUserChannel = channelId => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`
    })
}

// 获取搜索建议列表数据的 API
export const getSuggestList = kw => {
    return request({
        method: 'get',
        url: `/v1_0/suggestion`,
        params: {
            q: kw
        }
    })
}

/**
 * 获取搜索结果
 */
export function getSearch(params) {
    return request({
        method: "GET",
        url: "/v1_0/search",
        params
    })
}

/**
 * 根据 id 获取指定文章
 */
export const getArticleById = articleId => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articleId}`
    })
}

/**
 * 添加关注
 */
export const addFollow = userId => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target: userId
        }
    })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${userId}`
    })
}

/**
 * 收藏文章
 */
export const addCollect = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`
    })
}

/**
 * 点赞
 */
export const addLike = articleId => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target: articleId
        }
    })
}

/**
 * 取消点赞
 */
export const deleteLike = articleId => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${articleId}`
    })
}

/**
 * 获取文章评论列表
 */
export const getComments = params => {
    return request({
        method: "GET",
        url: "/v1_0/comments",
        params
    });
}

/**
 * 对评论或评论回复点赞
 */
export function addCommentLike(commentId) {
    return request({
        method: "POST",
        url: "/v1_0/comment/likings",
        data: {
            target: commentId
        }
    });
}

/**
 * 取消对评论或评论回复点赞
 */
export function deleteCommentLike(commentId) {
    return request({
        method: "DELETE",
        url: `/v1_0/comment/likings/${commentId}`
    });
}

/**
 * 发布评论
 */
export const addComment = data => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}