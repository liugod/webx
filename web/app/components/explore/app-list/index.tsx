'use client'
import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { App } from '@/models/explore'
import Category from '@/app/components/explore/category'
import AppCard from '@/app/components/explore/app-card'
import { fetchAppList } from '@/service/explore'
import CreateAppModal from '@/app/components/explore/create-app-modal'
import Loading from '@/app/components/base/loading'

import s from './style.module.css'

const Apps: FC = ({ }) => {
  const { t } = useTranslation()

  const [currCategory, setCurrCategory] = React.useState('')
  const [allList, setAllList] = React.useState<App[]>([])
  const [isLoaded, setIsLoaded] = React.useState(false)

  const currList = (() => {
    if(currCategory === '') return allList
    return allList.filter(item => item.category === currCategory)
  })()
  const [categories, setCategories] = React.useState([])
  useEffect(() => {
    (async () => {
      const {categories, recommended_apps}:any = await fetchAppList()
      setCategories(categories)
      setAllList(recommended_apps)
      setIsLoaded(true)
    })()
  }, [])

  const handleAddToWorkspace =  (appId: string) => {
    console.log('handleAddToWorkspace', appId)
  }

  const [currApp, setCurrApp] = React.useState<any>(null)
  const [isShowCreateModal, setIsShowCreateModal] = React.useState(false)
  const onCreate = ({name}: any) => {
    console.log({id: currApp.id, name})
  }

  if(!isLoaded) {
    return (
      <div className='flex h-full items-center'>
        <Loading type='area' />
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col'>
      <div className='shrink-0 pt-6 px-12'>
        <div className='mb-1 text-primary-600 text-xl font-semibold'>{t('explore.apps.title')}</div>
        <div className='text-gray-500 text-sm'>{t('explore.apps.description')}</div>
      </div>
      <Category
        className='mt-6 px-12'
        list={categories}
        value={currCategory}
        onChange={setCurrCategory}
      />
      <div 
        className='flex mt-6 flex-col overflow-auto bg-gray-100 shrink-0 grow'
        style={{
          maxHeight: 'calc(100vh - 243px)'
        }}
      >
        <nav
          className={`${s.appList} grid content-start grid-cols-1 gap-4 px-12 pb-10 md:grid-cols-2 grow shrink-0`}>
          {currList.map(app => (
            <AppCard 
              key={app.app_id}
              app={app}
              onCreate={() => {
                setCurrApp(app)
                setIsShowCreateModal(true)
              }}
              onAddToWorkspace={handleAddToWorkspace}
            />
          ))}
        </nav>
      </div>

      {isShowCreateModal && (
          <CreateAppModal
            appName={currApp.name}
            show={isShowCreateModal}
            onConfirm={onCreate}
            onHide={() => setIsShowCreateModal(false)}
          />
        )}
    </div>
  )
}

export default React.memo(Apps)