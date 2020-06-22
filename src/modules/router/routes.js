import { FolderSelection, FilesSelection, MainPage } from 'pages'

export const authorized = [
  {
    path: '/',
    component: FolderSelection,
  },
  {
    path: '/:type',
    component: FilesSelection,
  },
  {
    path: '/:type/view',
    component: MainPage,
  },
]

export const authorizedPathNames = authorized.map(route => route.path)
