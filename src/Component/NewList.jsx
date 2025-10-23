import React from 'react'
import { NewsCard } from './NewsCard'

export const NewList = ({ articles }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {articles.map((article, index) => (
            <NewsCard key={index} article={article}/>
        ))}
    </div>
  )
}

