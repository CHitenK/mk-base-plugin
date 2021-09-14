import request from './../utils/http'

/**
 * @description 通过系统编码获取端字典接口
 */
export function getPlatforms(headers: any) {
  return request({
    url: `/auth/v1/dicts/platforms`,
    method: 'get',
    headers
  })
}

/**
 * @description 查询全部菜单
 */
export function getMenus(params: any, headers: any) {
  return request({
    url: `/auth/v1/menus`,
    method: 'get',
    headers,
    params
  })
}

/**
 * @description 新增菜单
 */
export function addMenus(data: any, headers: any) {
  return request({
    url: `/auth/v1/menus`,
    method: 'post',
    headers,
    data
  })
}

/**
 * @description 删除菜单
 */
export function deleMenus(id: any, headers: any) {
  return request({
    url: `/auth/v1/menus/${id}`,
    headers,
    method: 'delete'
  })
}

/**
 * @description 更新菜单
 */
export function updateMenus(data:any, headers: any) {
  return request({
    url: `/auth/v1/menus/${data.id}`,
    method: 'put',
    headers,
    data
  })
}

/**
 * @description 拖拽后更新
 */
export function updateParent(data:any, headers: any) {
  return request({
    url: `/auth/v1/menus/${data.id}/update-parent`,
    method: 'PATCH',
    headers,
    data
  })
}

/**
 * @description 根据菜单ID获取操作项(功能)列表
 */
export function getMenuById(id:any, headers: any) {
  return request({
    url: `/auth/v1/menus/${id}/operations`,
    headers,
    method: 'get'
  })
}

/**
 * @description 获取接口列表
 */
export function getResources(params: any, headers: any) {
  return request({
    url: `/auth/v1/resources`,
    method: 'get',
    params,
    headers
  })
}

/**
 * @description 获取接口列表（已绑定）
 */
export function getBangResources(id: any, headers: any) {
  return request({
    url: `/auth/v1/menus/${id}/resources`,
    headers,
    method: 'get'
  })
}

/**
 * @description 绑定
 */
export function bindResources(id:any, data:any, headers: any) {
  return request({
    url: `/auth/v1/menus/${id}/bindResources`,
    method: 'post',
    headers,
    data
  })
}
