
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: '200',
        result: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: '200',
        result: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: '200',
        data: 'success'
      }
    }
  },

  {
    url: '/user/getList',
    type: 'get',
    response: _ => {
      const userList = {
        'success': true,
        'message': '操作成功！',
        'code': '200',
        'result': {
          'total': 1,
          'list': [
            {
              'id': 1,
              'delsign': false,
              'inputDate': '2020-03-07 10:44:25',
              'inputName': '1',
              'updateDate': null,
              'updateName': null,
              'loginName': 'admin',
              'password': 'admin',
              'age': 1,
              'phone': '1'
            }
          ],
          'pageNum': 1,
          'pageSize': 10,
          'size': 1,
          'startRow': 1,
          'endRow': 1,
          'pages': 1,
          'prePage': 0,
          'nextPage': 0,
          'isFirstPage': true,
          'isLastPage': true,
          'hasPreviousPage': false,
          'hasNextPage': false,
          'navigatePages': 8,
          'navigatepageNums': [
            1
          ],
          'navigateFirstPage': 1,
          'navigateLastPage': 1
        },
        'timestamp': 1584367345908
      }

      return userList
    }
  }

]
