import React from 'react'

function NotFoundPage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">Oops! Página no encontrada.</p>
      <p className="text-gray-500 mt-1">
        La página que buscas no existe o ha sido movida.
      </p>
    </div>
  );
}

export default NotFoundPage;
