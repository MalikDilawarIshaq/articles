import React from 'react';

const ArticleList = ({ articles }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Feed</h1>
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article, idx) => (
          <div key={article?.id || idx} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{article?.webTitle || article?.title}</h2>
            <p className="text-gray-500">
              {new Date(article?.webPublicationDate || article?.publishedAt).toLocaleDateString()} | {article.sectionName}
            </p>
            <p className='text-gray-500'>{article?.description}</p>
            <p>{article?.content}</p>
            <a href={article?.webUrl || article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
