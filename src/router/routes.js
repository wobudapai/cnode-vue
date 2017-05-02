import App from '../App'
import home from '../views/home/'
import detail from '../views/detail/'

export default [
	{
		path: '/',
		component: App,
		children: [{
			path: '/',
			component: home,
			meta: { title: 'CNode' }
		}, {
      path: '/detail',
      component: detail,
      meta: { title: 'CNode' }
    }]
	}
]

// 如果要发布到Public下的cnode则所有路径前要加上/cnode
