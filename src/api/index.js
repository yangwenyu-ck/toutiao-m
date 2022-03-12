import {
    loginAuth,
    verification,
    getUserInfo,
    getUserChannels,
    getArticles,
    getAllChannels,
    addUserChannel,
    deleteUserChannel,
    getSuggestList,
    getSearch,
    getArticleById,
    addFollow,
    deleteFollow,
    addCollect,
    deleteCollect,
    addLike,
    deleteLike,
    getComments,
    addCommentLike,
    deleteCommentLike,
    addComment
} from "./user"; //获取登陆结果

export const loginAuthAPI = loginAuth; //登陆验证
export const verificationAPI = verification; //手机验证码接口不可用
export const getUserInfoAPI = getUserInfo; //用户信息接口
export const getUserChannelsAPI = getUserChannels; //首页列表
export const getArticlesAPI = getArticles; //首页列表频道内容
export const getAllChannelsAPI = getAllChannels; //获取所有频道
export const addUserChannelAPI = addUserChannel; //添加用户频道
export const deleteUserChannellAPI = deleteUserChannel; //删除用户频道
export const getSuggestListAPI = getSuggestList; //获取搜索建议列表数据的 API
export const getSearchAPI = getSearch; //获取搜索结果
export const getArticleByIdAPI = getArticleById; //根据 id 获取指定文章
export const addFollowAPI = addFollow; //* 添加关注
export const deleteFollowAPI = deleteFollow; //* 取消关注
export const addCollectAPI = addCollect; //* 收藏文章
export const deleteCollectAPI = deleteCollect; //* 取消收藏文章
export const addLikeAPI = addLike; //* 点赞
export const deleteLikeAPI = deleteLike; //* 取消点赞
export const getCommentsAPI = getComments; //* 获取文章评论
export const addCommentLikeAPI = addCommentLike; //* 对评论或评论回复点赞
export const deleteCommentLikeAPI = deleteCommentLike; //* 取消对评论或评论回复点赞
export const addCommentAPI = addComment; //* 发布评论