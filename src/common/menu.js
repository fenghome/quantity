import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '编制申请',
    icon: 'dashboard',
    path: 'quantityapply',
  },
  {
    name: '列编管理',
    icon: 'dashboard',
    path: 'quantity',
  },
  {
    name: '单位管理',
    icon: 'dashboard',
    path: 'company',
  },
  {
    name: '人员管理',
    icon: 'dashboard',
    path: 'employee',
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
